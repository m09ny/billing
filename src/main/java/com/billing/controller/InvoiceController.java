package com.billing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.billing.model.Invoice;
import com.billing.repo.InvoiceRepository;

@Controller
public class InvoiceController {

	@Autowired
	private InvoiceRepository invoiceRepository;

	@RequestMapping("/invoice")
	public String invoice(@RequestParam(required = false) String id, Model model) {
		if(null != id && id != "") {
			long idInvoice = Long.parseLong(id);
			System.out.println(id);
			System.out.println(idInvoice);
			model.addAttribute("invoice", invoiceRepository.findInvoiceById(idInvoice));
		} else {
			model.addAttribute("invoice", invoiceRepository.findAll());
		}
		return "invoice";
	}

	@RequestMapping("/addInvoice")
	public String create(Model model) {
		return "addInvoice";
	}

	@RequestMapping("/saveInvoice")
	public String save(@RequestParam Double lungime, @RequestParam Double latime, @RequestParam Double profilareL1,
			@RequestParam Double profilarel2, @RequestParam Double profilareLstg, @RequestParam Double profilareLdr,
			@RequestParam Double picuratorL1, @RequestParam Double picuratorL2, @RequestParam Double picuratorLstg,
			@RequestParam Double picuratorLdr, @RequestParam Double nrBuc, @RequestParam Double taiereML) {
		Invoice invoice = new Invoice();
		invoice.setLungime(lungime);
		invoice.setLatime(latime);
		invoice.setProfilareL1(profilareL1);
		invoice.setProfilarel2(profilarel2);
		invoice.setProfilareLstg(profilareLstg);
		invoice.setProfilareLdr(profilareLdr);
		invoice.setPicuratorL1(picuratorL1);
		invoice.setPicuratorL2(picuratorL2);
		invoice.setPicuratorLstg(picuratorLstg);
		invoice.setPicuratorLdr(picuratorLdr);
		invoice.setNrBuc(nrBuc);
		invoice.setTaiereML(taiereML);

		invoiceRepository.save(invoice);

		return "redirect:/showInvoice/" + invoice.getId();
	}

	@RequestMapping("/showInvoice/{id}")
	public String showInvoice(@PathVariable long id, Model model) {
		model.addAttribute("invoice", invoiceRepository.findInvoiceById(id));
		return "showInvoice";
	}

	@RequestMapping("/deleteInvoice")
	public String delete(@RequestParam long id) {
		Invoice Invoice = invoiceRepository.findInvoiceById(id);
		invoiceRepository.delete(Invoice);

		return "redirect:/invoice";
	}

	@RequestMapping("/editInvoice/{id}")
	public String editInvoice(@PathVariable long id, Model model) {
		model.addAttribute("invoice", invoiceRepository.findInvoiceById(id));
		return "editInvoice";
	}

	@RequestMapping("/updateInvoice")
	public String update(@RequestParam long id, @RequestParam Double lungime, @RequestParam Double latime, @RequestParam Double profilareL1, @RequestParam Double profilarel2, @RequestParam Double profilareLstg, @RequestParam Double profilareLdr, @RequestParam Double picuratorL1, @RequestParam Double picuratorL2, @RequestParam Double picuratorLstg, @RequestParam Double picuratorLdr, @RequestParam Double nrBuc, @RequestParam Double taiereML) {
		Invoice invoice = invoiceRepository.findInvoiceById(id);
		
		invoice.setLungime(lungime);
		invoice.setLatime(latime);
		invoice.setProfilareL1(profilareL1);
		invoice.setProfilarel2(profilarel2);
		invoice.setProfilareLstg(profilareLstg);
		invoice.setProfilareLdr(profilareLdr);
		invoice.setPicuratorL1(picuratorL1);
		invoice.setPicuratorL2(picuratorL2);
		invoice.setPicuratorLstg(picuratorLstg);
		invoice.setPicuratorLdr(picuratorLdr);
		invoice.setNrBuc(nrBuc);
		invoice.setTaiereML(taiereML);
		
		invoiceRepository.save(invoice);

		return "redirect:/showInvoice/" + invoice.getId();
	}

}
