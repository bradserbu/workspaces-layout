var formApp = angular.module('FormApp', []);
formApp.controller('FormController', ['$scope', '$window', '$http', '$compile', 
		 function($scope, $window, $http, $compile) {
	
	$scope.messages = [];
	$scope.data = {};
	$scope.fields = {};
	
	$http({
		method: 'GET', url: './form.do'
	}).
		success(function(data, status, headers, config) {
			$scope.fields = {};
            $.each(data, function(i, field) {
            	$scope.fields[field.key] = field;
				var template = $($.parseHTML($('#inputRowTemplate_' + field.type).html()));	
				template.find('label').append(field.label);
				if(field.type == 'TEXT') {
					template.find('input').attr('data-ng-model', 'data.' + field.key);
				} else if(field.type == 'SELECT') {
					template.find('select').attr({
						'data-ng-model': 'data.' + field.key,
						'data-ng-options': 'key as label for (key, label) in fields["' + field.key + '"].options' 
					});
				}
				var sourceHtml = $('<div>').append(template).html();
				var compiledHtml = $compile(sourceHtml)($scope);
				$('#dynamicForm').append(compiledHtml);
            });
    	}).
    	error(function(data, status, headers, config) {
			alert('Unexpected server error.');
    	});
	
	$scope.submit = function() {
		$http({
			method: 'POST', url: './form.do',
		    data: $scope.data
		}).
			success(function(data, status, headers, config) {
                $window.location.replace('./confirm.html');
	    	}).
	    	error(function(data, status, headers, config) {
	    		if(status == 400) {
	    			$scope.messages = data;
	    		} else {
	    			alert('Unexpected server error.');
	    		}
	    	});
	};
}]); 
