package com.rib.rib.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rib.rib.model.Customer;
import com.rib.rib.model.ERole;
import com.rib.rib.model.Role;
import com.rib.rib.payload.request.LoginRequest;
import com.rib.rib.payload.request.SignupRequest;
import com.rib.rib.payload.response.JwtResponse;
import com.rib.rib.payload.response.MessageResponse;
import com.rib.rib.repository.CustomerRepository;
import com.rib.rib.repository.RoleRepository;
import com.rib.rib.security.jwt.JwtUtils;
import com.rib.rib.security.services.CustomerDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		CustomerDetailsImpl userDetails = (CustomerDetailsImpl) authentication.getPrincipal();
		if (userDetails.getAccountStatus().equals("DISABLE")) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Disabled"));
		}
		if(userDetails.getLoginStatus().equals("Unregistered")) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Your account is not Registered. Please Sign in first."));
		}
		
		
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
	}

	@PostMapping("/signUp")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		CustomerDetailsImpl userDetails = (CustomerDetailsImpl) authentication.getPrincipal();
		if(userDetails.getAccountStatus().equals("DISABLE")) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Disabled"));
		}
		if(userDetails.getLoginStatus().equals("Registered")) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Account aready registered please Login."));
		}
		
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));	}

}
