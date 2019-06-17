package com.billing.controllers;

import com.billing.models.WorkmanshipPrice;
import com.billing.repo.WorkmanshipPriceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/workmanshipPrice")
public class WorkmanshipPriceController {

    @Autowired
    private WorkmanshipPriceRepository workmanshipRepository;

    @GetMapping(path = "/")
    public Iterable<WorkmanshipPrice> getWorkmanshipPrices() {
        return workmanshipRepository.findAll();
    }

    @PostMapping(path = "/")
    public ResponseEntity<String> addWorkmanshipPrice(@RequestBody WorkmanshipPrice workmanshipPrice) {
        workmanshipRepository.save(workmanshipPrice);
        return new ResponseEntity<String>("{ \"message\": \"Created workmanshipPrice successfully with id: " + workmanshipPrice.getId() + "\" }",  HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<String> updateWorkmanshiPrice(@PathVariable long id, @RequestBody WorkmanshipPrice workmanshipPrice) {
        try {
            if (!workmanshipRepository.existsById(id)) {
                return new ResponseEntity<String>("{ \"error\": \"Id does not exists: " + id + "\" }",  HttpStatus.BAD_REQUEST);
            }
            workmanshipRepository.save(workmanshipPrice);
            return new ResponseEntity<String>("{ \"message\": \"Updated workmanshipPrice successfully with id: " + id + "\" }",  HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteWorkmanshipPrice(@PathVariable long id) {
        try {
            if (!workmanshipRepository.existsById(id)) {
                return new ResponseEntity<String>("{ \"error\": \"Id does not exists: " + id + "\" }",  HttpStatus.BAD_REQUEST);
            }
            workmanshipRepository.deleteById(id);
            return new ResponseEntity<String>("{ \"message\": \"Deleted workmanshipPrice successfully with id: " + id + "\" }",  HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>("{ \"error\": \"" + e.getMessage() + "\" }", HttpStatus.BAD_REQUEST);
        }
    }

}