package com.billing.controller;

import com.billing.model.Material;
import com.billing.repo.MaterialRepository;

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
@RequestMapping(path = "/api/materials")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;
    
    @GetMapping(path="/")
    public Iterable<Material> getMaterials() {
        return materialRepository.findAll();
    }

    @PostMapping(path="/")
    public ResponseEntity<String> addMaterial(@RequestBody  Material material) {
        materialRepository.save(material);
        return new ResponseEntity<String>("{ \"message\": \"Created material successfully with id: " + material.getId() + "\" }",  HttpStatus.OK);
    }

    @PutMapping(path="/{id}")
    public ResponseEntity<String> updateMaterial(@PathVariable long id, @RequestBody Material material) {
        try {
            if (!materialRepository.existsById(id)) {
                return new ResponseEntity<String>("{ \"message\": \"Id does not exists: " + id + "\" }",  HttpStatus.BAD_REQUEST);
            }
            materialRepository.save(material);
            return new ResponseEntity<String>("{ \"message\": \"Updated material successfully with id: " + id + "\" }",  HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path="/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable long id) {
        try {
            if (!materialRepository.existsById(id)) {
                return new ResponseEntity<String>("{ \"message\": \"Id does not exists: " + id + "\" }",  HttpStatus.BAD_REQUEST);
            }
            materialRepository.deleteById(id);
            return new ResponseEntity<String>("{ \"message\": \"Deleted material successfully with id: " + id + "\" }",  HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}