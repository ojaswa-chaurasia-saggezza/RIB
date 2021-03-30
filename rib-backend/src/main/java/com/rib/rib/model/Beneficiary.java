package com.rib.rib.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "beneficiary", uniqueConstraints = { @UniqueConstraint (columnNames = "nickName")})
public class Beneficiary {	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long beneficiaryId;
	
	@OneToOne
	private Account account;
	
	@Column
	private String nickName;
	
	public Beneficiary() {
		
	}
	

	public Beneficiary(String nickName) {
		super();
		this.nickName = nickName;
	}

	public Long getBeneficiaryId() {
		return beneficiaryId;
	}

	public void setBeneficiaryId(Long beneficiaryId) {
		this.beneficiaryId = beneficiaryId;
	}

	public Account getAccount() {
		return account;
	}


	public void setAccount(Account account) {
		this.account = account;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	
	
}
