package com.billing.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.billing.models.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

}