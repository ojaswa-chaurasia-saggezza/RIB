package com.rib.rib.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rib.rib.model.Customer;

public class CustomerDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;

	private String email;

	private String accountStatus;
	private String loginStatus;

	public String getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(String loginStatus) {
		this.loginStatus = loginStatus;
	}

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public CustomerDetailsImpl(Long id, String username, String email, String password, String accountStatus,
			String loginStatus, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
		this.accountStatus = accountStatus;
		this.loginStatus = loginStatus;
	}

	public static CustomerDetailsImpl build(Customer customer) {
		List<GrantedAuthority> authorities = customer.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());

		return new CustomerDetailsImpl(customer.getId(), customer.getUsername(), customer.getEmail(),
				customer.getPassword(), customer.getAccountStatus(),customer.getLoginStatus(), authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CustomerDetailsImpl user = (CustomerDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}
