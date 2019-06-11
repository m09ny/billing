package com.billing.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.billing.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    
    User findByCredentialsUsername(String username);

}