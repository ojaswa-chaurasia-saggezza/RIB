package com.rib.rib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rib.rib.model.GlobalBiller;
@Repository
public interface GlobalBillerRepository extends JpaRepository<GlobalBiller, Long> {

	@Query("SELECT b FROM GlobalBiller b WHERE b.billerName=?1")
	public GlobalBiller findByName(String name);
	
}
