package com.pharma.service.dto;

public class CountStatsDTO {

    private Long villeCount;
    private Long zoneCount;
    private Long pharmacieCount;

    public CountStatsDTO(Long villeCount, Long zoneCount, Long pharmacieCount) {
        this.villeCount = villeCount;
        this.zoneCount = zoneCount;
        this.pharmacieCount = pharmacieCount;
    }

    public Long getVilleCount() {
        return villeCount;
    }

    public void setVilleCount(Long villeCount) {
        this.villeCount = villeCount;
    }

    public Long getZoneCount() {
        return zoneCount;
    }

    public void setZoneCount(Long zoneCount) {
        this.zoneCount = zoneCount;
    }

    public Long getPharmacieCount() {
        return pharmacieCount;
    }

    public void setPharmacieCount(Long pharmacieCount) {
        this.pharmacieCount = pharmacieCount;
    }
}
