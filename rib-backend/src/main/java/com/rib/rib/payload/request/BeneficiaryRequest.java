package com.rib.rib.payload.request;

import javax.validation.constraints.NotBlank;

public class BeneficiaryRequest {
	
	@NotBlank
	private Long accountNumber;
	
	@NotBlank
	private String nickName;
	
	@NotBlank
	private String ifsc;

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getIfsc() {
		return ifsc;
	}

	public void setIfsc(String ifsc) {
		this.ifsc = ifsc;
	}

}
