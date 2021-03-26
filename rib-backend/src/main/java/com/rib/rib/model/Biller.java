package com.rib.rib.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;
@Entity
@Table(name = "biller")
public class Biller {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long billerId;
	
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = GlobalBiller.class )
	@JoinColumn(name = "global_biller_id")
	private GlobalBiller globalBiller;
	
	@Column
	private Long billerAccountNumber;
	
	@Column
	private String description;
	
	public Biller()
	{
		
	}

	
	
	public Biller(Long billerAccountNumber, String description) {
		super();
		this.billerAccountNumber = billerAccountNumber;
		this.description = description;
	}



	public GlobalBiller getGlobalBiller() {
		return globalBiller;
	}



	public void setGlobalBiller(GlobalBiller globalBiller) {
		this.globalBiller = globalBiller;
	}



	public Long getBillerAccountNumber() {
		return billerAccountNumber;
	}

	public void setBillerAccountNumber(Long billerAccountNumber) {
		this.billerAccountNumber = billerAccountNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
