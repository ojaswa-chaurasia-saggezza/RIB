package com.rib.rib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rib.rib.model.CheckOrder;
@Repository
public interface CheckOrderRepository extends JpaRepository<CheckOrder, Long> {

}
