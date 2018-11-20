package nl.trifork.ngtest.dynform;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class FormField {

	public enum Type {
		TEXT,
		SELECT,
		;
	}
	
	public String key;
	public Type type;
	public String label;
	public boolean required;
	public LinkedHashMap<String, String> options = new LinkedHashMap<String, String>();
	
	public FormField() {
	}
	
	public FormField(String key, Type type, String label, boolean required) {
		this.key = key;
		this.type = type;
		this.label = label;
		this.required = required;
	}
	
	public FormField withOption(String key, String label) {
		options.put(key, label);
		return this;
	}
	
	public List<String> validate(Map<String, String> input) {
		List<String> messages = new ArrayList<String>();
		if(required) {
			if(!input.containsKey(key) 
					|| input.get(key) == null
					|| input.get(key).isEmpty()) {
				messages.add("Field " + label + " is required.");
			}
		}
		return messages;
	}
	
}
