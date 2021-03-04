
package com.rib.rib.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.model.Account;
import com.rib.rib.model.Customer;
import com.rib.rib.repository.AccountRepository;
import com.rib.rib.repository.CustomerRepository;

@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private AccountRepository accountRepository;

	@GetMapping("/Customer")
	public List<Customer> getallCustomers() {
		return customerRepository.findAll();
	}

	@GetMapping("/Customer/{username}")
	public List<Customer> getCustomerByUsername(@PathVariable String username) {
		return customerRepository.findByUsername(username);
	}

	@GetMapping("/Customer/GenerateDummyData")
	public List<Customer> generateDummyData() {
		List<Account> nayanAccount = new ArrayList<Account>();
		List<Account> shantiAccount = new ArrayList<Account>();
		List<Account> ojaswaAccount = new ArrayList<Account>();

		nayanAccount.add(new Account(10101010L, 100000000000L, "Saving", 0L, new Date(), "Silver", "PatelNagar"));
		nayanAccount.add(new Account(10000000L, 100000000000L, "Saving", 0L, new Date(), "Gold", "PatelNagar"));
		shantiAccount.add(new Account(787328L, 7329874L, "Current", 0L, new Date(), "Platinum", "IN"));
		shantiAccount.add(new Account(7982392L, 9880332L, "Saving", 0L, new Date(), "Platinum", "PatelNagar"));
		ojaswaAccount.add(new Account(329882L, 320984L, "Current", 0L, new Date(), "Diamond", "PatelNagar"));
		ojaswaAccount.add(new Account(32897L, 3098509L, "Current", 0L, new Date(), "Diamond", "PatelNagar"));

		Customer nayan = new Customer("Active", 7988934699L, new Date(1999, 3, 10), "nayan.pravesh@saggezza.com",
				"Nayan", "Nayan", "Nayan Verma", "LoggedIn");
		Customer shanti = new Customer("Active", 6265510415L, new Date(1997, 5, 23), "shanti.mukati@saggezza.com",
				"Shanti", "Shanti", "Shanti Mukati", "LoggedIn");
		Customer ojaswa = new Customer("Active", 7897842634L, new Date(1997, 1, 16), "ojaswa.chaurasia@saggezza.com",
				"Ojaswa", "Ojaswa", "Ojaswa Chaurasia", "LoggedIn");

		nayan.setAccounts(nayanAccount);
		shanti.setAccounts(shantiAccount);
		ojaswa.setAccounts(ojaswaAccount);

		return customerRepository.saveAll(Arrays.asList(nayan, shanti, ojaswa));

	}

}
