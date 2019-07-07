package com.billing.models;

import javax.persistence.Embeddable;

@Embeddable
public class EntriesTotal {

    private double totalPiecesNumber;

    private double totalCuttings;

    private double totalProfiling;

    private double totalDraining;

    private double totalArea;

    public double getTotalPiecesNumber() {
        return totalPiecesNumber;
    }

    public double getTotalArea() {
        return totalArea;
    }

    public void setTotalArea(double totalArea) {
        this.totalArea = totalArea;
    }

    public double getTotalDraining() {
        return totalDraining;
    }

    public void setTotalDraining(double totalDraining) {
        this.totalDraining = totalDraining;
    }

    public double getTotalProfiling() {
        return totalProfiling;
    }

    public void setTotalProfiling(double totalProfiling) {
        this.totalProfiling = totalProfiling;
    }

    public double getTotalCuttings() {
        return totalCuttings;
    }

    public void setTotalCuttings(double totalCuttings) {
        this.totalCuttings = totalCuttings;
    }

    public void setTotalPiecesNumber(double totalPiecesNumber) {
        this.totalPiecesNumber = totalPiecesNumber;
    }

}