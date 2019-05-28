package com.billing.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.billing.model.Orders;
import com.billing.repo.InvoiceRepository;
import com.billing.repo.OrdersRepository;

@Controller
public class OrderController {

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Autowired
	private OrdersRepository ordersRepository;
	
	@RequestMapping("/orders")
	public String invoice(@RequestParam(required = false) String id, Model model) {
		if(null != id && id != "") {
			long idOrder = Long.parseLong(id);
			System.out.println(id);
			System.out.println(idOrder);
			model.addAttribute("orders", ordersRepository.findOrdersById(idOrder));
			model.addAttribute("invoice", invoiceRepository.findAll());
		} else {
			model.addAttribute("orders", ordersRepository.findAll());
			model.addAttribute("invoice", invoiceRepository.findAll());
		}
		return "orders";
	}

    @GetMapping("/addOrders")
    public String addOrdersForm(@ModelAttribute("orders") Orders orders) {
        return "addOrdersForm";
    }

	@RequestMapping("/showOrder/{id}")
	public String showOrder(@PathVariable long id, Model model) {
		model.addAttribute("order", ordersRepository.findOrdersById(id));
		return "showOrder";
	}
    
}
