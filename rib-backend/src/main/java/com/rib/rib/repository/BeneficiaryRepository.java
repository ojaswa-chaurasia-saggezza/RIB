package com.rib.rib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rib.rib.model.Beneficiary;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
//	@Query("select case when count(b)> 0 then true else false end from Beneficiary b where lower(b.nickName) like lower(:nickName) and b.")
//	boolean existsCarLikeCustomQuery(@Param("nickName") String nickName, @Param("") Long customerId);
}
