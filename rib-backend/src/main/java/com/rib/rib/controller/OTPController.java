package com.rib.rib.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.EmailTemplate;
import com.rib.rib.model.Customer;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.security.services.EmailService;
import com.rib.rib.security.services.OTPService;

@RestController
public class OTPController {

	@Autowired
	public OTPService otpService;

	@Autowired
	public EmailService emailService;

	@Autowired
	public CustomerRepository customerRepository;

	@GetMapping("/generateOtp")
	public String generateOTP() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String username = auth.getName();

		Customer customer = customerRepository.findByUsername(username).orElseThrow(null);
		String email = customer.getEmail();
		int otp = otpService.generateOTP(username);

		EmailTemplate template = new EmailTemplate("SendOtp.html");
		Map<String, String> replacements = new HashMap<String, String>();
		replacements.put("user", username);
		replacements.put("otpnum", String.valueOf(otp));
		String message = template.getTemplate(replacements);
		try {
			emailService.sendOtpMessage(email, "OTP - RIB", message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		return "otppage";
	}

	@GetMapping("/validateOtp/{otpnum}")
	public @ResponseBody String validateOtp(@PathVariable int otpnum) {

		final String SUCCESS = "Entered Otp is valid";
		final String FAIL = "Entered Otp is not valid. Please Retry!";
		final String DISABLEACCOUNT = "Your account is disabled";
		int invalidAttempts = 0;

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		String username = auth.getName();
		Customer customer = customerRepository.findByUsername(username).orElseThrow(null);
		if (otpnum >= 0) {
			int serverOtp = otpService.getOtp(username);

			if (serverOtp > 0) {

				if (otpnum == serverOtp) {
					otpService.clearOTP(username);
					return (SUCCESS);
				}
			}
		}

		if (otpService.getInvalidAttempts(username) >= 3) {
			customer.setAccountStatus("DISABLE");
			customerRepository.save(customer);
			return DISABLEACCOUNT;
		}
		invalidAttempts = otpService.updateInvalidAttempts(username, otpService.getInvalidAttempts(username) + 1);
		return FAIL + " Invalid Attempts: " + invalidAttempts;

	}

}
