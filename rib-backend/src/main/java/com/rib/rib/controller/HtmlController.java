package com.rib.rib.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
public class HtmlController {

	@RequestMapping(method = { RequestMethod.OPTIONS, RequestMethod.GET }, path = { "/SignUp", "/Dashboard/**",
			"/ResetPassword" })
	public String forwardAngularPaths() {
		return "forward:/index.html";
	}
}
