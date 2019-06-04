package com.billing.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.billing.model.Material;

@Repository
public interface MaterialRepository extends CrudRepository<Material, Long> {
    
}