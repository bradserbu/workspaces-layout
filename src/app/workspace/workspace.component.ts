import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, AfterViewInit  {

  public verticalGridDemo = [
    {w: 1, h: 1, x: 0, y: 0},
    {w: 1, h: 1, x: 1, y: 0},
    {w: 1, h: 1, x: 2, y: 0},
    {w: 2, h: 1, x: 0, y: 1},
    {w: 1, h: 1, x: 2, y: 1},
    {w: 3, h: 1, x: 0, y: 2},
    {w: 1, h: 2, x: 0, y: 3},
    {w: 1, h: 1, x: 1, y: 3},
    {w: 1, h: 1, x: 2, y: 3},
    {w: 1, h: 1, x: 1, y: 4},
    {w: 1, h: 1, x: 2, y: 4},
    {w: 2, h: 1, x: 0, y: 5},
    {w: 1, h: 2, x: 2, y: 5},
    {w: 1, h: 1, x: 0, y: 6},
    {w: 1, h: 1, x: 1, y: 6},
    {w: 2, h: 2, x: 0, y: 7},
    {w: 1, h: 2, x: 2, y: 7}
  ];

  public leftSpanDemo = [
    {w: 1, h: 1, x: 0, y: 0},
    {w: 2, h: 1, x: 1, y: 0},
    {w: 1, h: 1, x: 0, y: 1},
    {w: 2, h: 1, x: 1, y: 1},
    {w: 1, h: 1, x: 0, y: 2},
    {w: 2, h: 1, x: 1, y: 2},
    {w: 1, h: 1, x: 0, y: 3},
    {w: 2, h: 1, x: 1, y: 3},
    {w: 1, h: 1, x: 0, y: 4},
    {w: 2, h: 1, x: 1, y: 4},
    {w: 1, h: 1, x: 0, y: 5},
    {w: 2, h: 1, x: 1, y: 5}
  ]

  constructor() { }

  ngAfterViewInit(): void {
    var DemoGrid = {
      currentSize: 3,
      buildElements: function($gridContainer, items) {
        // var item, i;
        // for (i = 0; i < items.length; i++) {
        //   item = items[i];
        //   let $item = $(
        //     '<li>' +
        //       '<div class="inner">' +
        //         '<div class="controls">' +
        //           '<a href="#zoom1" class="resize" data-w="1" data-h="1">1x1</a>' +
        //           '<a href="#zoom2" class="resize" data-w="2" data-h="1">2x1</a>' +
        //           '<a href="#zoom3" class="resize" data-w="3" data-h="1">3x1</a>' +
        //           '<a href="#zoom1" class="resize" data-w="1" data-h="2">1x2</a>' +
        //           '<a href="#zoom2" class="resize" data-w="2" data-h="2">2x2</a>' +
        //         '</div>' +
        //         i +
        //         '<app-widget></app-widget>' +
        //       '</div>' +
        //     '</li>'
        //   );
        //   $item.attr({
        //     'data-w': item.w,
        //     'data-h': item.h,
        //     'data-x': item.x,
        //     'data-y': item.y
        //   });
        //   $gridContainer.append($item);
        // }
      },
      resize: function(size) {
        if (size) {
          this.currentSize = size;
        }
        $('#grid').gridList('resize', this.currentSize);
      },
      flashItems: function(items) {
        // Hack to flash changed items visually
        for (var i = 0; i < items.length; i++) {
          (function($element) {
            $element.addClass('changed')
            setTimeout(function() {
              $element.removeClass('changed');
            }, 0);
          })(items[i].$element);
        }
      }
    };
    
    $(window).resize(function() {
      $('#grid').gridList('reflow');
    });
    

      //DemoGrid.buildElements($('#grid'), this.leftSpanDemo);
    
      $('#grid').gridList({
        direction: 'vertical',
        lanes: 3,
        widthHeightRatio: 264 / 294,
        heightToFontSizeRatio: 0.25,
        onChange: function(changedItems) {
          DemoGrid.flashItems(changedItems);
        }
      });
      $('#grid li .resize').click(function(e) {
        e.preventDefault();
        var itemElement = $(e.currentTarget).closest('li'),
            itemWidth = $(e.currentTarget).data('w'),
            itemHeight = $(e.currentTarget).data('h');
    
        $('#grid').gridList('resizeItem', itemElement, {
          w: itemWidth,
          h: itemHeight
        });
      });
      $('#grid li .inner').resizable({
        ghost: true,
        handles: "se",
        helper: "ui-resizable-helper",
        grid: [$('#grid').data("_gridList")._cellWidth - 10, $('#grid').data("_gridList")._cellHeight -12],
        create: function( event, ui ) {
          $("#grid li .inner div.ui-resizable sw").removeAttr("style");
          $("#grid li .inner div.ui-resizable-sw").addClass("ui-icon ui-icon-gripsmall-diagonal-se");
        },
        resize: function( event, ui ) {
          event.preventDefault();
          // NEED HELP HERE!
          
        },
        stop: function (event, ui) {
          event.preventDefault();
                // var minHeight = $('#grid').data("_gridList")._cellHeight;
                // var minWidth = $('#grid').data("_gridList")._cellWidth;
                // $("#grid").data("resizing", false);
                // var li = $(ui.originalElement)[0];
                // console.log(li);
                // console.log('event', event);
                 var item = $(event.target.parentElement);
                // console.log(item);
                if(!event.revert) {
                    var opt = {
                    w: Math.ceil(ui.size.width/ $('#grid').data("_gridList")._cellWidth),
                    h: Math.ceil(ui.size.height / $('#grid').data("_gridList")._cellHeight)
                };
                // console.log('opt', opt);
                $('#grid').gridList('resizeItem', ui.element.closest('li'), opt);
                console.log($(item['0']));
                $(item['0'].children[0]).removeAttr('style');
               // $(item['0']).data('w', opt.w),
               // $(item['0']).attr('data-h', opt.h);
                }
            }
      });
      // $( "#grid li" ).resizable({
      //   ghost: true,
      //   grid: [$('#grid').data("_gridList")._cellWidth, $('#grid').data("_gridList")._cellHeight],
      //   minHeight: 10,
      //   minWidth: 10,
      //   create: function( event, ui ) {
      //     $("#grid li .inner div.ui-resizable sw").removeAttr("style");
      //     $("#grid li .inner div.ui-resizable-sw").addClass("ui-icon ui-icon-gripsmall-diagonal-se");
      //   },
      //   start: function (event, ui) {
      //     $("#grid").data("resizing", true);
      //   },
      //   stop: function (event, ui) {
      //       var minHeight = $('#grid').data("_gridList")._cellHeight;
      //       var minWidth = $('#grid').data("_gridList")._cellWidth;
      //       $("#grid").data("resizing", false);
      //       var li = $(ui.originalElement)[0];
      //       if(!event.revert) {
      //           var opt = {
      //           w: Math.round(ui.size.width/ $('#grid').data("_gridList")._cellWidth),
      //           h: Math.round(ui.size.height / $('#grid').data("_gridList")._cellHeight)
      //       };
      //       $('.grid').gridList('resizeItem', li, opt);
      //       }
      //   }
      // });
      $('.add-row').click(function(e) {
        e.preventDefault();
        DemoGrid.resize(DemoGrid.currentSize + 1);
      });
      $('.remove-row').click(function(e) {
        e.preventDefault();
        DemoGrid.resize(Math.max(1, DemoGrid.currentSize - 1));
      });
 
      $('#grid').droppable({
        drop: function( event, ui ) {
          console.log(event);
          console.log(ui);
          console.log($("#grid").data('_gridList').gridList);
          
        }
      });
  }

  ngOnInit() {
    
  }

}


