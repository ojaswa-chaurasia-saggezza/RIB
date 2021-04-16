package com.rib.rib.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Table(name="creditLimitIncrease")
@Entity
public class CreditLimitIncrease extends Request {
	@Column
	private Long creditCardNumber;
	@Column
	private Long newLimit;
	
	public CreditLimitIncrease()
	{
		
	}

	public CreditLimitIncrease(Date date,String status,Customer customer,Long creditCardNumber, Long newLimit) {
		super(date,status, customer);
		this.creditCardNumber = creditCardNumber;
		this.newLimit = newLimit;
	}

	public Long getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(Long creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public Long getNewLimit() {
		return newLimit;
	}

	public void setNewLimit(Long newLimit) {
		this.newLimit = newLimit;
	}
	

}
