package com.billing.model;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /* 
        Foreign Key - "material_id" is a column in "orders" table,
        that reffers to the primary key "id" in the "materials" table
    */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "material_id")
    private Material material;

    @Embedded
    private ClientMetadata clientMetadata;

    @Embedded
    private EntriesTotal entriesTotal;

    public long getId() {
        return id;
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