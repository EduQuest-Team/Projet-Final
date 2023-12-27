package com.pharma.web.rest;

import com.pharma.domain.PharmacieGarde;
import com.pharma.repository.PharmacieGardeRepository;
import com.pharma.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pharma.domain.PharmacieGarde}.
 */
@RestController
@RequestMapping("/api/pharmacie-gardes")
@Transactional
public class PharmacieGardeResource {

    private final Logger log = LoggerFactory.getLogger(PharmacieGardeResource.class);

    private static final String ENTITY_NAME = "pharmacieGarde";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PharmacieGardeRepository pharmacieGardeRepository;

    public PharmacieGardeResource(PharmacieGardeRepository pharmacieGardeRepository) {
        this.pharmacieGardeRepository = pharmacieGardeRepository;
    }

    /**
     * {@code POST  /pharmacie-gardes} : Create a new pharmacieGarde.
     *
     * @param pharmacieGarde the pharmacieGarde to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pharmacieGarde, or with status {@code 400 (Bad Request)} if the pharmacieGarde has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<PharmacieGarde> createPharmacieGarde(@RequestBody PharmacieGarde pharmacieGarde) throws URISyntaxException {
        log.debug("REST request to save PharmacieGarde : {}", pharmacieGarde);
        if (pharmacieGarde.getId() != null) {
            throw new BadRequestAlertException("A new pharmacieGarde cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PharmacieGarde result = pharmacieGardeRepository.save(pharmacieGarde);
        return ResponseEntity
            .created(new URI("/api/pharmacie-gardes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pharmacie-gardes/:id} : Updates an existing pharmacieGarde.
     *
     * @param id the id of the pharmacieGarde to save.
     * @param pharmacieGarde the pharmacieGarde to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pharmacieGarde,
     * or with status {@code 400 (Bad Request)} if the pharmacieGarde is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pharmacieGarde couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<PharmacieGarde> updatePharmacieGarde(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PharmacieGarde pharmacieGarde
    ) throws URISyntaxException {
        log.debug("REST request to update PharmacieGarde : {}, {}", id, pharmacieGarde);
        if (pharmacieGarde.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pharmacieGarde.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pharmacieGardeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PharmacieGarde result = pharmacieGardeRepository.save(pharmacieGarde);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pharmacieGarde.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pharmacie-gardes/:id} : Partial updates given fields of an existing pharmacieGarde, field will ignore if it is null
     *
     * @param id the id of the pharmacieGarde to save.
     * @param pharmacieGarde the pharmacieGarde to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pharmacieGarde,
     * or with status {@code 400 (Bad Request)} if the pharmacieGarde is not valid,
     * or with status {@code 404 (Not Found)} if the pharmacieGarde is not found,
     * or with status {@code 500 (Internal Server Error)} if the pharmacieGarde couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PharmacieGarde> partialUpdatePharmacieGarde(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PharmacieGarde pharmacieGarde
    ) throws URISyntaxException {
        log.debug("REST request to partial update PharmacieGarde partially : {}, {}", id, pharmacieGarde);
        if (pharmacieGarde.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pharmacieGarde.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pharmacieGardeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PharmacieGarde> result = pharmacieGardeRepository
            .findById(pharmacieGarde.getId())
            .map(existingPharmacieGarde -> {
                if (pharmacieGarde.getDateDebut() != null) {
                    existingPharmacieGarde.setDateDebut(pharmacieGarde.getDateDebut());
                }
                if (pharmacieGarde.getDateFin() != null) {
                    existingPharmacieGarde.setDateFin(pharmacieGarde.getDateFin());
                }

                return existingPharmacieGarde;
            })
            .map(pharmacieGardeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pharmacieGarde.getId().toString())
        );
    }

    /**
     * {@code GET  /pharmacie-gardes} : get all the pharmacieGardes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pharmacieGardes in body.
     */
    @GetMapping("")
    public List<PharmacieGarde> getAllPharmacieGardes(
        @RequestParam(name = "filter", required = false) String filter,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        if ("historique-is-null".equals(filter)) {
            log.debug("REST request to get all PharmacieGardes where historique is null");
            return StreamSupport
                .stream(pharmacieGardeRepository.findAll().spliterator(), false)
                .filter(pharmacieGarde -> pharmacieGarde.getHistorique() == null)
                .toList();
        }
        log.debug("REST request to get all PharmacieGardes");
        if (eagerload) {
            return pharmacieGardeRepository.findAllWithEagerRelationships();
        } else {
            return pharmacieGardeRepository.findAll();
        }
    }

    /**
     * {@code GET  /pharmacie-gardes/:id} : get the "id" pharmacieGarde.
     *
     * @param id the id of the pharmacieGarde to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pharmacieGarde, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PharmacieGarde> getPharmacieGarde(@PathVariable("id") Long id) {
        log.debug("REST request to get PharmacieGarde : {}", id);
        Optional<PharmacieGarde> pharmacieGarde = pharmacieGardeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(pharmacieGarde);
    }

    /**
     * {@code DELETE  /pharmacie-gardes/:id} : delete the "id" pharmacieGarde.
     *
     * @param id the id of the pharmacieGarde to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacieGarde(@PathVariable("id") Long id) {
        log.debug("REST request to delete PharmacieGarde : {}", id);
        pharmacieGardeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
