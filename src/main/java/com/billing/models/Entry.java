package com.billing.models;

import javax.persistence.Embeddable;

@Embeddable
public class Entry {

    private double length;

    private double width;

    private double profilingL1;

    private double profilingL2;

    private double profilingIstg;

    private double profilingIdr;

    private double drainerL1;

    private double drainerL2;

    private double drainerIstg;

    private double drainerIdr;

    private double piecesNumber;

    private double profilingSum;

    private double drainerSum;

    private double area;

    public double getLength() {
        return length;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public double getDrainerSum() {
        return drainerSum;
    }

    public void setDrainerSum(double drainerSum) {
        this.drainerSum = drainerSum;
    }

    public double getProfilingSum() {
        return profilingSum;
    }

    public void setProfilingSum(double profilingSum) {
        this.profilingSum = profilingSum;
    }

    public double getPiecesNumber() {
        return piecesNumber;
    }

    public void setPiecesNumber(double piecesNumber) {
        this.piecesNumber = piecesNumber;
    }

    public double getDrainerIdr() {
        return drainerIdr;
    }

    public void setDrainerIdr(double drainerIdr) {
        this.drainerIdr = drainerIdr;
    }

    public double getDrainerIstg() {
        return drainerIstg;
    }

    public void setDrainerIstg(double drainerIstg) {
        this.drainerIstg = drainerIstg;
    }

    public double getDrainerL2() {
        return drainerL2;
    }

    public void setDrainerL2(double drainerL2) {
        this.drainerL2 = drainerL2;
    }

    public double getDrainerL1() {
        return drainerL1;
    }

    public void setDrainerL1(double drainerL1) {
        this.drainerL1 = drainerL1;
    }

    public double getProfilingIdr() {
        return profilingIdr;
    }

    public void setProfilingIdr(double profilingIdr) {
        this.profilingIdr = profilingIdr;
    }

    public double getProfilingIstg() {
        return profilingIstg;
    }

    public void setProfilingIstg(double profilingIstg) {
        this.profilingIstg = profilingIstg;
    }

    public double getProfilingL2() {
        return profilingL2;
    }

    public void setProfilingL2(double profilingL2) {
        this.profilingL2 = profilingL2;
    }

    public double getProfilingL1() {
        return profilingL1;
    }

    public void setProfilingL1(double profilingL1) {
        this.profilingL1 = profilingL1;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public void setLength(double length) {
        this.length = length;
    }
}