package com.billing.controller;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import com.billing.model.User;
import com.billing.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/login")
    public ResponseEntity<String> checkUserCredentials(@RequestBody User userCredentials) {

        // findByUsername
        User foundUser = userRepository.findByUsername(userCredentials.getUsername());

        // get the salt from the found user
        String saltAsString = foundUser.getSalt();
        byte[] salt = Base64.getEncoder().encode(saltAsString.getBytes());
        
        // get the password from coming credentials
        String password = userCredentials.getPassword();

        // start hashing the password
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);

        SecretKeyFactory factory = null;
        try {
            factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        } catch (NoSuchAlgorithmException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        byte[] hash = null;
        try {
            hash = factory.generateSecret(spec).getEncoded();
        } catch (InvalidKeySpecException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String hashAsString = new String(Base64.getDecoder().decode(hash));
        
        // compare hashes
        if (userCredentials.getPassword().equals(hashAsString)) {
            return new ResponseEntity<String>("{ \"message\": \"User credentials are valid\" }", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("{ \"message\": \"User credentials are invalid\" }", HttpStatus.OK);
        }
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        // generate salt
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        KeySpec spec = new PBEKeySpec(user.getPassword().toCharArray(), salt, 65536, 128);

        SecretKeyFactory factory = null;
        try {
            factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        } catch (NoSuchAlgorithmException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        byte[] hash = null;
        try {
            hash = factory.generateSecret(spec).getEncoded();
        } catch (InvalidKeySpecException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // set the user's hashed password
        String hashAsString = new String(Base64.getDecoder().decode(hash));
        user.setPassword(hashAsString);

        // set the salt
        String saltAsString = new String(Base64.getDecoder().decode(salt));
        user.setSalt(saltAsString);

        // save user
        this.userRepository.save(user);

        return new ResponseEntity<String>("{ \"message\": \"Created user successfully with id: " + user.getId() + "\" }",  HttpStatus.OK);
    }

}