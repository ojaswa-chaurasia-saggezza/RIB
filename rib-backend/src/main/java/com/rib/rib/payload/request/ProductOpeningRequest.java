package com.rib.rib.payload.request;

public class ProductOpeningRequest {
	
	private String type;
	private Long fromAccount;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Long getFromAccount() {
		return fromAccount;
	}
	public void setFromAccount(Long fromAccount) {
		this.fromAccount = fromAccount;
	}
	

}
