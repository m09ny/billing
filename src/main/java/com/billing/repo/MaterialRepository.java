package com.billing.repo;

import org.springframework.data.repository.CrudRepository;

import com.billing.model.Material;

public interface MaterialRepository extends CrudRepository<Material, Long> {
    
}