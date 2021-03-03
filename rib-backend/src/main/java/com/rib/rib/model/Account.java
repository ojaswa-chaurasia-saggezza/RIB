package com.rib.rib.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "account")
public class Account {
	
	@OneToMany
	@JoinColumn(name = "account_number")
	List<Transaction> transactions;
	
	@Id
	private Long accountNumber;
	@Column
	private Long balance;
	@Column
	private String type;
	@Column
	private Long outStandingBalance;
	@Column
	private Long outStandingDueDate;
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

	public Long getBalance() {
		return balance;
	}

	public void setBalance(Long balance) {
		this.balance = balance;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getOutStandingBalance() {
		return outStandingBalance;
	}

	public void setOutStandingBalance(Long outStandingBalance) {
		this.outStandingBalance = outStandingBalance;
	}

	public Long getOutStandingDueDate() {
		return outStandingDueDate;
	}

	public void setOutStandingDueDate(Long outStandingDueDate) {
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

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public Account(Long accountNumber, Long balance, String type, Long outStandingBalance, Long outStandingDueDate,
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
