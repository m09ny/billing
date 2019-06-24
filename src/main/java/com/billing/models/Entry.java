package com.billing.models;

public class Entry {

    private Dimension dimension;

    private Profiling profiling;

    private Drainer drainer;

    private double piecesNumber;

    private double profilingSum;

    private double drainerSum;

    private double area;

    public double getArea() {
        return area;
    }

    public Drainer getDrainer() {
        return drainer;
    }

    public void setDrainer(Drainer drainer) {
        this.drainer = drainer;
    }

    public Profiling getProfiling() {
        return profiling;
    }

    public void setProfiling(Profiling profiling) {
        this.profiling = profiling;
    }

    public Dimension getDimension() {
        return dimension;
    }

    public void setDimension(Dimension dimension) {
        this.dimension = dimension;
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
}