package com.billing.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Formula;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /*
     * Foreign Key - "material_id" is a column in "orders" table, that reffers to
     * the primary key "id" in the "materials" table
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "material_id")
    private Material material;

    @Embedded
    private Workmanship workmanship;

    @Embedded
    private ClientMetadata clientMetadata;

    @ElementCollection
    private Set<Entry> entries;

    @Embedded
    private EntriesTotal entriesTotal;

    private double semibastonTotalPrice;

    private double semibastonTotalPriceVat;

    private double bizotTotalPrice;

    private double bizotTotalPriceVat;

    @Formula("material.priceVat * entriesTotal.totalArea")
    private double materialTotalPrice;

    private double totalPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    public long getId() {
        return id;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public double getMaterialTotalPrice() {
        return materialTotalPrice;
    }

    public void setMaterialTotalPrice(double materialTotalPrice) {
        this.materialTotalPrice = materialTotalPrice;
    }

    public double getBizotTotalPriceVat() {
        return bizotTotalPriceVat;
    }

    public void setBizotTotalPriceVat(double bizotTotalPriceVat) {
        this.bizotTotalPriceVat = bizotTotalPriceVat;
    }

    public double getBizotTotalPrice() {
        return bizotTotalPrice;
    }

    public void setBizotTotalPrice(double bizotTotalPrice) {
        this.bizotTotalPrice = bizotTotalPrice;
    }

    public double getSemibastonTotalPriceVat() {
        return semibastonTotalPriceVat;
    }

    public void setSemibastonTotalPriceVat(double semibastonTotalPriceVat) {
        this.semibastonTotalPriceVat = semibastonTotalPriceVat;
    }

    public double getSemibastonTotalPrice() {
        return semibastonTotalPrice;
    }

    public void setSemibastonTotalPrice(double semibastonTotalPrice) {
        this.semibastonTotalPrice = semibastonTotalPrice;
    }

    public Workmanship getWorkmanship() {
        return workmanship;
    }

    public void setWorkmanship(Workmanship workmanship) {
        this.workmanship = workmanship;
    }

    public EntriesTotal getEntriesTotal() {
        return entriesTotal;
    }

    public void setEntriesTotal(EntriesTotal entriesTotal) {
        this.entriesTotal = entriesTotal;
    }

    public ClientMetadata getClientMetadata() {
        return clientMetadata;
    }

    public void setClientMetadata(ClientMetadata clientMetadata) {
        this.clientMetadata = clientMetadata;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public void setId(long id) {
		this.id = id;
	}
}