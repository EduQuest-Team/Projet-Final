package com.pharma.web.rest;

import com.pharma.repository.VilleRepository;
import com.pharma.repository.ZoneRepository;
import com.pharma.service.dto.ZoneVilleCountDTO;

public class StatsResource {

    private final VilleRepository villeRepository;
    private final ZoneRepository zoneRepository;

    public StatsResource(VilleRepository villeRepository, ZoneRepository zoneRepository) {
        this.villeRepository = villeRepository;
        this.zoneRepository = zoneRepository;
    }

    @GetMapping("")
    public CountStatsDTO getCountStats() {
        return new CountStatsDTO(villeRepository.count(), zoneRepository.count());
    }

    @GetMapping("/zones-per-ville")
    public List<ZoneVilleCountDTO> getZoneCountPerVille() {
        List<Object[]> result = villeRepository.countZonePerVille();
    }
}
