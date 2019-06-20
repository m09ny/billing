package com.billing.controllers;

import com.billing.models.User;
import com.billing.models.UserCredentials;
import com.billing.repo.UserRepository;
import com.billing.services.SecurityService;

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

    private final String algorithm = "PBKDF2WithHmacSHA1";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityService securityService;

    @PostMapping(path = "/login")
    public ResponseEntity<Object> checkUserCredentials(@RequestBody UserCredentials credentials) {
        
        // find user by username
        User foundUser = userRepository.findByCredentialsUsername(credentials.getUsername());

        // if no such username found
        if (foundUser == null) {
            return new ResponseEntity<Object>(false, HttpStatus.OK);
        }

        // get the plain password from the coming credentials
        String password = credentials.getPassword();

        // get the salt from the found user as bytes
        byte[] salt = securityService.encode(foundUser.getSalt());
        
        // generate hash
        byte[] hash = null;
        try {
            hash = securityService.generateHash(algorithm, password, salt);
        } catch (Exception e) {
            return new ResponseEntity<Object>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // get hashed password from found user
        String hashedPassword = foundUser.getCredentials().getPassword();

        // compare hashes as Strings
        if (hashedPassword.equals(securityService.decode(hash))) {
            return new ResponseEntity<Object>("{ \"username\": \"" + foundUser.getCredentials().getUsername() + "\", \"isAdmin\": \"" + foundUser.getIsAdmin() + "\" }", HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(false, HttpStatus.OK);
        }
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        // get user's plain password
        String password = user.getCredentials().getPassword();
        
        // generate a random salt
        byte[] salt = securityService.generateSalt();

        // generate hash
        byte[] hash = null;
        try {
            hash = securityService.generateHash(algorithm, password, salt);
        } catch (Exception e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // set the user's hashed password as String
        user.getCredentials().setPassword(securityService.decode(hash));

        // set the salt as String
        user.setSalt(securityService.decode(salt));

        // save user
        this.userRepository.save(user);

        return new ResponseEntity<String>("{ \"message\": \"Created user successfully with id: " + user.getId() + "\" }",  HttpStatus.OK);
    }

}