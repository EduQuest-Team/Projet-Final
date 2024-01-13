package com.pharma.web.rest;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Pharmacien;
import com.pharma.repository.PharmacieRepository;
import com.pharma.repository.PharmacienRepository;
import com.pharma.security.AuthoritiesConstants;
import com.pharma.service.UserService;
import com.pharma.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pharma.domain.Pharmacien}.
 */
@RestController
@RequestMapping("/api/pharmaciens")
@Transactional
public class PharmacienResource {

    private final Logger log = LoggerFactory.getLogger(PharmacienResource.class);

    private static final String ENTITY_NAME = "pharmacien";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PharmacienRepository pharmacienRepository;
    private final PharmacieRepository pharmacieRepository;

    private final UserService userService;

    public PharmacienResource(PharmacienRepository pharmacienRepository, UserService userService, PharmacieRepository pharmacieRepository) {
        this.pharmacienRepository = pharmacienRepository;
        this.pharmacieRepository = pharmacieRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /pharmaciens} : Create a new pharmacien.
     *
     * @param pharmacien the pharmacien to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pharmacien, or with status {@code 400 (Bad Request)} if the pharmacien has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Pharmacien> createPharmacien(@RequestBody Pharmacien pharmacien) throws URISyntaxException {
        log.debug("REST request to save Pharmacien : {}", pharmacien);
        if (pharmacien.getId() != null) {
            throw new BadRequestAlertException("A new pharmacien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pharmacien result = pharmacienRepository.save(pharmacien);
        return ResponseEntity
            .created(new URI("/api/pharmaciens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pharmaciens/:id} : Updates an existing pharmacien.
     *
     * @param id         the id of the pharmacien to save.
     * @param pharmacien the pharmacien to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pharmacien,
     * or with status {@code 400 (Bad Request)} if the pharmacien is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pharmacien couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pharmacien> updatePharmacien(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Pharmacien pharmacien
    ) throws URISyntaxException {
        log.debug("REST request to update Pharmacien : {}, {}", id, pharmacien);
        if (pharmacien.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pharmacien.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pharmacienRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Pharmacien result = pharmacienRepository.save(pharmacien);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pharmacien.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pharmaciens/:id} : Partial updates given fields of an existing pharmacien, field will ignore if it is null
     *
     * @param id         the id of the pharmacien to save.
     * @param pharmacien the pharmacien to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pharmacien,
     * or with status {@code 400 (Bad Request)} if the pharmacien is not valid,
     * or with status {@code 404 (Not Found)} if the pharmacien is not found,
     * or with status {@code 500 (Internal Server Error)} if the pharmacien couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pharmacien> partialUpdatePharmacien(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Pharmacien pharmacien
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pharmacien partially : {}, {}", id, pharmacien);
        if (pharmacien.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pharmacien.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pharmacienRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pharmacien> result = pharmacienRepository
            .findById(pharmacien.getId())
            .map(existingPharmacien -> {
                if (pharmacien.getNom() != null) {
                    existingPharmacien.setNom(pharmacien.getNom());
                }
                if (pharmacien.getPrenom() != null) {
                    existingPharmacien.setPrenom(pharmacien.getPrenom());
                }
                if (pharmacien.getEmail() != null) {
                    existingPharmacien.setEmail(pharmacien.getEmail());
                }
                if (pharmacien.getPassword() != null) {
                    existingPharmacien.setPassword(pharmacien.getPassword());
                }

                return existingPharmacien;
            })
            .map(pharmacienRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pharmacien.getId().toString())
        );
    }

    /**
     * {@code GET  /pharmaciens} : get all the pharmaciens.
     *
     * @param pageable the pagination information.
     * @param filter   the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pharmaciens in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Pharmacien>> getAllPharmaciens(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter
    ) {
        if ("historique-is-null".equals(filter)) {
            log.debug("REST request to get all Pharmaciens where historique is null");
            return new ResponseEntity<>(
                StreamSupport
                    .stream(pharmacienRepository.findAll().spliterator(), false)
                    .filter(pharmacien -> pharmacien.getHistorique() == null)
                    .toList(),
                HttpStatus.OK
            );
        }
        log.debug("REST request to get a page of Pharmaciens");
        Page<Pharmacien> page = pharmacienRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /pharmaciens/:id} : get the "id" pharmacien.
     *
     * @param id the id of the pharmacien to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pharmacien, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pharmacien> getPharmacien(@PathVariable("id") Long id) {
        log.debug("REST request to get Pharmacien : {}", id);
        Optional<Pharmacien> pharmacien = pharmacienRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pharmacien);
    }

    /**
     * {@code DELETE  /pharmaciens/:id} : delete the "id" pharmacien.
     *
     * @param id the id of the pharmacien to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacien(@PathVariable("id") Long id) {
        log.debug("REST request to delete Pharmacien : {}", id);
        pharmacienRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("pharmacie/{pharmacienId}")
    public Optional<Pharmacie> getPharmacieByPharmacyst(@PathVariable("pharmacienId") Long pharmacienId) {
        //        log.debug("REST request to get Pharmacie : {}", id);
        Pharmacie pharmacie = pharmacienRepository.findByPharmacy(pharmacienId);

        if (pharmacie == null) {
            // Log a message indicating that no results were found
            log.debug("No Pharmacy found for pharmacyst: {}", pharmacienId);
            return Optional.empty(); // or return an empty list if null is not desirable
        }
        return Optional.of(pharmacie);
    }

    //    @GetMapping("pharmacy/{pharmacienId}")
    //    public Pharmacie getPharmacie(@PathVariable("pharmacienId") Long pharmacienId) {
    ////        log.debug("REST request to get Pharmacie : {}", id);
    //        Pharmacie pharmacie = pharmacienRepository.getPharmacieByPharmacien(pharmacienId);
    //
    //        if (pharmacie == null) {
    //            // Log a message indicating that no results were found
    //            log.debug("No Pharmacy found for pharmacyst: {}", pharmacienId);
    //            return null; // or return an empty list if null is not desirable
    //        }
    //        return pharmacie;
    //    }

    @GetMapping("/myPharmaciens/{zoneId}/{villeId}")
    public List<Pharmacien> getPharmaciensByZoneAndVille(@PathVariable("zoneId") Long zoneId, @PathVariable("villeId") Long villeId) {
        List<Pharmacien> pharmaciens = new ArrayList<>();
        List<Pharmacien> pharmacienList = pharmacienRepository.findByZoneAndVille(villeId, zoneId);

        if (pharmacienList.isEmpty()) {
            // Log a message indicating that no results were found
            log.debug("No Pharmacien found for zoneId: {} and villeId: {}", zoneId, villeId);
            return null; // or return an empty list if null is not desirable
        }
        //        List<Pharmacien> pharmacienList = pharmacienRepository.findByZoneAndVille(zoneId, villeId);
        //        if (pharmacienList != null) {
        //        assert PharmacieRepository.findByGroupIdAndAcademicYearId(villeId, zoneId) != null;
        //        for (Pharmacien pharmacien : pharmacienRepository.findByZoneAndVille(villeId, zoneId)) {
        for (Pharmacien pharmacien : pharmacienList) {
            if (pharmacien.getUser() != null) {
                var user = userService.getUserWithAuthoritiesByLogin(pharmacien.getUser().getLogin()).orElse(null);
                //                if (user != null && !user.hasRole(AuthoritiesConstants.PHARMACIEN)) {
                if (user != null) {
                    pharmaciens.add(pharmacien);
                }
            }
        }
        return pharmaciens;
    }

    //    @GetMapping("/my-pharmacie")
    //    public ResponseEntity<Pharmacie> getPharmacieForAuthenticatedPharmacien() {
    //        try {
    //            // Call the service method to get the Pharmacie associated with the authenticated Pharmacien
    //            Pharmacie pharmacie = PharmacieRepository.getPharmacieForAuthenticatedPharmacien();
    //            return ResponseEntity.ok(pharmacie);
    //        } catch (Exception e) {
    //            // Handle other exceptions
    //            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //        }
    //    }
    @GetMapping("/{pharmacienId}/my-pharmacie")
    public ResponseEntity<Pharmacie> getPharmacieForAuthenticatedPharmacien(@PathVariable("pharmacienId") Long pharmacienId) {
        try {
            // Call the service method to get the Pharmacie associated with the authenticated Pharmacien
            Pharmacie pharmacie = pharmacieRepository.getPharmacieForAuthenticatedPharmacien(pharmacienId);
            return ResponseEntity.ok(pharmacie);
        } catch (AccessDeniedException e) {
            // Handle unauthorized access
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            // Handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //    @Override
    //    public Pharmacien save(Pharmacien pharmacien) {
    //        // Assign the role to the user
    //        pharmacien.getUser().addRole("PHARMACIEN");
    //        // Save the user
    //        return super.save(pharmacien);
    //    }

}
