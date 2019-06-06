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
import com.billing.utils.Security;

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
    public ResponseEntity<Object> checkUserCredentials(@RequestBody User userCredentials) {

        // find user by username
        User foundUser = userRepository.findByUsername(userCredentials.getUsername());

        // if no such username found
        if (foundUser == null) {
            return new ResponseEntity<Object>(false, HttpStatus.OK);
        }

        // get the plain password from the coming credentials
        String password = userCredentials.getPassword();

        // get the salt from the found user as bytes
        byte[] salt = Security.encode(foundUser.getSalt());
        
        // generate hash
        byte[] hash = null;
        try {
            hash = Security.generateHash("PBKDF2WithHmacSHA1", password, salt);
        } catch (Exception e) {
            return new ResponseEntity<Object>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // get hashed password from found user
        String hashedPassword = foundUser.getPassword();

        // compare hashes as Strings
        if (hashedPassword.equals(Security.decode(hash))) {
            return new ResponseEntity<Object>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(false, HttpStatus.OK);
        }
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        // get user's plain password
        String password = user.getPassword();
        
        // generate a random salt
        byte[] salt = Security.generateSalt();

        // generate hash
        byte[] hash = null;
        try {
            hash = Security.generateHash("PBKDF2WithHmacSHA1", password, salt);
        } catch (Exception e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // set the user's hashed password as String
        user.setPassword(Security.decode(hash));

        // set the salt as String
        user.setSalt(Security.decode(salt));

        // save user
        this.userRepository.save(user);

        return new ResponseEntity<String>("{ \"message\": \"Created user successfully with id: " + user.getId() + "\" }",  HttpStatus.OK);
    }

}