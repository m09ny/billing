package com.billing.controllers;

import com.billing.models.Order;
import com.billing.repo.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping(path = "/")
    public Iterable<Order> getOrders() {
        return orderRepository.findAll();
    }

    @PostMapping(path = "/")
    public ResponseEntity<String> addOrder(@RequestBody Order order) {
        orderRepository.save(order);
        return new ResponseEntity<String>("{ \"message\": \"Created order successfully with id: " + order.getId() + "\" }",  HttpStatus.OK);
    }

}