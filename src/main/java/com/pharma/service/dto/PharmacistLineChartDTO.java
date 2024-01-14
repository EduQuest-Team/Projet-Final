package com.pharma.service.dto;

import java.util.List;

public class PharmacistLineChartDTO {

    private String label;
    private List<Double> data;

    public PharmacistLineChartDTO(String label, List<Double> data) {
        this.label = label;
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Double> getData() {
        return data;
    }

    public void setData(List<Double> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "PharmacistLineChartDTO [label=" + label + ", data=" + data + "]";
    }
}
