package com.rib.rib.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rib.rib.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	
	

}
