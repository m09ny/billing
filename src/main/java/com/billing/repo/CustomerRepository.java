package com.billing.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.billing.model.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long>{
	List<Customer> findByLastName(String lastName);
}
