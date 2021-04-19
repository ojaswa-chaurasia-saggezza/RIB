package com.rib.rib.security.services;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;

@Service
public class TempPasswordService {
	// Assigning the expire time of temporary password
	private static final Integer EXPIRE_MINS = 5;
	private LoadingCache<String, String> tempPasswordCache;

	public TempPasswordService() {
		super();
		tempPasswordCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
				.build(new CacheLoader<String, String>() {
					public String load(String Key) {
						return new String();
					}
				});

	}

//Generate and return temporary password
	public String generateTempPassword(String key) {
		final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#";
		SecureRandom random = new SecureRandom();
		StringBuilder tempPassword = new StringBuilder();
		for(int i=0; i<10; i++) {
			int randomIndex = random.nextInt(chars.length());
			tempPassword.append(chars.charAt(randomIndex));
		}
		String tempPasswordString = tempPassword.toString();
		tempPasswordCache.put(key, tempPasswordString);
		return tempPasswordString;

	}

// Fetch temporary password from cache
	public String getTempPassword(String key) {
		try {
			return tempPasswordCache.get(key);

		} catch (Exception e) {

			return null;
		}

	}
	

// Remove temporary password from cache
	public void clearTempPassword(String key) {
		tempPasswordCache.invalidate(key);
	}
}