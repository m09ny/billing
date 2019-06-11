package com.billing.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name = "invoice")
@Table(name = "invoice")
public class Invoice implements Serializable {

	private static final long serialVersionUID = -1236259550812123354L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	@JoinColumn(name = "orders_id")
	private Orders orders;

	@Column(name = "lungime")
	private double lungime;

	@Column(name = "latime")
	private double latime;

	@Column(name = "profilareL1")
	private double profilareL1;

	@Column(name = "profilareL2")
	private double profilareL2;

	@Column(name = "profilareLstg")
	private double profilareLstg;

	@Column(name = "profilareLdr")
	private double profilareLdr;

	@Column(name = "picuratorL1")
	private double picuratorL1;

	@Column(name = "picuratorL2")
	private double picuratorL2;

	@Column(name = "picuratorLstg")
	private double picuratorLstg;

	@Column(name = "picuratorLdr")
	private double picuratorLdr;

	@Column(name = "nrBuc")
	private double nrBuc;

	@Column(name = "taiereML")
	private double taiereML;

	@Column(name = "profilare")
	private double profilare;

	@Column(name = "picurator")
	private double picurator;

	@Column(name = "suprafata")
	private double suprafata;

	public Invoice() {
		super();
	}

	
	
	public Invoice(double lungime, double latime) {
		super();
		this.lungime = lungime;
		this.latime = latime;
	}



	public Invoice(Orders orders, double lungime, double latime, double profilareL1, double profilareL2,
			double profilareLstg, double profilareLdr, double picuratorL1, double picuratorL2, double picuratorLstg,
			double picuratorLdr, double nrBuc, double taiereML, double profilare, double picurator, double suprafata) {
		super();
		this.orders = orders;
		this.lungime = lungime;
		this.latime = latime;
		this.profilareL1 = profilareL1;
		this.profilareL2 = profilareL2;
		this.profilareLstg = profilareLstg;
		this.profilareLdr = profilareLdr;
		this.picuratorL1 = picuratorL1;
		this.picuratorL2 = picuratorL2;
		this.picuratorLstg = picuratorLstg;
		this.picuratorLdr = picuratorLdr;
		this.nrBuc = nrBuc;
		this.taiereML = taiereML;
		this.profilare = profilare;
		this.picurator = picurator;
		this.suprafata = suprafata;
	}

	public Invoice(long id, Orders orders, double lungime, double latime, double profilareL1, double profilareL2,
			double profilareLstg, double profilareLdr, double picuratorL1, double picuratorL2, double picuratorLstg,
			double picuratorLdr, double nrBuc, double taiereML, double profilare, double picurator, double suprafata) {
		super();
		this.id = id;
		this.orders = orders;
		this.lungime = lungime;
		this.latime = latime;
		this.profilareL1 = profilareL1;
		this.profilareL2 = profilareL2;
		this.profilareLstg = profilareLstg;
		this.profilareLdr = profilareLdr;
		this.picuratorL1 = picuratorL1;
		this.picuratorL2 = picuratorL2;
		this.picuratorLstg = picuratorLstg;
		this.picuratorLdr = picuratorLdr;
		this.nrBuc = nrBuc;
		this.taiereML = taiereML;
		this.profilare = profilare;
		this.picurator = picurator;
		this.suprafata = suprafata;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Orders getOrder() {
		return orders;
	}

	public void setOrder(Orders order) {
		this.orders = order;
	}

	public double getLungime() {
		return lungime;
	}

	public void setLungime(double lungime) {
		this.lungime = lungime;
	}

	public double getLatime() {
		return latime;
	}

	public void setLatime(double latime) {
		this.latime = latime;
	}

	public double getProfilareL1() {
		return profilareL1;
	}

	public void setProfilareL1(double profilareL1) {
		this.profilareL1 = profilareL1;
	}

	public double getProfilareL2() {
		return profilareL2;
	}

	public void setProfilareL2(double profilareL2) {
		this.profilareL2 = profilareL2;
	}

	public double getProfilareLstg() {
		return profilareLstg;
	}

	public void setProfilareLstg(double profilareLstg) {
		this.profilareLstg = profilareLstg;
	}

	public double getProfilareLdr() {
		return profilareLdr;
	}

	public void setProfilareLdr(double profilareLdr) {
		this.profilareLdr = profilareLdr;
	}

	public double getPicuratorL1() {
		return picuratorL1;
	}

	public void setPicuratorL1(double picuratorL1) {
		this.picuratorL1 = picuratorL1;
	}

	public double getPicuratorL2() {
		return picuratorL2;
	}

	public void setPicuratorL2(double picuratorL2) {
		this.picuratorL2 = picuratorL2;
	}

	public double getPicuratorLstg() {
		return picuratorLstg;
	}

	public void setPicuratorLstg(double picuratorLstg) {
		this.picuratorLstg = picuratorLstg;
	}

	public double getPicuratorLdr() {
		return picuratorLdr;
	}

	public void setPicuratorLdr(double picuratorLdr) {
		this.picuratorLdr = picuratorLdr;
	}

	public double getNrBuc() {
		return nrBuc;
	}

	public void setNrBuc(double nrBuc) {
		this.nrBuc = nrBuc;
	}

	public double getTaiereML() {
		return taiereML;
	}

	public void setTaiereML(double taiereML) {
		this.taiereML = taiereML;
	}

	public double getProfilare() {
		return profilare;
	}

	public void setProfilare(double profilare) {
		this.profilare = profilare;
	}

	public double getPicurator() {
		return picurator;
	}

	public void setPicurator(double picurator) {
		this.picurator = picurator;
	}

	public double getSuprafata() {
		return suprafata;
	}

	public void setSuprafata(double suprafata) {
		this.suprafata = suprafata;
	}

	@Override
	public String toString() {
		return "Invoice [id=" + id + ", orders=" + orders + ", lungime=" + lungime + ", latime=" + latime
				+ ", profilareL1=" + profilareL1 + ", profilareL2=" + profilareL2 + ", profilareLstg=" + profilareLstg
				+ ", profilareLdr=" + profilareLdr + ", picuratorL1=" + picuratorL1 + ", picuratorL2=" + picuratorL2
				+ ", picuratorLstg=" + picuratorLstg + ", picuratorLdr=" + picuratorLdr + ", nrBuc=" + nrBuc
				+ ", taiereML=" + taiereML + ", profilare=" + profilare + ", picurator=" + picurator + ", suprafata="
				+ suprafata + "]";
	}

}
