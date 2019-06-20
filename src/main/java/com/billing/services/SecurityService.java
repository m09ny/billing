package com.billing.services;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public interface SecurityService {

    byte[] generateSalt();

    byte[] generateHash(String algorithm, String plainText, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException;

    String decode(byte[] byteArray);

    byte[] encode(String string);
}
