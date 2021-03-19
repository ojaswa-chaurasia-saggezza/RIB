package com.rib.rib.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name= "credit_card")
public class CreditCard {
	
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Transaction.class)
	@JoinColumn(name = "credit_card_number")
	List<Transaction> transactions;
	
	@Id
	private Long cardNumber;
	@Column
	private String type;
	@Column
	private Long creditLimit;
	@Column
	private Long outStandingBalance;
	@Column
	private Date outStandingDueDate;
	
	public CreditCard() {
		
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public CreditCard setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
		return this;
	}

	public Long getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(Long cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getCreditLimit() {
		return creditLimit;
	}

	public void setCreditLimit(Long creditLimit) {
		this.creditLimit = creditLimit;
	}

	public Long getOutStandingBalance() {
		return outStandingBalance;
	}

	public void setOutStandingBalance(Long outStandingBalance) {
		this.outStandingBalance = outStandingBalance;
	}

	public Date getOutStandingDueDate() {
		return outStandingDueDate;
	}

	public void setOutStandingDueDate(Date outStandingDueDate) {
		this.outStandingDueDate = outStandingDueDate;
	}

	public CreditCard(Long cardNumber, String type, Long creditLimit, Long outStandingBalance,
			Date outStandingDueDate) {
		super();
		this.cardNumber = cardNumber;
		this.type = type;
		this.creditLimit = creditLimit;
		this.outStandingBalance = outStandingBalance;
		this.outStandingDueDate = outStandingDueDate;
	}
	
	
	
	

}
