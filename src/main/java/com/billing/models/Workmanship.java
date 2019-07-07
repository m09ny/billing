package com.billing.models;

import javax.persistence.Embeddable;

@Embeddable
public class Workmanship {

    private int decupajeLavoare;

    private int decupajePeCurb;

    private int gauriCarota;

    private int lipireAdaos;

    private int canalAntiderapant;

    public int getDecupajeLavoare() {
        return decupajeLavoare;
    }

    public int getCanalAntiderapant() {
        return canalAntiderapant;
    }

    public void setCanalAntiderapant(int canalAntiderapant) {
        this.canalAntiderapant = canalAntiderapant;
    }

    public int getLipireAdaos() {
        return lipireAdaos;
    }

    public void setLipireAdaos(int lipireAdaos) {
        this.lipireAdaos = lipireAdaos;
    }

    public int getGauriCarota() {
        return gauriCarota;
    }

    public void setGauriCarota(int gauriCarota) {
        this.gauriCarota = gauriCarota;
    }

    public int getDecupajePeCurb() {
        return decupajePeCurb;
    }

    public void setDecupajePeCurb(int decupajePeCurb) {
        this.decupajePeCurb = decupajePeCurb;
    }

    public void setDecupajeLavoare(int decupajeLavoare) {
        this.decupajeLavoare = decupajeLavoare;
    }

}