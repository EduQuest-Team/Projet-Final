package com.pharma.web.rest;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Pharmacien;
import com.pharma.repository.PharmacieRepository;
import com.pharma.repository.PharmacienRepository;
import com.pharma.repository.VilleRepository;
import com.pharma.repository.ZoneRepository;
import com.pharma.service.dto.CountStatsDTO;
import com.pharma.service.dto.PharmacistLineChartDTO;
import com.pharma.service.dto.PharmacyLineChartDTO;
import com.pharma.service.dto.ZoneVilleCountDTO;
import com.pharma.web.rest.errors.BadRequestAlertException;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private final PharmacienRepository pharmacienRepository;

    public StatsResource(
        VilleRepository villeRepository,
        ZoneRepository zoneRepository,
        PharmacieRepository pharmacieRepository,
        PharmacienRepository pharmacienRepository
    ) {
        this.villeRepository = villeRepository;
        this.zoneRepository = zoneRepository;
        this.pharmacieRepository = pharmacieRepository;
        this.pharmacienRepository = pharmacienRepository;
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

    @GetMapping("/pharmacies/{id}")
    public PharmacyLineChartDTO getPharmacistsNote(@PathVariable(name = "id") Long id) {
        var pharmacist = pharmacienRepository.findOneWithEagerRelationships(id).orElse(null);
        if (pharmacist == null) {
            throw new BadRequestAlertException("Pharmacist not found", ENTITY_NAME, "idnotfound");
        }
        var pharmacie = pharmacieRepository.findByPharmacienId(id);
        var pharmacien = pharmacienRepository.findById(id);

        //        var pharmacies = pharmacieRepository.findAll();
        //        var pharmacien = pharmacies.stream().map(s -> s.getPharmacien());

        //        var pharmacy = pharmacie.stream().map(s -> s.getPharmacien());
        var pharmacy = pharmacien.stream().map(Pharmacien::getPharmacie);

        //        var labels = pharmacien.map(p -> p.getNom()).collect(Collectors.toList());
        var labels = pharmacy.map(Pharmacie::getNom).collect(Collectors.toList());
        var datasets = new PharmacistLineChartDTO(
            pharmacist.getUser().getFirstName() + " " + pharmacist.getUser().getLastName(),
            //            pharmacie.stream().map(s -> s.getLatitude()).collect(Collectors.toList())
            //            pharmacies.stream().map(Pharmacie::getLatitude).collect(Collectors.toList())
            pharmacie.stream().map(Pharmacie::getLatitude).collect(Collectors.toList())
        );
        return new PharmacyLineChartDTO(labels, List.of(datasets));
    }
}
