package com.billing.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.billing.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    
    User findByUsername(String username);

}