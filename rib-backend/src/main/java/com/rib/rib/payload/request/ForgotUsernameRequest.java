package com.rib.rib.payload.request;

import javax.validation.constraints.NotBlank;

public class ForgotUsernameRequest {
	@NotBlank
	private String username;
	@NotBlank
	private String email;
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
}
