package com.billing.models;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PostLoad;

@Entity
@Table(name = "materials")
public class Material {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;

    private String name;

    private double thickness;

    private String surface;

    private String finish;

    private double price;

    private double priceVat;

    @Transient
    private String fullName;

    @PostLoad
    private void postLoad() {
        this.fullName = this.type + " " + this.name + " " + this.thickness + "cm " + this.surface + " " + this.finish;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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