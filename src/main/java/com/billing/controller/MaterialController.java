package com.billing.controller;

import com.billing.model.Material;
import com.billing.repo.MaterialRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/materials")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;
    
    @GetMapping(path="/")
    public Iterable<Material> getMaterials()
    {
        return materialRepository.findAll();
    }
}