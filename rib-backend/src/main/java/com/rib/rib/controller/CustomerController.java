
package com.rib.rib.controller;

import java.math.BigDecimal;
import java.text.Normalizer.Form;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import javax.validation.Valid;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.model.Account;
import com.rib.rib.model.Beneficiary;
import com.rib.rib.model.Customer;
import com.rib.rib.model.Transaction;
import com.rib.rib.payload.request.BeneficiaryRequest;
import com.rib.rib.payload.request.LoginRequest;
import com.rib.rib.payload.request.TransferWithinBankBeneficiaryRequest;
import com.rib.rib.payload.response.MessageResponse;
import com.rib.rib.repository.AccountRepository;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.repository.TransactionRepositary;
import com.rib.rib.security.services.CustomerDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	AuthenticationManager authenticationManager;
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

	@GetMapping("/CustomerDetails")
	public Optional<Customer> getCustomerByUsernameAuthentication() {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String username = auth.getName();
		Optional<Customer> customer = customerRepository.findByUsername(username);
		
		return customer;
	}

	@GetMapping("/Customer/{username}/enableLoginStatus")
	public void enableloginStatus(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).orElseThrow(null);

		customer.setLoginStatus("Registered");
		customerRepository.save(customer);

	}

	@PostMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody LoginRequest loginRequest) {
		/*
		 * Here the incoming loginRequest.username is actually the old password and
		 * loginRequest.password is actually the new password.
		 */
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String username = auth.getName();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(username,loginRequest.getUsername()));

			Customer customer = customerRepository.findByUsername(username).orElseThrow(null);

			customer.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
			customer.setLoginStatus("Registered");
			customerRepository.save(customer);
			return ResponseEntity.ok(new MessageResponse("Reset Successfull"));

		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.badRequest().body(new MessageResponse("The Old Password is incorrect"));
		}

	}

	@GetMapping("/Customer/{username}/disableLoginStatus")
	public void disableLoginStatus(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).orElseThrow(null);
		customer.setLoginStatus("Unregistered");
		customerRepository.save(customer);
	}

	@GetMapping("/Account") // Retrieve all Accounts
	public List<Account> getallAccounts() {
		return accountRepository.findAll();
	}

	@GetMapping("/Account/{accountnumber}")
	public Optional<Account> getCustomerByUsername(@PathVariable Long accountnumber) {
		return accountRepository.findById(accountnumber);
	}
	
	//Add beneficiary API
	@PostMapping("/AddBeneficiary")
	public ResponseEntity<?> addBeneficiary(@RequestBody BeneficiaryRequest beneficiaryRequest) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow(null);
		
		Account account = accountRepository.findById(beneficiaryRequest.getAccountNumber()).orElse(null);

		if(account==null)
			return ResponseEntity.badRequest().body(new MessageResponse("Account not found"));
		
		else if(!account.getIFSC().equals(beneficiaryRequest.getIfsc()))
		{
			return ResponseEntity.badRequest().body(new MessageResponse("Invalid IFSC code"));
		}
		else
		{
			Beneficiary beneficiary = new Beneficiary(beneficiaryRequest.getNickName());
			beneficiary.setAccount(account);
			
			List<Beneficiary> list = customer.getBeneficiaries();
			list.add(beneficiary);
			
			customer.setBeneficiaries(list);
			
			customerRepository.save(customer);
			return ResponseEntity.ok(new MessageResponse("Beneficiary added successfully"));
		}
		
	}
	
	
	@PutMapping("/EditBeneficiary")
	public ResponseEntity<?> editBeneficiary(@RequestBody BeneficiaryRequest beneficiaryRequest)
	{
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
	    Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow(null);
	    
    	List<Beneficiary> list = customer.getBeneficiaries();
    	Beneficiary currentBeneficiary = null;
    	for(Beneficiary beneficiary: list)
    	{
    		if(beneficiary.getNickName().equals(beneficiaryRequest.getNickName())) {
    			currentBeneficiary = beneficiary;
    			break;
    		}
    	}
    	
    	Account newAccount = accountRepository.findById(beneficiaryRequest.getAccountNumber()).orElse(null);
    	if(newAccount == null) {
    		return ResponseEntity.badRequest().body(new MessageResponse("Account not found"));
    	}
    	else if(!newAccount.getIFSC().equals(beneficiaryRequest.getIfsc())) {
    		return ResponseEntity.badRequest().body(new MessageResponse("Invalid IFSC Code"));
    	}
    	else {
    		currentBeneficiary.setAccount(newAccount);
    		customer.setBeneficiaries(list);
    		customerRepository.save(customer);
    		return ResponseEntity.ok(new MessageResponse("Beneficiary edit successfully"));
    	}
	}
	
	@PostMapping("/FTWithinBankBeneficiary")
	public void transferWithinBankBeneficiary(@RequestBody TransferWithinBankBeneficiaryRequest bankBeneficiaryRequest) {
		
		 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		 
		 Customer customer = customerRepository.findByUsername(auth.getName()).orElse(null);
		 
		 List<Beneficiary> beneficiaries = customer.getBeneficiaries();
		 
		 Beneficiary myBeneficiary = null;
		 
		 for(Beneficiary beneficiary: beneficiaries) {
			 
			 if(beneficiary.getNickName().equals(bankBeneficiaryRequest.getBeneficiary())) 
				 myBeneficiary = beneficiary;
			 
			 if(myBeneficiary!=null)
				 break;
			 
		 }
		 
		 Account fromAccount = accountRepository.findById(bankBeneficiaryRequest.getFromAccount()).orElse(null);
		 Account toAccount = myBeneficiary.getAccount();
		 
		 if(fromAccount.getBalance().subtract(bankBeneficiaryRequest.getAmount()).compareTo(new BigDecimal(5000)) == -1)
		 {
			 
		 }
		 
		 
		 
		
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
		for (int i = 0; i < 100; i++) {
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
		for (int i = 0; i < 167; i++) {
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
		for (int i = 0; i < 69; i++) {
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
		
		Calendar calendar = Calendar.getInstance();
		

		// Adding Accounts to the accounts list and setting transactions list
		nayanAccount.add(new Account(10101010L, new BigDecimal(100000000000.0), "Saving", new BigDecimal(0.0), new Date(), "Silver", "PatelNagar")
				.setTransactions(nayanTransaction.subList(0, nayanTransaction.size()/2)));
		nayanAccount.add(new Account(10000000L, new BigDecimal(100000000000.0), "Saving", new BigDecimal(0.0), new Date(), "Gold", "PatelNagar")
				.setTransactions(nayanTransaction.subList(nayanTransaction.size()/2, nayanTransaction.size())));
		shantiAccount.add(new Account(787328L, new BigDecimal(7329874), "Current", new BigDecimal(0.0), new Date(), "Platinum", "IN")
				.setTransactions(shantiTransaction.subList(0, shantiTransaction.size()/2)));
		shantiAccount.add(new Account(7982392L, new BigDecimal(9880332), "Saving", new BigDecimal(0.0), new Date(), "Platinum", "PatelNagar")
				.setTransactions(shantiTransaction.subList(shantiTransaction.size()/2, shantiTransaction.size())));
		ojaswaAccount.add(new Account(329882L, new BigDecimal(320984), "Current", new BigDecimal(0.0), new Date(), "Diamond", "PatelNagar")
				.setTransactions(ojaswaTransaction.subList(0, ojaswaTransaction.size()/2)));
		ojaswaAccount.add(new Account(32897L, new BigDecimal(3098509), "Current", new BigDecimal(0.0), new Date(), "Diamond", "PatelNagar")
				.setTransactions(ojaswaTransaction.subList(ojaswaTransaction.size()/2, ojaswaTransaction.size())));

		// Creating Customers and setting their accounts;
		calendar.set(1999, 2, 10);
		Customer nayan = new Customer(7988934699L, calendar.getTime(), "nayan.pravesh@saggezza.com", "Nayan",
				passwordEncoder.encode("Nayan"), "Nayan Verma").setAccounts(nayanAccount);
		calendar.set(1997, 4, 23);
		Customer shanti = new Customer(6265510415L, calendar.getTime(), "shanti.mukati@saggezza.com", "Shanti",
				passwordEncoder.encode("Shanti"), "Shanti Mukati").setAccounts(shantiAccount);
		calendar.set(1997, 0, 16);
		Customer ojaswa = new Customer(7897842634L, calendar.getTime(), "ojaswa.chaurasia@saggezza.com", "Ojaswa",
				passwordEncoder.encode("Ojaswa"), "Ojaswa Chaurasia").setAccounts(ojaswaAccount);

		// Saving the Customers and returning their data
		return customerRepository.saveAll(Arrays.asList(nayan, shanti, ojaswa));
	}

}
