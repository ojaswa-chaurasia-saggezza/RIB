package com.rib.rib.payload.request;

public class CreditLimitIncreaseRequest {
	private Long creditCardNumber;
	
	private Long limit;

	public Long getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(Long creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public Long getLimit() {
		return limit;
	}

	public void setLimit(Long limit) {
		this.limit = limit;
	}
	
	
	

}
