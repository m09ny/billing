package com.billing.repo;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.billing.models.Invoice;
import com.billing.models.Orders;

public interface OrdersRepository  extends CrudRepository<Orders, Long> {
	@Transactional
	long deleteOrdersById(long id);

	Orders findOrdersById(long id);
	Orders findOrdersByDate(Date date);
	
	Set<Orders> findAll();

}
