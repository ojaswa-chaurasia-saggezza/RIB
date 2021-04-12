package com.rib.rib.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name="opening_product")
@Entity
public class OpeningProduct extends Request{
	@Column
	public String type;
	@Column
	public String productType;
	@Column
	private Long fromAccount;
	
	
	public OpeningProduct()
	{
		
	}

	public OpeningProduct(Date date,String status,Customer customer,String type, String productType,Long fromAccount) {
		super(date,status, customer);
		this.type = type;
		this.productType = productType;
		this.fromAccount=fromAccount;
	}

	public Long getFromAccount() {
		return fromAccount;
	}

	public void setFromAccount(Long fromAccount) {
		this.fromAccount = fromAccount;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}
	
	

}
