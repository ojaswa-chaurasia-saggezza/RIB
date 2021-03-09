
package com.rib.rib.controller;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.model.Account;
import com.rib.rib.model.Customer;
import com.rib.rib.model.Transaction;
import com.rib.rib.repository.AccountRepository;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.repository.TransactionRepositary;

@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private TransactionRepositary transactionRepositary;

	@Autowired
	PasswordEncoder passwordEncoder;

	@GetMapping("/Customer") // Retrieve all Customers
	public List<Customer> getallCustomers() {
		return customerRepository.findAll();
	}

	@GetMapping("/Customer/{username}")
	public Optional<Customer> getCustomerByUsername(@PathVariable String username) {
		return customerRepository.findByUsername(username);
	}

	@GetMapping("/Account") // Retrieve all Accounts
	public List<Account> getallAccounts() {
		return accountRepository.findAll();
	}

	@GetMapping("/Account/{accountnumber}")
	public Optional<Account> getCustomerByUsername(@PathVariable Long accountnumber) {
		return accountRepository.findById(accountnumber);
	}

	// If this function returns an error then try running the function after
	// dropping all the tables in the rib database and rerun the java app
	@GetMapping("/GenerateDummyData")
	public List<Customer> generateDummyData() {

		// Creating lists of transactions for all accounts of each customer
		List<Transaction> nayanTransaction = new ArrayList<Transaction>();
		List<Transaction> shantiTransaction = new ArrayList<Transaction>();
		List<Transaction> ojaswaTransaction = new ArrayList<Transaction>();

		Random rand = new Random(); // For Generating Random values

		// Generating Random Transactions for Nayan
		for (int i = 0; i < 20; i++) {
			String category = rand.nextInt(10) < 5 ? rand.nextInt(10) < 5 ? "Travel" : "Others"
					: rand.nextInt(10) < 5 ? "Bill" : "Food";
			String TransactionId = "TXN" + i + (rand.nextInt(9000000) + 1000000);

			nayanTransaction.add(new Transaction(TransactionId, category,
					"Transaction to " + (10000000 + rand.nextInt(90000000)) + "- UPI " + rand.nextInt(30) + "/"
							+ rand.nextInt(12) + "/" + (rand.nextInt(42) + 1980),
					Date.from(ZonedDateTime.now().minusDays(rand.nextInt(1000)).toInstant()),
					new BigDecimal(rand.nextInt(900000000) * 10 + 10000000), new BigDecimal(rand.nextInt(1000)),
					BigDecimal.ZERO));
		}

		// Generating Random Transactions for Shanti
		for (int i = 0; i < 20; i++) {
			String category = rand.nextInt(10) < 5 ? rand.nextInt(10) < 5 ? "Travel" : "Others"
					: rand.nextInt(10) < 5 ? "Bill" : "Food";
			String TransactionId = "TXS" + i + (rand.nextInt(9000000) + 1000000);

			shantiTransaction.add(new Transaction(TransactionId, category,
					"Transaction to " + (10000000 + rand.nextInt(90000000)) + "- UPI " + rand.nextInt(30) + "/"
							+ rand.nextInt(12) + "/" + (rand.nextInt(42) + 1980),
					Date.from(ZonedDateTime.now().minusDays(rand.nextInt(1000)).toInstant()),
					new BigDecimal(rand.nextInt(900000) + 100000), new BigDecimal(rand.nextInt(100000)),
					BigDecimal.ZERO));
		}

		// Generating Random Transactions for Ojaswa
		for (int i = 0; i < 20; i++) {
			String category = rand.nextInt(10) < 5 ? rand.nextInt(10) < 5 ? "Travel" : "Others"
					: rand.nextInt(10) < 5 ? "Bill" : "Food";
			String TransactionId = "TXO" + i + (rand.nextInt(9000000) + 1000000);

			ojaswaTransaction.add(new Transaction(TransactionId, category,
					"Transaction to " + (10000000 + rand.nextInt(90000000)) + "- UPI " + rand.nextInt(30) + "/"
							+ rand.nextInt(12) + "/" + (rand.nextInt(42) + 1980),
					Date.from(ZonedDateTime.now().minusDays(rand.nextInt(1000)).toInstant()),
					new BigDecimal(rand.nextInt(900000) + 100000), new BigDecimal(rand.nextInt(100000)),
					BigDecimal.ZERO));
		}

		// Creating List of accounts for each customer
		List<Account> nayanAccount = new ArrayList<Account>();
		List<Account> shantiAccount = new ArrayList<Account>();
		List<Account> ojaswaAccount = new ArrayList<Account>();

		// Adding Accounts to the accounts list and setting transactions list
		nayanAccount.add(new Account(10101010L, 100000000000L, "Saving", 0L, new Date(), "Silver", "PatelNagar")
				.setTransactions(nayanTransaction.subList(0, 10)));
		nayanAccount.add(new Account(10000000L, 100000000000L, "Saving", 0L, new Date(), "Gold", "PatelNagar")
				.setTransactions(nayanTransaction.subList(10, 20)));
		shantiAccount.add(new Account(787328L, 7329874L, "Current", 0L, new Date(), "Platinum", "IN")
				.setTransactions(shantiTransaction.subList(0, 10)));
		shantiAccount.add(new Account(7982392L, 9880332L, "Saving", 0L, new Date(), "Platinum", "PatelNagar")
				.setTransactions(shantiTransaction.subList(10, 20)));
		ojaswaAccount.add(new Account(329882L, 320984L, "Current", 0L, new Date(), "Diamond", "PatelNagar")
				.setTransactions(ojaswaTransaction.subList(0, 10)));
		ojaswaAccount.add(new Account(32897L, 3098509L, "Current", 0L, new Date(), "Diamond", "PatelNagar")
				.setTransactions(ojaswaTransaction.subList(10, 20)));

		// Creating Customers and setting their accounts;
		Customer nayan = new Customer("Active", 7988934699L, new Date(1999, 3, 10), "nayan.pravesh@saggezza.com",
				"Nayan", passwordEncoder.encode("Nayan"), "Nayan Verma", "LoggedIn").setAccounts(nayanAccount);
		Customer shanti = new Customer("Active", 6265510415L, new Date(1997, 5, 23), "shanti.mukati@saggezza.com",
				"Shanti", passwordEncoder.encode("Shanti"), "Shanti Mukati", "LoggedIn").setAccounts(shantiAccount);
		Customer ojaswa = new Customer("Active", 7897842634L, new Date(1997, 1, 16), "ojaswa.chaurasia@saggezza.com",
				"Ojaswa", passwordEncoder.encode("Ojaswa"), "Ojaswa Chaurasia", "LoggedIn").setAccounts(ojaswaAccount);

		// Saving the Customers and returning their data
		return customerRepository.saveAll(Arrays.asList(nayan, shanti, ojaswa));
	}

}
