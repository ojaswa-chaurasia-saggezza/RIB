package com.rib.rib.security.services;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;

@Service
public class OTPService {
	// Assigning the expiry time of OTP to 3 minutes
	private static final Integer EXPIRE_MINS = 3;
	private LoadingCache<String, Integer> otpCache;

	public OTPService() {
		super();
		otpCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
				.build(new CacheLoader<String, Integer>() {
					public Integer load(String Key) {
						return 0;
					}
				});

	}

//Generate and return OTP value
	public int generateOTP(String key) {
		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		otpCache.put(key, otp);
		return otp;

	}

//Fetch OTP From Cache file
	public int getOtp(String key) {
		try {
			return otpCache.get(key);

		} catch (Exception e) {

			return 0;
		}

	}

// Remove OTP
	public void clearOTP(String key) {
		otpCache.invalidate(key);
	}
}