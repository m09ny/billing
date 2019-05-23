package com.billing.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "invoice")
public class Invoice implements Serializable {

	private static final long serialVersionUID = -1236259550812123354L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "lungime")
	private double lungime;

	@Column(name = "latime")
	private double latime;

	@Column(name = "profilareL1")
	private double profilareL1;

	@Column(name = "profilarel2")
	private double profilarel2;

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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public double getProfilarel2() {
		return profilarel2;
	}

	public void setProfilarel2(double profilarel2) {
		this.profilarel2 = profilarel2;
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

	@Override
	public String toString() {
		return "Invoice [id=" + id + ", lungime=" + lungime + ", latime=" + latime + ", profilareL1=" + profilareL1
				+ ", profilarel2=" + profilarel2 + ", profilareLstg=" + profilareLstg + ", profilareLdr=" + profilareLdr
				+ ", picuratorL1=" + picuratorL1 + ", picuratorL2=" + picuratorL2 + ", picuratorLstg=" + picuratorLstg
				+ ", picuratorLdr=" + picuratorLdr + ", nrBuc=" + nrBuc + ", taiereML=" + taiereML + "]";
	}

}
