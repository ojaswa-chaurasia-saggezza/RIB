package com.rib.rib.payload.request;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;

public class TransferWithinBankBeneficiaryRequest {

	@NotBlank
	private Long fromAccount;
	
	@NotBlank
	private String beneficiary;
	
	@NotBlank
	private String transferMode;
	
	@NotBlank
	private BigDecimal amount;

	public Long getFromAccount() {
		return fromAccount;
	}

	public void setFromAccount(Long fromAccount) {
		this.fromAccount = fromAccount;
	}

	public String getBeneficiary() {
		return beneficiary;
	}

	public void setBeneficiary(String beneficiary) {
		this.beneficiary = beneficiary;
	}

	public String getTransferMode() {
		return transferMode;
	}

	public void setTransferMode(String transferMode) {
		this.transferMode = transferMode;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
}
