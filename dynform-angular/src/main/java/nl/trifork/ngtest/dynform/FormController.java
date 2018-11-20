package nl.trifork.ngtest.dynform;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/form.do")
public class FormController {

	List<FormField> formFields = new ArrayList<FormField>();
	{
		formFields.add(new FormField("firstName", FormField.Type.TEXT, "First name", true));
		formFields.add(new FormField("color", FormField.Type.SELECT, "Favorite color", true)
						.withOption("#FF0000", "Red")
						.withOption("#00FF00", "Green")
						.withOption("#FFFF00", "Yellow"));
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public List<FormField> getFormDefinition() {
		return formFields;
	}
	
	static class FormData extends LinkedHashMap<String, String> {
		private static final long serialVersionUID = 1L;
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> postForm(@RequestBody FormData formData) {
		List<String> messages = new ArrayList<String>();
		for(FormField field : formFields) {
			messages.addAll(field.validate(formData));
		}
		if (messages.isEmpty()) {
			System.out.println("Processing validated form.");
			System.out.println(formData);
			return new ResponseEntity<String>("", HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<String>>(messages, HttpStatus.BAD_REQUEST);
		}
	}

}
