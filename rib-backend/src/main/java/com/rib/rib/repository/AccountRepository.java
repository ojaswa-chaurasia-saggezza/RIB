package com.rib.rib.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rib.rib.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	
}
