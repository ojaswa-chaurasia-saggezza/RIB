package com.rib.rib.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.EmailTemplate;
import com.rib.rib.model.Customer;
import com.rib.rib.payload.request.ForgotUsernameRequest;
import com.rib.rib.payload.request.LoginRequest;
import com.rib.rib.payload.request.ResetPasswordRequest;
import com.rib.rib.payload.response.MessageResponse;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.security.jwt.JwtUtils;
import com.rib.rib.security.services.EmailService;
import com.rib.rib.security.services.TempPasswordService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ForgotController {

	@Autowired
	private TempPasswordService passwordService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/generateTempPassword")
	public ResponseEntity<?> generateTempPassword(@RequestBody String username) {
		
		// We need to do the below line because the username string will be like {"username":"theUsername"}
		username = username.split(":")[1].split("\"")[1];
		
		System.out.println(username);
		Customer customer = customerRepository.findByUsername(username).orElse(null);
		if(customer == null)
			return ResponseEntity.badRequest().body(new MessageResponse("Username not found"));
		
		String email = customer.getEmail();
		String tempPassword = passwordService.generateTempPassword("Temp:"+username);
		
		EmailTemplate template = new EmailTemplate("SendTempPassword.html");
		Map<String, String> replacements = new HashMap<>();
		replacements.put("user", customer.getName());
		replacements.put("password", tempPassword);
		
		String message = template.getTemplate(replacements);
		
		try {
			emailService.sendMessage(email, "RIB - Temporary Password", message);
		}
		catch (MessagingException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(new MessageResponse("Temporary password sent successfully"));
	}
	
	@PostMapping("/resetTempPassword")
	public ResponseEntity<?> resetTempPassword(@RequestBody ResetPasswordRequest resetRequest) {
		String username = resetRequest.getUsername();
		String tempPassword = resetRequest.getTempPassword();
		String newPassword = resetRequest.getNewPassword();
		String serverPassword = passwordService.getTempPassword("Temp:"+username);
		
		System.out.println("username:"+username+"    tempPassword:"+tempPassword +"     newPassword:"+newPassword+"      serverPassword"+serverPassword );
		
		if(serverPassword==null || !serverPassword.equals(tempPassword))
			return ResponseEntity.badRequest().body(new MessageResponse("Invalid temporary pasword"));
		
		Customer customer = customerRepository.findByUsername(username).orElse(null);
		
		customer.setPassword(passwordEncoder.encode(newPassword));
		customerRepository.save(customer);
		passwordService.clearTempPassword("Temp:"+username);
		return ResponseEntity.ok(new MessageResponse("Reset Successfull"));
	}
	
	@PostMapping("/forgotUsername")
	public ResponseEntity<?> forgotUsername(@RequestBody String email) {
		 
		// We need to do the below line because the email string will be like {"email":"theEmail"}
		email = email.split(":")[1].split("\"")[1];
		Customer customer = customerRepository.findByEmail(email).orElse(null);
		if(customer == null)
			return ResponseEntity.badRequest().body(new MessageResponse("Invalid email address"));
		EmailTemplate template = new EmailTemplate("SendUsername.html");
		Map<String,String> replacements = new HashMap<>();
		replacements.put("name", customer.getName());
		replacements.put("username", customer.getUsername());
		
		String message = template.getTemplate(replacements);
		
		try {
			emailService.sendMessage(email, "RIB - Forgot Username", message);
		}
		catch (MessagingException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(new MessageResponse("Username sent successfully"));
	}
	
}
