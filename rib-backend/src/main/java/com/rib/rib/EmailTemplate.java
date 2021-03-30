package com.rib.rib;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Map;

import org.apache.commons.io.IOUtils;

public class EmailTemplate {
	private String template;
	private Map<String, String> replacementParams;

	public EmailTemplate(String customtemplate) {

		try {
			this.template = loadTemplate(customtemplate);
		} catch (Exception e) {
			this.template = "Empty";
		}

	}

	/* Load data from html file */
	private String loadTemplate(String customtemplate) throws Exception {

		ClassLoader classLoader = getClass().getClassLoader();
		String content = "Empty";

		try {
			InputStream in = classLoader.getResourceAsStream(customtemplate);
			content = IOUtils.toString(in);
		
		} catch (IOException e) {
			throw new Exception("COULD NOT READ TEMPLATE  = " + customtemplate);
		} catch (Exception e) {
			System.out.println("EXCEPTION WHILE READING THE FILE : " + e);
		}
		return content;

	}

	/* Replace with corresponding username and otpnum */
	public String getTemplate(Map<String, String> replacements) {

		String cTemplate = this.template;
		// Replace the String
		for (Map.Entry<String, String> entry : replacements.entrySet()) {
			cTemplate = cTemplate.replace("{{" + entry.getKey() + "}}", entry.getValue());
		}
		return cTemplate;
	}
}
