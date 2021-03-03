
package com.rib.rib.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.model.Customer;
import com.rib.rib.repository.CustomerRepository;

@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;

	@GetMapping("/Customer")
	public List<Customer> getallCustomers() {
		return customerRepository.findAll();
	}

}
