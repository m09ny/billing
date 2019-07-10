package com.billing.models;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.PostLoad;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.google.gson.Gson;

@Entity
@Table(name = "orders")
@SequenceGenerator(name = "seq", initialValue = 375, allocationSize = 1)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private long id;

    /*
     * Foreign Key - "material_id" is a column in "orders" table, that reffers to
     * the primary key "id" in the "materials" table
     */
    @OneToOne()
    @JoinColumn(name = "material_id")
    private Material material;

    @Embedded
    private Workmanship workmanship;

    @Embedded
    private ClientMetadata clientMetadata;

    @Lob
    private String entriesJson;

    @Transient
    private List<Entry> entries;

    @Embedded
    private EntriesTotal entriesTotal;

    private String workmanshipFinishType;

    private double workmanshipFinishPrice;

    private double workmanshipFinishTotalPrice;

    private double workmanshipFinishTotalPriceVat;

    private double materialTotalPrice;

    private double prepayment;

    private double totalPriceLeft;

    @Temporal(TemporalType.DATE)
    private Date creationDate;

    @PrePersist
    private void onPrePersist() {
        Gson gson = new Gson();
        this.entriesJson = gson.toJson(this.entries);

        this.creationDate = new Date();
    }

    public double getTotalPriceLeft() {
        return totalPriceLeft;
    }

    public void setTotalPriceLeft(double totalPriceLeft) {
        this.totalPriceLeft = totalPriceLeft;
    }

    public double getPrepayment() {
        return prepayment;
    }

    public void setPrepayment(double prepayment) {
        this.prepayment = prepayment;
    }

    public double getWorkmanshipFinishTotalPriceVat() {
        return workmanshipFinishTotalPriceVat;
    }

    public void setWorkmanshipFinishTotalPriceVat(double workmanshipFinishTotalPriceVat) {
        this.workmanshipFinishTotalPriceVat = workmanshipFinishTotalPriceVat;
    }

    public double getWorkmanshipFinishTotalPrice() {
        return workmanshipFinishTotalPrice;
    }

    public void setWorkmanshipFinishTotalPrice(double workmanshipFinishTotalPrice) {
        this.workmanshipFinishTotalPrice = workmanshipFinishTotalPrice;
    }

    public double getWorkmanshipFinishPrice() {
        return workmanshipFinishPrice;
    }

    public void setWorkmanshipFinishPrice(double workmanshipFinishPrice) {
        this.workmanshipFinishPrice = workmanshipFinishPrice;
    }

    public String getWorkmanshipFinishType() {
        return workmanshipFinishType;
    }

    public void setWorkmanshipFinishType(String workmanshipFinishType) {
        this.workmanshipFinishType = workmanshipFinishType;
    }

    @PostLoad
    private void onPostLoad() {
        Gson gson = new Gson();
        this.entries = Arrays.asList(gson.fromJson(this.entriesJson, Entry[].class));
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public long getId() {
        return id;
    }

    public String getEntriesJson() {
        return entriesJson;
    }

    public void setEntriesJson(String entriesJson) {
        this.entriesJson = entriesJson;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    public double getMaterialTotalPrice() {
        return materialTotalPrice;
    }

    public void setMaterialTotalPrice(double materialTotalPrice) {
        this.materialTotalPrice = materialTotalPrice;
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