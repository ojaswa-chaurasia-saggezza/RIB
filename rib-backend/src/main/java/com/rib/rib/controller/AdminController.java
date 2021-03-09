package com.rib.rib.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class AdminController {
	
	@GetMapping("/admin")
	@PreAuthorize("hasRole(Admin)")
	public String adminDashboard() {
		return "TODO Admin Dashboard";
	}

}
