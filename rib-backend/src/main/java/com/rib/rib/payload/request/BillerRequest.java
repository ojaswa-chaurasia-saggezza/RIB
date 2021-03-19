package com.rib.rib.payload.request;

import javax.validation.constraints.NotBlank;

public class BillerRequest {
	
	@NotBlank
	private String billerName;
	@NotBlank
	private Long billerAccountNumber;
	@NotBlank
	private String description;
	
	public String getBillerName() {
		return billerName;
	}
	public void setBillerName(String billerName) {
		this.billerName = billerName;
	}
	public Long getBillerAccountNumber() {
		return billerAccountNumber;
	}
	public void setBillerAccountNumber(Long billerAccountNumber) {
		this.billerAccountNumber = billerAccountNumber;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
