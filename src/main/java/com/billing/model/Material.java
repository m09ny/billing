package com.billing.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Table(name = "MaterialsTable")
public class Material implements Serializable {

    private static final long serialVersionUID = -1878723779846659510L;

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

    /* id: long;
    type: string;
    name: string;
    thickness: double;
    surface: string;
    finish: string;
    price: double;
    priceVat: double; */

}