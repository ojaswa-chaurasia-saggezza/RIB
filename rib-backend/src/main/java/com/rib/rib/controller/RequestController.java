package com.rib.rib.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
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
import com.rib.rib.model.CheckOrder;
import com.rib.rib.model.CreditCard;
import com.rib.rib.model.CreditLimitIncrease;
import com.rib.rib.model.Customer;
import com.rib.rib.model.OpeningProduct;
import com.rib.rib.payload.request.CheckOrderRequest;
import com.rib.rib.payload.request.CreditLimitIncreaseRequest;
import com.rib.rib.payload.request.ProductOpeningRequest;
import com.rib.rib.payload.response.MessageResponse;
import com.rib.rib.repository.CheckOrderRepository;
import com.rib.rib.repository.CreditCardRepository;
import com.rib.rib.repository.CreditLimitIncreaseRepository;
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

	@Autowired
	private CheckOrderRepository checkOrderRepository;
	@Autowired
	private CreditCardRepository creditCardRepository;
	@Autowired
	private CreditLimitIncreaseRepository creditLimitIncreaseRepository;
	
	@GetMapping("/productOpening/CreditCard/{typeOfCreditCard}")
	public OpeningProduct productOpeningApi(@PathVariable String typeOfCreditCard) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow();

		OpeningProduct openingProduct = new OpeningProduct(new Date(), "pending", customer, typeOfCreditCard,
				"Credit Card", null);
		return productOpeningRepository.save(openingProduct);
	}
	
	@PostMapping("/productOpening/CASA")
	public OpeningProduct CASAopeningAPI(@RequestBody ProductOpeningRequest productOpeningRequest) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow();

		OpeningProduct openingProduct = new OpeningProduct(new Date(), "pending", customer, productOpeningRequest.getType(),
				"CASA", productOpeningRequest.getFromAccount());
		return productOpeningRepository.save(openingProduct);

		
	}
	
	@PostMapping("/serviceRequest/checkOrder")
	public CheckOrder checkOrderAPI(@RequestBody CheckOrderRequest checkOrderRequest)
	{
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Customer customer = customerRepository.findByUsername(username).orElseThrow();
		CheckOrder checkOrder = new CheckOrder(new Date(),"pending",customer,checkOrderRequest.getAccountNumber(),checkOrderRequest.getLeaf());
		return checkOrderRepository.save(checkOrder);
		
	}
	
	@GetMapping("/serviceRequest/getCheckOrder")
	public List<CheckOrder> getCheckOrderAPI() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow();
		
		return customer.getCheckorder();
		
	}
	
	@PostMapping("/serviceRequest/creditLimitIncrease")
	public ResponseEntity<?> creditLimitIncreaseAPI(@RequestBody CreditLimitIncreaseRequest creditLimitIncreaseRequest)
	{
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Customer customer = customerRepository.findByUsername(username).orElseThrow();
		
		CreditCard creditCard = creditCardRepository.findById(creditLimitIncreaseRequest.getCreditCardNumber()).orElseThrow();
		if(creditCard.getCreditLimit()>=creditLimitIncreaseRequest.getLimit())
		{
			return ResponseEntity.badRequest().body(new MessageResponse("entered limit is smaller than previous limit"));
		}
		CreditLimitIncrease creditLimitIncrease=new CreditLimitIncrease(new Date(),"pending",customer,creditLimitIncreaseRequest.getCreditCardNumber(),creditLimitIncreaseRequest.getLimit());
		
			creditLimitIncreaseRepository.save(creditLimitIncrease);
			 return ResponseEntity.ok(new MessageResponse("Your credit limit increase request recorded"));
		
	}
	

}
