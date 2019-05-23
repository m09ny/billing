package com.billing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billing.model.Customer;
import com.billing.repo.CustomerRepository;

@RestController
public class CustomerController {

	@Autowired
	CustomerRepository customerRepo;

	@RequestMapping("/save")
	public String saveCustomer() {
		customerRepo.save(new Customer("Jack", "Smith"));
		customerRepo.save(new Customer("Adam", "Johnson"));
		customerRepo.save(new Customer("Kim", "Smith"));
		customerRepo.save(new Customer("David", "Williams"));
		customerRepo.save(new Customer("Peter", "Davis"));
		return "Done";
	}

	@RequestMapping("/findall")
	public String findAll() {
		String result = "<html>";

		for (Customer cust : customerRepo.findAll()) {
			result += "<div>" + cust.toString() + "</div>";
		}

		return result + "</html>";
	}

	@RequestMapping("/findbyid")
	public String findById(@RequestParam("id") long id) {
		String result = "";
		result = customerRepo.findById(id).toString();
		return result;
	}

	@RequestMapping("/findbylastname")
	public String fetchDataByLastName(@RequestParam("lastName") String lastName) {
		String result = "<html>";

		for (Customer cust : customerRepo.findByLastName(lastName)) {
			result += "<div>" + cust.toString() + "</div>";
		}

		return result + "</html>";
	}
}
