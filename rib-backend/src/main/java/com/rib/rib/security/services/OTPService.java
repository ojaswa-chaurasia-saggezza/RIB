package com.rib.rib.security.services;

import java.util.Random;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;

class OtpObject {
	Integer value;
	Integer invalidAttempt;
	
	public OtpObject() {
		value = 0;
		invalidAttempt = 0;
	}
	
	public OtpObject(Integer value, Integer invalidAttempt) {
		this.value = value;
		this.invalidAttempt = invalidAttempt;
	}
}

@Service
public class OTPService {
	// Assigning the expiry time of OTP to 3 minutes
	private static final Integer EXPIRE_MINS = 3;
	private LoadingCache<String, OtpObject> otpCache;

	public OTPService() {
		super();
		otpCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
				.build(new CacheLoader<String, OtpObject>() {
					public OtpObject load(String Key) {
						return new OtpObject();
					}
				});

	}

//Generate and return OTP value
	public int generateOTP(String key) {
		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		OtpObject otpObject = new OtpObject(otp,0);
		otpCache.put(key, otpObject);
		return otp;

	}

//Update invalid attempts in cache
	public int updateInvalidAttempts(String key, int attempts) {
		try {
			OtpObject otpObject = otpCache.get(key);
			otpObject.invalidAttempt = attempts;
			otpCache.put(key, otpObject);
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
		return attempts;
	}

	

//Fetch OTP From Cache file
	public int getOtp(String key) {
		try {
			return otpCache.get(key).value;

		} catch (Exception e) {

			return 0;
		}

	}
	
//Fetch invalid Attempts
	public int getInvalidAttempts(String key) {
		try {
			return otpCache.get(key).invalidAttempt;

		} catch (Exception e) {

			return 0;
		}
	}

// Remove OTP
	public void clearOTP(String key) {
		otpCache.invalidate(key);
	}
}