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

    private String type;

    private double thickness;

    private String surface;

    private String finish;

    private double price;

    private double priceVat;

    public long getId() {
		return id;
	}

    public String getType() {
        return type;
    }

    public double getPriceVat() {
        return priceVat;
    }

    public void setPriceVat(double priceVat) {
        this.priceVat = priceVat;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getFinish() {
        return finish;
    }

    public void setFinish(String finish) {
        this.finish = finish;
    }

    public String getSurface() {
        return surface;
    }

    public void setSurface(String surface) {
        this.surface = surface;
    }

    public double getThickness() {
        return thickness;
    }

    public void setThickness(double thickness) {
        this.thickness = thickness;
    }

    public void setType(String type) {
        this.type = type;
    }
}