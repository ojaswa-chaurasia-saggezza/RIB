
package com.rib.rib.controller;

import java.math.BigDecimal;
import java.text.Normalizer.Form;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.TimeZone;
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
import com.rib.rib.model.Biller;
import com.rib.rib.model.CreditCard;
import com.rib.rib.model.Customer;
import com.rib.rib.model.GlobalBiller;
import com.rib.rib.model.Transaction;
import com.rib.rib.payload.request.BeneficiaryRequest;
import com.rib.rib.payload.request.BillerRequest;
import com.rib.rib.payload.request.LoginRequest;
import com.rib.rib.payload.request.PFARequest;
import com.rib.rib.payload.request.PayRequest;
import com.rib.rib.payload.request.TransferWithinBankBeneficiaryRequest;
import com.rib.rib.payload.request.TransferWithinOwnAccountsRequest;
import com.rib.rib.payload.response.MessageResponse;
import com.rib.rib.repository.AccountRepository;
import com.rib.rib.repository.CreditCardRepository;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.repository.GlobalBillerRepository;
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
	private GlobalBillerRepository globalBillerRepository;
	@Autowired
	private CreditCardRepository creditCardRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@GetMapping("/Customer") // Retrieve all Customers
	public List<Customer> getallCustomers() {
		return customerRepository.findAll();
	}

	@GetMapping("/Customer/{username}") // Retrieve Customer by username ( for Testing, remove when deploying)
	public Optional<Customer> getCustomerByUsername(@PathVariable String username) {
		return customerRepository.findByUsername(username);
	}

	@GetMapping("/CustomerDetails") // Retrieve Customer Details using the jwt token
	public Optional<Customer> getCustomerByUsernameAuthentication() {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String username = auth.getName();
		Optional<Customer> customer = customerRepository.findByUsername(username);

		return customer;
	}

	@GetMapping("/Customer/{username}/enableLoginStatus") // For testing purpose
	public void enableloginStatus(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).orElseThrow(null);

		customer.setLoginStatus("Registered");
		customerRepository.save(customer);

	}

	@PostMapping("/resetPassword") // Reset the password using the jwt token
	public ResponseEntity<?> resetPassword(@Valid @RequestBody LoginRequest loginRequest) {
		/*
		 * Here the incoming loginRequest.username is actually the old password and
		 * loginRequest.password is actually the new password.
		 */
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String username = auth.getName();
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(username, loginRequest.getUsername()));

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

	@GetMapping("/Customer/{username}/disableLoginStatus") // For testing purposes
	public void disableLoginStatus(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).orElseThrow(null);
		customer.setLoginStatus("Unregistered");
		customerRepository.save(customer);
	}

	@GetMapping("/Account") // Retrieve all Accounts
	public List<Account> getallAccounts() {
		return accountRepository.findAll();
	}

	@GetMapping("/Account/{accountNumber}") // Retrieve Account by Account number
	public Optional<Account> getAccoutnByAccountNumber(@PathVariable Long accountNumber) {
		return accountRepository.findById(accountNumber);
	}

	@GetMapping("/CreditCard")
	public List<CreditCard> getAllCreditCard() {
		return creditCardRepository.findAll();
	}

	@GetMapping("/CreditCard/{creditCardNumber}")
	public Optional<CreditCard> getCreditCardByCreditCardNumber(@PathVariable Long creditCardNumber) {
		return creditCardRepository.findById(creditCardNumber);
	}

	@PostMapping("/CreditCard/{CreditCardNumber}/PFA")
	public List<Object> getCreditCardPFA(@PathVariable Long CreditCardNumber, @RequestBody PFARequest pfaRequest) {

		System.out.println("JavaScript date : " + pfaRequest.getEndDate());
		System.out.println("Java date : " + new Date());

		List<Transaction> transactions = creditCardRepository.findById(CreditCardNumber).orElseThrow()
				.getTransactions();

		HashMap<String, BigDecimal> pfa = new HashMap<String, BigDecimal>();

		for (Transaction transaction : transactions) {

			if (transaction.getDate().after(pfaRequest.getStartDate())
					&& transaction.getDate().before(pfaRequest.getEndDate())) {
				String key = transaction.getCategory();
				BigDecimal value = transaction.getWithdraw();
				pfa.put(key, pfa.getOrDefault(key, new BigDecimal(0)).add(value));
			}
		}

		List<Object> PFA = new ArrayList<Object>();
		PFA.add(new ArrayList<String>(Arrays.asList("Category", "Withdrawal")));

		pfa.forEach((key, value) -> {
			PFA.add(new ArrayList<Object>(Arrays.asList(key, value)));
		});

		return PFA;

	}

	// Add beneficiary API
	@PostMapping("/AddBeneficiary")
	public ResponseEntity<?> addBeneficiary(@RequestBody BeneficiaryRequest beneficiaryRequest) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow(null);

		Account account = accountRepository.findById(beneficiaryRequest.getAccountNumber()).orElse(null);

		if (account == null)
			return ResponseEntity.badRequest().body(new MessageResponse("Account not found"));

		else if (!account.getIFSC().equals(beneficiaryRequest.getIfsc())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Invalid IFSC code"));
		} else {
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
	public ResponseEntity<?> editBeneficiary(@RequestBody BeneficiaryRequest beneficiaryRequest) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow(null);

		List<Beneficiary> list = customer.getBeneficiaries();
		Beneficiary currentBeneficiary = null;
		for (Beneficiary beneficiary : list) {
			if (beneficiary.getNickName().equals(beneficiaryRequest.getNickName())) {
				currentBeneficiary = beneficiary;
				break;
			}
		}

		Account newAccount = accountRepository.findById(beneficiaryRequest.getAccountNumber()).orElse(null);
		if (newAccount == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Account not found"));
		} else if (!newAccount.getIFSC().equals(beneficiaryRequest.getIfsc())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Invalid IFSC Code"));
		} else {
			currentBeneficiary.setAccount(newAccount);
			customer.setBeneficiaries(list);
			customerRepository.save(customer);
			return ResponseEntity.ok(new MessageResponse("Beneficiary edit successfully"));
		}
	}
	
	@GetMapping("/GetAllBeneficiaries")
	public List<Beneficiary> getAllBeneficiaries()
	{
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElse(null);
		
		return customer.getBeneficiaries();
	}

	@PostMapping("/TransferWithinBankAccounts")

	public ResponseEntity<?> transferWithinOwnAccounts(
			@RequestBody TransferWithinOwnAccountsRequest transferWithinOwnAccountsRequest) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElseThrow(null);
		List<Account> accounts = customer.getAccounts();

		Account fromAccount = null;
		Account toAccount = null;

		for (Account account : accounts) {

			if (fromAccount == null
					&& account.getAccountNumber().equals(transferWithinOwnAccountsRequest.getFromAccountNumber()))
				fromAccount = account;

			if (toAccount == null
					&& account.getAccountNumber().equals(transferWithinOwnAccountsRequest.getToAccountNumber()))
				toAccount = account;

			if (fromAccount != null && toAccount != null)
				break;

		}
		if (fromAccount.getBalance().subtract(transferWithinOwnAccountsRequest.getAmount())
				.compareTo(new BigDecimal(5000)) == -1) {
			return ResponseEntity.badRequest().body(new MessageResponse("Insufficient balance"));
		}

		TimeZone timeZone = TimeZone.getTimeZone("UTC");
		Calendar calendar = Calendar.getInstance(timeZone);

		fromAccount.setBalance(fromAccount.getBalance().subtract(transferWithinOwnAccountsRequest.getAmount()));

		toAccount.setBalance(toAccount.getBalance().add(transferWithinOwnAccountsRequest.getAmount()));

		int day = calendar.get(Calendar.DATE);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);
		long mili = System.currentTimeMillis();
		String transactionId = "TXN" + day + month + year + mili;
		String category = "Transfer";
		String narration = "Transaction to " + toAccount.getAccountNumber() + "-" + " SELF " + day + "/" + month + "/"
				+ year;
		Date date = calendar.getTime();

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Transaction fromTransaction = new Transaction(transactionId, category, narration, date,
				fromAccount.getBalance(), transferWithinOwnAccountsRequest.getAmount(), new BigDecimal(0));

		mili = System.currentTimeMillis();
		transactionId = "TXN" + day + month + year + mili;
		narration = "Transaction from " + fromAccount.getAccountNumber() + "-" + " SELF " + day + "/" + month + "/"
				+ year;

		Transaction toTransaction = new Transaction(transactionId, category, narration, date, toAccount.getBalance(),
				new BigDecimal(0), transferWithinOwnAccountsRequest.getAmount());

		List<Transaction> fromTransactions = fromAccount.getTransactions();
		List<Transaction> toTransactions = toAccount.getTransactions();

		fromTransactions.add(fromTransaction);
		toTransactions.add(toTransaction);

		customerRepository.save(customer);
		return ResponseEntity.ok(new MessageResponse("Transaction successful"));

	}

	@PostMapping("/FTWithinBankBeneficiary")
	public ResponseEntity<?> transferWithinBankBeneficiary(
			@RequestBody TransferWithinBankBeneficiaryRequest bankBeneficiaryRequest) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Customer fromCustomer = customerRepository.findByUsername(auth.getName()).orElse(null);

		List<Beneficiary> beneficiaries = fromCustomer.getBeneficiaries();

		Beneficiary myBeneficiary = null;

		for (Beneficiary beneficiary : beneficiaries) {

			if (beneficiary.getNickName().equals(bankBeneficiaryRequest.getBeneficiary()))
				myBeneficiary = beneficiary;

			if (myBeneficiary != null)
				break;

		}

		Account fromAccount = accountRepository.findById(bankBeneficiaryRequest.getFromAccount()).orElse(null);
		Account toAccount = myBeneficiary.getAccount();
		
		Customer toCustomer = toAccount.getCustomer();

		if (fromAccount.getBalance().subtract(bankBeneficiaryRequest.getAmount())
				.compareTo(new BigDecimal(5000)) == -1) {
			return ResponseEntity.badRequest().body(new MessageResponse("Insufficient balance"));
		}
		
		TimeZone timeZone = TimeZone.getTimeZone("UTC");
		Calendar calendar = Calendar.getInstance(timeZone);

		fromAccount.setBalance(fromAccount.getBalance().subtract(bankBeneficiaryRequest.getAmount()));

		toAccount.setBalance(toAccount.getBalance().add(bankBeneficiaryRequest.getAmount()));

		int day = calendar.get(Calendar.DATE);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);
		long mili = System.currentTimeMillis();
		String transactionId = "TXN" + day + month + year + mili;
		String category = "Transfer";
		String narration = "Transaction to " + toAccount.getAccountNumber() + "-" + " SELF " + day + "/" + month + "/"
				+ year;
		Date date = calendar.getTime();

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Transaction fromTransaction = new Transaction(transactionId, category, narration, date,
				fromAccount.getBalance(), bankBeneficiaryRequest.getAmount(), new BigDecimal(0));

		mili = System.currentTimeMillis();
		transactionId = "TXN" + day + month + year + mili;
		narration = "Transaction from " + fromAccount.getAccountNumber() + "-" + " SELF " + day + "/" + month + "/"
				+ year;

		Transaction toTransaction = new Transaction(transactionId, category, narration, date, toAccount.getBalance(),
				new BigDecimal(0), bankBeneficiaryRequest.getAmount());

		List<Transaction> fromTransactions = fromAccount.getTransactions();
		List<Transaction> toTransactions = toAccount.getTransactions();

		fromTransactions.add(fromTransaction);
		toTransactions.add(toTransaction);

		customerRepository.save(fromCustomer);
		customerRepository.save(toCustomer);

		
		return ResponseEntity.ok(new MessageResponse("Transaction Successful"));

	}

	@PostMapping("/AddBiller")
	public ResponseEntity<?> addBiller(@RequestBody BillerRequest billerRequest) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		Customer customer = customerRepository.findByUsername(authentication.getName()).orElse(null);

		Biller biller = new Biller(billerRequest.getBillerAccountNumber(), billerRequest.getDescription());

		GlobalBiller globalBiller = globalBillerRepository.findByName(billerRequest.getBillerName());

		biller.setGlobalBiller(globalBiller);

		List<Biller> billers = customer.getBillers();
		billers.add(biller);

		customerRepository.save(customer);
		return ResponseEntity.ok(new MessageResponse("Biller added successfully"));
	}

	@PostMapping("/EditBiller")
	public ResponseEntity<?> editBiller(@RequestBody BillerRequest billerRequest) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Customer customer = customerRepository.findByUsername(auth.getName()).orElse(null);

		List<Biller> billers = customer.getBillers();

		Biller currBiller = null;

		for (Biller biller : billers) {

			if (biller.getDescription().equals(billerRequest.getDescription())) {
				currBiller = biller;
				break;
			}
		}

		GlobalBiller newGlobalBiller = globalBillerRepository.findByName(billerRequest.getBillerName());

		currBiller.setGlobalBiller(newGlobalBiller);
		currBiller.setBillerAccountNumber(billerRequest.getBillerAccountNumber());
		customer.setBillers(billers);
		customerRepository.save(customer);
		return ResponseEntity.ok(new MessageResponse("Biller edited successfully"));

	}

	@PostMapping("/Pay")
	public ResponseEntity<?> pay(@RequestBody PayRequest payRequest) {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Customer customer = customerRepository.findByUsername(auth.getName()).orElse(null);

		Account fromAccount = accountRepository.findById(payRequest.getFromAccount()).orElse(null);

		if (fromAccount.getBalance().subtract(payRequest.getAmount()).compareTo(new BigDecimal(5000)) == -1) {
			return ResponseEntity.badRequest().body(new MessageResponse("Insufficient balance"));
		}

		List<Biller> billers = customer.getBillers();

		Biller myBiller = null;

		for (Biller biller : billers) {

			if (biller.getDescription().equals(payRequest.getDescription())) {
				myBiller = biller;
				break;
			}
		}

		TimeZone timeZone = TimeZone.getTimeZone("UTC");
		Calendar calendar = Calendar.getInstance(timeZone);

		fromAccount.setBalance(fromAccount.getBalance().subtract(payRequest.getAmount()));

		int day = calendar.get(Calendar.DATE);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);
		long mili = System.currentTimeMillis();
		String transactionId = "TXN" + day + month + year + mili;
		String category = "BILL";
		String narration = "Transaction to " + myBiller.getGlobalBiller().getBillerName() + " - "
				+ myBiller.getBillerAccountNumber() + day + " /" + month + "/" + year;
		Date date = calendar.getTime();

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Transaction fromTransaction = new Transaction(transactionId, category, narration, date,
				fromAccount.getBalance(), payRequest.getAmount(), new BigDecimal(0));

		List<Transaction> transactions = fromAccount.getTransactions();
		transactions.add(fromTransaction);

		customerRepository.save(customer);

		return ResponseEntity.ok(new MessageResponse("kitna paisa loge"));
	}

	@PostMapping("/GenerateFarjiData")
	public Customer generateFarjiData() {

		List<Transaction> farjiTransactions = new ArrayList<Transaction>();

		Random rand = new Random();

		for (int i = 0; i < 30; i++) {
			String category = rand.nextInt(10) < 5 ? rand.nextInt(10) < 5 ? "Travel" : "Others"
					: rand.nextInt(10) < 5 ? "Bill" : "Food";
			String TransactionId = "TXN" + i + (rand.nextInt(9000000) + 1000000);

			farjiTransactions.add(new Transaction(TransactionId, category,
					"Transaction to " + (10000000 + rand.nextInt(90000000)) + "- UPI " + rand.nextInt(30) + "/"
							+ rand.nextInt(12) + "/" + (rand.nextInt(42) + 1980),
					Date.from(ZonedDateTime.now().minusDays(rand.nextInt(1000)).toInstant()),
					new BigDecimal(rand.nextInt(900000000) * 10 + 10000000), new BigDecimal(rand.nextInt(1000)),
					BigDecimal.ZERO));
		}

		Calendar calendar = Calendar.getInstance();

		calendar.set(2000, 2, 20);

		Customer farjiAdmi = new Customer(7988934699L, calendar.getTime(), "farji.admi@saggezza.com", "Farji",
				passwordEncoder.encode("Farji"), "Farji Admi");

		Account account = new Account(420420420420L, new BigDecimal(6969696969669.0), "Saving", new BigDecimal(0),
				new Date(), "Silver", "FarjiNagar");
		account.setTransactions(farjiTransactions);

		farjiAdmi.addAccount(account);

		return customerRepository.save(farjiAdmi);

	}

	@GetMapping("/faltu")
	public void faltu() {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Customer customer = customerRepository.findByUsername(auth.getName()).orElse(null);

		List<Account> accounts = customer.getAccounts();
		accounts.forEach(acc -> System.out.println(acc.getCustomer().getName() + " mil gaya tu."));

	}

	public void generateTransaction(List<Transaction> transactions, Random rand, int i) {
		String category = rand.nextInt(10) < 5 ? rand.nextInt(10) < 5 ? "Travel" : "Others"
				: rand.nextInt(10) < 5 ? "Bill" : "Food";
		String TransactionId = "TXN" + i + (rand.nextInt(9000000) + 1000000);

		transactions.add(new Transaction(TransactionId, category,
				"Transaction to " + (10000000 + rand.nextInt(90000000)) + "- UPI " + rand.nextInt(30) + "/"
						+ rand.nextInt(12) + "/" + (rand.nextInt(42) + 1980),
				Date.from(ZonedDateTime.now().minusDays(rand.nextInt(1000)).toInstant()),
				new BigDecimal(rand.nextInt(900000) + 100000), new BigDecimal(rand.nextInt(100000)), BigDecimal.ZERO));
	}

	// If this function returns an error then try running the function after
	// dropping all the tables in the rib database and rerun the java app
	@GetMapping("/GenerateDummyData")
	public List<Customer> generateDummyData() {

		// Creating lists of transactions for all accounts of each customer
		List<Transaction> nayanTransaction = new ArrayList<Transaction>();
		List<Transaction> shantiTransaction = new ArrayList<Transaction>();
		List<Transaction> ojaswaTransaction = new ArrayList<Transaction>();
		List<Transaction> creditCardTransaction = new ArrayList<Transaction>();

		Random rand = new Random(); // For Generating Random values

		// Generating Random Transactions for Nayan
		int i = 0;
		for (; i < 300; i++) 
			generateTransaction(nayanTransaction, rand, i);

		// Generating Random Transactions for Shanti
		for (; i < 567+300; i++) 
			generateTransaction(shantiTransaction, rand, i);

		// Generating Random Transactions for Ojaswa
		for (; i < 169+300+567; i++) 
			generateTransaction(ojaswaTransaction, rand, i);

		// Generating Transactions for CreditCard
		for (; i < 269+300+567+169; i++) {
			generateTransaction(creditCardTransaction, rand, i);
		}

		// Creating customers
		Calendar calendar = Calendar.getInstance();

		calendar.set(1999, 2, 10);
		Customer nayan = new Customer(7988934699L, calendar.getTime(), "nayan.pravesh@saggezza.com", "Nayan",
				passwordEncoder.encode("Nayan"), "Nayan Verma");
		calendar.set(1997, 4, 23);
		Customer shanti = new Customer(6265510415L, calendar.getTime(), "shanti.mukati@saggezza.com", "Shanti",
				passwordEncoder.encode("Shanti"), "Shanti Mukati");
		calendar.set(1997, 0, 16);
		Customer ojaswa = new Customer(7897842634L, calendar.getTime(), "ojaswa.chaurasia@saggezza.com", "Ojaswa",
				passwordEncoder.encode("Ojaswa"), "Ojaswa Chaurasia");

		// Creating List of accounts for each customer
		List<Account> nayanAccounts = new ArrayList<Account>();
		List<Account> shantiAccounts = new ArrayList<Account>();
		List<Account> ojaswaAccounts = new ArrayList<Account>();

		// Adding Accounts to the accounts list and setting transactions list
		nayanAccounts.add(new Account(10101010L, new BigDecimal(100000000000.0), "Saving", new BigDecimal(0), new Date(),
				"Silver", "PatelNagar").setTransactions(nayanTransaction.subList(0, nayanTransaction.size() / 2)));
		nayanAccounts.add(new Account(10000000L, new BigDecimal(100000000000L), "Saving", new BigDecimal(0L), new Date(),
				"Gold", "PatelNagar").setTransactions(
						nayanTransaction.subList(nayanTransaction.size() / 2, nayanTransaction.size())));
		shantiAccounts.add(new Account(787328L, new BigDecimal(7329874L), "Current", new BigDecimal(0L), new Date(),
				"Platinum", "IN").setTransactions(shantiTransaction.subList(0, shantiTransaction.size() / 2)));
		shantiAccounts.add(new Account(7982392L, new BigDecimal(9880332L), "Saving", new BigDecimal(0L), new Date(),
				"Platinum", "PatelNagar").setTransactions(
						shantiTransaction.subList(shantiTransaction.size() / 2, shantiTransaction.size())));
		ojaswaAccounts.add(new Account(329882L, new BigDecimal(320984L), "Current", new BigDecimal(0L), new Date(),
				"Diamond", "PatelNagar").setTransactions(ojaswaTransaction.subList(0, ojaswaTransaction.size() / 2)));
		ojaswaAccounts.add(new Account(32897L, new BigDecimal(3098509L), "Current", new BigDecimal(0L), new Date(),
				"Diamond", "PatelNagar").setTransactions(
						ojaswaTransaction.subList(ojaswaTransaction.size() / 2, ojaswaTransaction.size())));
		
		// adding accounts for customer
		for(Account nayanAccount : nayanAccounts) 
			nayan.addAccount(nayanAccount);
		
		for(Account shantiAccount : shantiAccounts) 
			shanti.addAccount(shantiAccount);
		
		for(Account ojaswaAccount : ojaswaAccounts) 
			ojaswa.addAccount(ojaswaAccount);
		
		List<CreditCard> shantiCreditCard = new ArrayList<CreditCard>();
		List<CreditCard> ojaswaCreditCard = new ArrayList<CreditCard>();

		shantiCreditCard.add(new CreditCard(7777777777777777L, "Travel", 100000000L, 2000000L, new Date())
				.setTransactions(creditCardTransaction.subList(0, 111)));
		ojaswaCreditCard.add(new CreditCard(3333333333333333L, "General", 1000000L, 370000L, new Date())
				.setTransactions(creditCardTransaction.subList(111, 200)));
		ojaswaCreditCard.add(new CreditCard(3333333333333331L, "Travel", 500000L, 0L, new Date())
				.setTransactions(creditCardTransaction.subList(200, 269)));
		
		shanti.setCreditCard(shantiCreditCard);
		ojaswa.setCreditCard(ojaswaCreditCard);

		// Creating Customers and setting their accounts;

		List<GlobalBiller> billers = new ArrayList<GlobalBiller>();
		billers.add(new GlobalBiller("self credit card", "Card"));
		billers.add(new GlobalBiller("Jio Mobile", "Mobile"));
		billers.add(new GlobalBiller("Airtel", "Mobile"));
		billers.add(new GlobalBiller("Indane Gas", "Gas"));
		billers.add(new GlobalBiller("Reliance", "Electricity"));
		billers.add(new GlobalBiller("DishTV", "DTH"));
		billers.add(new GlobalBiller("BSNL", "Broadband"));
		globalBillerRepository.saveAll(billers);

		// Saving the Customers and returning their data
		return customerRepository.saveAll(Arrays.asList(nayan, shanti, ojaswa));
	}

}
