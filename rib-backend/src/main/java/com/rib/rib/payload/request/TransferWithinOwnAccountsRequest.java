package com.rib.rib.payload.request;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;

public class TransferWithinOwnAccountsRequest {

	@NotBlank
	private Long fromAccountNumber;
	
	@NotBlank
	private Long toAccountNumber;
	
	@NotBlank
	private BigDecimal amount;

	public Long getFromAccountNumber() {
		return fromAccountNumber;
	}

	public void setFromAccountNumber(Long fromAccountNumber) {
		this.fromAccountNumber = fromAccountNumber;
	}

	public Long getToAccountNumber() {
		return toAccountNumber;
	}

	public void setToAccountNumber(Long toAccountNumber) {
		this.toAccountNumber = toAccountNumber;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	
	
}
