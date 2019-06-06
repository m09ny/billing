package com.billing.model;

import javax.persistence.AttributeOverrides;
import javax.persistence.AttributeOverride;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.Column;

@Embeddable
public class ClientMetadata {

    private String society;

    private String city;

    private String street;

    private String streetNumber;

    private String tel;

    private String cfRo;

    private String rc;

    @Embedded
    @AttributeOverrides(value = {
        @AttributeOverride(name = "first", column = @Column(name = "account_first")),
        @AttributeOverride(name = "second", column = @Column(name = "account_second")),
        @AttributeOverride(name = "third", column = @Column(name = "account_third")),
        @AttributeOverride(name = "fourth", column = @Column(name = "account_fourth")),
        @AttributeOverride(name = "fifth", column = @Column(name = "account_fifth"))
    })
    private Account account;

    private String bank;

    private String owner;

    private String ownerStatus;

    public String getSociety() {
        return society;
    }

    public String getOwnerStatus() {
        return ownerStatus;
    }

    public void setOwnerStatus(String ownerStatus) {
        this.ownerStatus = ownerStatus;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getRc() {
        return rc;
    }

    public void setRc(String rc) {
        this.rc = rc;
    }

    public String getCfRo() {
        return cfRo;
    }

    public void setCfRo(String cfRo) {
        this.cfRo = cfRo;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setSociety(String society) {
        this.society = society;
    }

}