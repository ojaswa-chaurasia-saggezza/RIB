package com.rib.rib.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToMany
	@JoinColumn(name = "customer_id")
	private List<Account> accounts;
     
	@Column
	private String accountStatus;
	public List<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<Account> accounts) {
		this.accounts = accounts;
	}

	@Column
	private String name;
	@Column()
	private Long phoneNumber;
	@Column
	private Date DOB;
	@Column
	private String email;
	@Column
	private String username;
	@Column
	private String password;
	@Column
	private String LoginStatus;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLoginStatus() {
		return LoginStatus;
	}

	public void setLoginStatus(String loginStatus) {
		LoginStatus = loginStatus;
	}

	public Customer() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Date getDOB() {
		return DOB;
	}

	public void setDOB(Date dOB) {
		DOB = dOB;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Customer(String accountStatus, Long phoneNumber, Date dOB, String email, String username,
			String password,String name,String LoginStatus) {
		super();
		this.accountStatus = accountStatus;
		this.phoneNumber = phoneNumber;
		DOB = dOB;
		this.email = email;
		this.username = username;
		this.password = password;
		this.name=name;
		this.LoginStatus=LoginStatus;
	}

}
