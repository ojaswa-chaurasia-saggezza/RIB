package com.rib.rib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rib.rib.model.Transaction;

@Repository
public interface TransactionRepositary extends JpaRepository<Transaction, Long> {

}
