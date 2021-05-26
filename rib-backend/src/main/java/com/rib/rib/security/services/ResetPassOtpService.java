package com.rib.rib.security.services;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;

@Service
public class ResetPassOtpService {
	// Assigning the expire time of temporary password
	private static final Integer EXPIRE_MINS = 5;
	private LoadingCache<String, Integer> resetPasswordCache;

	public ResetPassOtpService() {
		super();
		resetPasswordCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
				.build(new CacheLoader<String, Integer>() {
					public Integer load(String Key) {
						return -1;
					}
				});

	}

//Generate and return temporary password
	public int generateOtp(String key) {
		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		resetPasswordCache.put("Reset:" + key, otp);
		return otp;
	}

// Fetch temporary password from cache
	public int getOtp(String key) {
		try {
			return resetPasswordCache.get("Reset:" + key);

		} catch (Exception e) {

			return -1;
		}

	}
	

// Remove temporary password from cache
	public void clearOtp(String key) {
		resetPasswordCache.invalidate(key);
	}
}