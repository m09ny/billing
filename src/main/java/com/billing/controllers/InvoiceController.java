package com.billing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.billing.models.Invoice;
import com.billing.repo.InvoiceRepository;
import com.billing.repo.OrdersRepository;

@Controller

public class InvoiceController {

	@Autowired
	private InvoiceRepository invoiceRepository;

	@Autowired
	private OrdersRepository ordersRepository;

	@GetMapping("/invoice")
	public String invoice(@RequestParam(required = false) String id, Model model) {
		if (null != id && id != "") {
			long idInvoice = Long.parseLong(id);
			System.out.println(id);
			System.out.println(idInvoice);

			model.addAttribute("invoice", invoiceRepository.findInvoiceById(idInvoice));
			model.addAttribute("orders", ordersRepository.findAll());
			// System.out.println(model);
		} else {
			model.addAttribute("invoice", invoiceRepository.findAll());
			model.addAttribute("orders", ordersRepository.findAll());
			// System.out.println(model);
		}
		return "invoice";
	}

	@GetMapping("/addInvoice")
	public String create(Model model) {
		return "addInvoice";
	}
	

	@PostMapping("/save")
	public ResponseEntity<String> save(@RequestBody Invoice invoice) {
		System.out.println(invoice);
		invoiceRepository.save(invoice);
		return new ResponseEntity<String>(invoice.toString(), HttpStatus.OK);
	}

	@GetMapping("/showInvoice/{id}")
	public String showInvoice(@PathVariable long id, Model model) {
		model.addAttribute("invoice", invoiceRepository.findInvoiceById(id));
		return "showInvoice";
	}

	@DeleteMapping("/deleteInvoice")
	public String delete(@RequestParam long id) {
		Invoice Invoice = invoiceRepository.findInvoiceById(id);
		invoiceRepository.delete(Invoice);

		return "redirect:/invoice";
	}

	@PutMapping("/editInvoice/{id}")
	public String editInvoice(@PathVariable long id, Model model) {
		model.addAttribute("invoice", invoiceRepository.findInvoiceById(id));
		return "editInvoice";
	}

	@RequestMapping("/updateInvoice")
	public String update(@RequestParam long id, @RequestParam Double lungime, @RequestParam Double latime,
			@RequestParam Double profilareL1, @RequestParam Double profilareL2, @RequestParam Double profilareLstg,
			@RequestParam Double profilareLdr, @RequestParam Double picuratorL1, @RequestParam Double picuratorL2,
			@RequestParam Double picuratorLstg, @RequestParam Double picuratorLdr, @RequestParam Double nrBuc) {
		Invoice invoice = invoiceRepository.findInvoiceById(id);

		invoice.setLungime(lungime);
		invoice.setLatime(latime);
		invoice.setProfilareL1(profilareL1);
		invoice.setProfilareL2(profilareL2);
		invoice.setProfilareLstg(profilareLstg);
		invoice.setProfilareLdr(profilareLdr);
		invoice.setPicuratorL1(picuratorL1);
		invoice.setPicuratorL2(picuratorL2);
		invoice.setPicuratorLstg(picuratorLstg);
		invoice.setPicuratorLdr(picuratorLdr);
		invoice.setNrBuc(nrBuc);

		double taiereML = (lungime + latime) * nrBuc;
		invoice.setTaiereML(taiereML);

		double profilare = (profilareL1 + profilareL2 + profilareLstg + profilareLdr) * nrBuc;
		invoice.setProfilare(profilare);

		double picurator = (picuratorL1 + picuratorL2 + picuratorLstg + picuratorLdr) * nrBuc;
		invoice.setPicurator(picurator);

		double suprafata = (lungime * latime * nrBuc) / 10000;
		invoice.setSuprafata(suprafata);

		invoiceRepository.save(invoice);

		return "redirect:/showInvoice/" + invoice.getId();
	}

}
