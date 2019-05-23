package com.billing.repo;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.billing.model.Invoice;

public interface InvoiceRepository extends CrudRepository<Invoice, Long> {
	@Transactional
	long deleteInvoiceById(long id);

	Invoice findInvoiceById(long id);

	Set<Invoice> findAll();

}