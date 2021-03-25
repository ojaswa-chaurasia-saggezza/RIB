package com.rib.rib.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "account")
public class Account {

	@OneToMany(cascade = CascadeType.ALL, targetEntity = Transaction.class)
	@JoinColumn(name = "account_number")
	private List<Transaction> transactions;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private Customer customer;

	@Id
	private Long accountNumber;
	@Column
	private BigDecimal balance;
	@Column
	private String type;
	@Column
	private BigDecimal outStandingBalance;
	@Column
	private Date outStandingDueDate;
	@Column
	private String Segment;
	@Column
	private String IFSC;

	public Account() {

	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public BigDecimal getOutStandingBalance() {
		return outStandingBalance;
	}

	public void setOutStandingBalance(BigDecimal outStandingBalance) {
		this.outStandingBalance = outStandingBalance;
	}

	public Date getOutStandingDueDate() {
		return outStandingDueDate;
	}

	public void setOutStandingDueDate(Date outStandingDueDate) {
		this.outStandingDueDate = outStandingDueDate;
	}

	public String getSegment() {
		return Segment;
	}

	public void setSegment(String segment) {
		Segment = segment;
	}

	public String getIFSC() {
		return IFSC;
	}

	public void setIFSC(String iFSC) {
		IFSC = iFSC;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public Account setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
		return this;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Account(Long accountNumber, BigDecimal balance, String type, BigDecimal outStandingBalance, Date outStandingDueDate,
			String segment, String iFSC) {
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.type = type;
		this.outStandingBalance = outStandingBalance;
		this.outStandingDueDate = outStandingDueDate;
		Segment = segment;
		IFSC = iFSC;
	}

}
