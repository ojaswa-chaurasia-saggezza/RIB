package com.rib.rib.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rib.rib.model.OpeningProduct;
@Repository
public interface ProductOpeningRepository extends JpaRepository<OpeningProduct, Long> {

}
