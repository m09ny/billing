package com.billing.repo;

import com.billing.models.WorkmanshipPrice;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkmanshipPriceRepository extends CrudRepository<WorkmanshipPrice, Long> {
 
    Iterable<WorkmanshipPrice> findAllByOrderByIdAsc();

}