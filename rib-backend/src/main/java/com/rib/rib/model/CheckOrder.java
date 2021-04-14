package com.rib.rib.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
@Entity
@Table(name="check_order")
public class CheckOrder extends Request {
	
	@Column
	private Long accountNumber;
	@Column
	private int leaf;
	
	public CheckOrder()
	{
		
	}

	public CheckOrder(Date date,String status,Customer customer,Long accountNumber, int leaf) {
		super(date,status,customer);
		this.accountNumber = accountNumber;
		this.leaf = leaf;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public int getLeaf() {
		return leaf;
	}

	public void setLeaf(int leaf) {
		this.leaf = leaf;
	}
	
	

}
