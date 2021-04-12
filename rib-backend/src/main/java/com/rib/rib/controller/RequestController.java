package com.rib.rib.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;
import com.rib.rib.model.Customer;
import com.rib.rib.model.OpeningProduct;
import com.rib.rib.payload.request.ProductOpeningRequest;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.repository.ProductOpeningRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/")
public class RequestController {
	@Autowired
	private ProductOpeningRepository productOpeningRepository;
	
	@Autowired
	
	private CustomerRepository customerRepository;
	
	@GetMapping("/productOpening/CreditCard/{typeOfCreditCard}")
	
	public OpeningProduct productOpeningApi(@PathVariable String typeOfCreditCard)
	{
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow();
		
		
		OpeningProduct openingProduct = new OpeningProduct(new Date(),"pending",customer,typeOfCreditCard,"Credit Card",null);
		return productOpeningRepository.save(openingProduct);
	}

}
