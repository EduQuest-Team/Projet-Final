package com.pharma.service.dto;

import java.util.List;

public class PharmacyLineChartDTO {

    private List<String> labels;
    private List<PharmacistLineChartDTO> datasets;

    public PharmacyLineChartDTO(List<String> labels, List<PharmacistLineChartDTO> datasets) {
        this.labels = labels;
        this.datasets = datasets;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<PharmacistLineChartDTO> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<PharmacistLineChartDTO> datasets) {
        this.datasets = datasets;
    }

    @Override
    public String toString() {
        return "StudentNoteLineChartDTO [labels=" + labels + ", datasets=" + datasets + "]";
    }
}
