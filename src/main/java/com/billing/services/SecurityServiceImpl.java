package com.billing.services;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.stereotype.Service;

@Service
public class SecurityServiceImpl implements SecurityService {

    public byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    public byte[] generateHash(String algorithm, String plainText, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        
        if (plainText == null) {
            throw new NullPointerException("Parameter plainText is null");
        }

        if (salt == null) {
            throw new NullPointerException("Parameter salt is null");
        }

        KeySpec spec = null;
        try {
            spec = new PBEKeySpec(plainText.toCharArray(), salt, 65536, 128);
        } catch(IllegalArgumentException e) {
            throw e;
        }
        
        SecretKeyFactory factory = null;
        try {
            factory = SecretKeyFactory.getInstance(algorithm);
        } catch (NoSuchAlgorithmException e) {
            throw e;
        }

        byte[] hash = null;
        try {
            hash = factory.generateSecret(spec).getEncoded();
        } catch (InvalidKeySpecException e) {
            throw e;
        }

        return hash;
    }

    public String decode(byte[] byteArray) {
        return Base64.getEncoder().encodeToString(byteArray);
    }

    public byte[] encode(String string) {
        return Base64.getDecoder().decode(string);
    }

}