package com.rib.rib.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transaction")
public class Transaction {

	@Id
	@Column(name = "transaction_id")
	private String transactionId;

	@Column(name = "category")
	private String category;

	@Column(name = "narration")
	private String narration;

	@Column(name = "date")
	private Date date;

	@Column(name = "closing_balance")
	private BigDecimal closingBalance;

	@Column(name = "withdraw")
	private BigDecimal withdraw;

	@Column(name = "deposit")
	private BigDecimal deposit;

	public Transaction() {

	}

	public Transaction(String category, String narration, Date date, BigDecimal closingBalance, BigDecimal withdraw,
			BigDecimal deposit) {
		super();
		this.category = category;
		this.narration = narration;
		this.date = date;
		this.closingBalance = closingBalance;
		this.withdraw = withdraw;
		this.deposit = deposit;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public BigDecimal getClosingBalance() {
		return closingBalance;
	}

	public void setClosingBalance(BigDecimal closingBalance) {
		this.closingBalance = closingBalance;
	}

	public BigDecimal getWithdraw() {
		return withdraw;
	}

	public void setWithdraw(BigDecimal withdraw) {
		this.withdraw = withdraw;
	}

	public BigDecimal getDeposit() {
		return deposit;
	}

	public void setDeposit(BigDecimal deposit) {
		this.deposit = deposit;
	}

}
