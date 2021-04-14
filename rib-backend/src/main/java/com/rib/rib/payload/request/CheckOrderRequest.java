package com.rib.rib.payload.request;

public class CheckOrderRequest {
	private Long accountNumber;
	
	private int leaf;

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
