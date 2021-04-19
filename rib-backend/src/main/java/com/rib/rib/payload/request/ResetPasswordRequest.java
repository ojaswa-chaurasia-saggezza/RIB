package com.rib.rib.payload.request;

import javax.validation.constraints.NotBlank;

public class ResetPasswordRequest {
	@NotBlank
	private String username;
	@NotBlank
	private String tempPassword;
	@NotBlank
	private String newPassword;
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getTempPassword() {
		return tempPassword;
	}
	
	public void setTempPassword(String tempPassword) {
		this.tempPassword = tempPassword;
	}
	
	public String getNewPassword() {
		return newPassword;
	}
	
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
}
