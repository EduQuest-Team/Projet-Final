package com.pharma.web.rest;

import com.pharma.repository.PharmacieRepository;
import com.pharma.repository.VilleRepository;
import com.pharma.repository.ZoneRepository;
import com.pharma.service.dto.CountStatsDTO;
import com.pharma.service.dto.ZoneVilleCountDTO;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@Transactional
public class StatsResource {

    private final Logger log = LoggerFactory.getLogger(ZoneResource.class);

    private static final String ENTITY_NAME = "stats";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VilleRepository villeRepository;
    private final ZoneRepository zoneRepository;
    private final PharmacieRepository pharmacieRepository;

    public StatsResource(VilleRepository villeRepository, ZoneRepository zoneRepository, PharmacieRepository pharmacieRepository) {
        this.villeRepository = villeRepository;
        this.zoneRepository = zoneRepository;
        this.pharmacieRepository = pharmacieRepository;
    }

    @GetMapping("")
    public CountStatsDTO getCountStats() {
        return new CountStatsDTO(villeRepository.count(), zoneRepository.count(), pharmacieRepository.count());
    }

    @GetMapping("/zones-per-ville")
    public List<ZoneVilleCountDTO> getZoneCountPerVille() {
        List<Object[]> result = villeRepository.countZonePerVille();
        return result.stream().map(objarr -> new ZoneVilleCountDTO((String) objarr[0], (Long) objarr[1])).collect(Collectors.toList());
    }
}
