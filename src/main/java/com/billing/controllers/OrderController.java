package com.billing.controllers;

import java.util.NoSuchElementException;

import com.billing.models.Order;
import com.billing.repo.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping(path = "/{id}")
    public Order getOrder(@PathVariable long id) {
        try {
            return orderRepository.findById(id).get();
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    @PostMapping(path = "/")
    public ResponseEntity<String> addOrder(@RequestBody Order order) {
        orderRepository.save(order);
        return new ResponseEntity<String>("{ \"message\": \"Created order successfully with id: " + order.getId() + "\" }",  HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable long id) {
        try {
            if (!orderRepository.existsById(id)) {
                return new ResponseEntity<String>("{ \"error\": \"Id does not exists: " + id + "\" }",  HttpStatus.BAD_REQUEST);
            }
            orderRepository.deleteById(id);
            return new ResponseEntity<String>("{ \"message\": \"Deleted order successfully with id: " + id + "\" }",  HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.BAD_REQUEST);
        }
    }

}