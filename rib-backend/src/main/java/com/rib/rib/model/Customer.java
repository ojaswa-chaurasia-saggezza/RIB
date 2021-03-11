package com.rib.rib.model;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "customer", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToMany(cascade = CascadeType.ALL, targetEntity = Account.class)
	@JoinColumn(name = "customer_id")
	private List<Account> accounts;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
			joinColumns = @JoinColumn(name = "customer_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@Column
	private String accountStatus = "ENABLE";

	public List<Account> getAccounts() {
		return accounts;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Customer setAccounts(List<Account> accounts) {
		this.accounts = accounts;
		return this;
	}

	@Column
	private String name;
	@Column
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

	public Customer(Long phoneNumber, Date dOB, String email, String username, String password,
			String name, String LoginStatus) {
		super();
		this.phoneNumber = phoneNumber;
		DOB = dOB;
		this.email = email;
		this.username = username;
		this.password = password;
		this.name = name;
		this.LoginStatus = LoginStatus;
	}

}
