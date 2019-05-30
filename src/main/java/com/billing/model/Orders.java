package com.billing.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "orders")
@Table(name = "orders")
public class Orders implements Serializable {

	private static final long serialVersionUID = 307256843049101201L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "date")
	private Date date; 

	@OneToMany(
	        mappedBy = "orders",
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )	
	@JsonManagedReference  
	private List<Invoice> invoices = new ArrayList<>();
	
	public Orders() {
		super();
	}

	public Orders(long id, Date date, List<Invoice> invoices) {
		super();
		this.id = id;
		this.date = date;
		this.invoices = invoices;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public List<Invoice> getInvoices() {
		return invoices;
	}

	public void setInvoices(List<Invoice> invoices) {
		this.invoices = invoices;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", date=" + date + ", invoices=" + invoices + "]";
	}

}
