package com.billing.model;

import javax.persistence.Embeddable;

@Embeddable
public class Account {

    private String first;

    private String second;

    private String third;

    private String fourth;

    private String fifth;

    public String getFirst() {
        return first;
    }

    public String getFifth() {
        return fifth;
    }

    public void setFifth(String fifth) {
        this.fifth = fifth;
    }

    public String getFourth() {
        return fourth;
    }

    public void setFourth(String fourth) {
        this.fourth = fourth;
    }

    public String getThird() {
        return third;
    }

    public void setThird(String third) {
        this.third = third;
    }

    public String getSecond() {
        return second;
    }

    public void setSecond(String second) {
        this.second = second;
    }

    public void setFirst(String first) {
        this.first = first;
    }
}