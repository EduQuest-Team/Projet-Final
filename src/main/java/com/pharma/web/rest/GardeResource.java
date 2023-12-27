package com.pharma.web.rest;

import com.pharma.domain.Garde;
import com.pharma.repository.GardeRepository;
import com.pharma.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pharma.domain.Garde}.
 */
@RestController
@RequestMapping("/api/gardes")
@Transactional
public class GardeResource {

    private final Logger log = LoggerFactory.getLogger(GardeResource.class);

    private static final String ENTITY_NAME = "garde";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GardeRepository gardeRepository;

    public GardeResource(GardeRepository gardeRepository) {
        this.gardeRepository = gardeRepository;
    }

    /**
     * {@code POST  /gardes} : Create a new garde.
     *
     * @param garde the garde to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new garde, or with status {@code 400 (Bad Request)} if the garde has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Garde> createGarde(@RequestBody Garde garde) throws URISyntaxException {
        log.debug("REST request to save Garde : {}", garde);
        if (garde.getId() != null) {
            throw new BadRequestAlertException("A new garde cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Garde result = gardeRepository.save(garde);
        return ResponseEntity
            .created(new URI("/api/gardes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gardes/:id} : Updates an existing garde.
     *
     * @param id the id of the garde to save.
     * @param garde the garde to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated garde,
     * or with status {@code 400 (Bad Request)} if the garde is not valid,
     * or with status {@code 500 (Internal Server Error)} if the garde couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Garde> updateGarde(@PathVariable(value = "id", required = false) final Long id, @RequestBody Garde garde)
        throws URISyntaxException {
        log.debug("REST request to update Garde : {}, {}", id, garde);
        if (garde.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, garde.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!gardeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Garde result = gardeRepository.save(garde);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, garde.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /gardes/:id} : Partial updates given fields of an existing garde, field will ignore if it is null
     *
     * @param id the id of the garde to save.
     * @param garde the garde to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated garde,
     * or with status {@code 400 (Bad Request)} if the garde is not valid,
     * or with status {@code 404 (Not Found)} if the garde is not found,
     * or with status {@code 500 (Internal Server Error)} if the garde couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Garde> partialUpdateGarde(@PathVariable(value = "id", required = false) final Long id, @RequestBody Garde garde)
        throws URISyntaxException {
        log.debug("REST request to partial update Garde partially : {}, {}", id, garde);
        if (garde.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, garde.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!gardeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Garde> result = gardeRepository
            .findById(garde.getId())
            .map(existingGarde -> {
                if (garde.getType() != null) {
                    existingGarde.setType(garde.getType());
                }

                return existingGarde;
            })
            .map(gardeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, garde.getId().toString())
        );
    }

    /**
     * {@code GET  /gardes} : get all the gardes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gardes in body.
     */
    @GetMapping("")
    public List<Garde> getAllGardes() {
        log.debug("REST request to get all Gardes");
        return gardeRepository.findAll();
    }

    /**
     * {@code GET  /gardes/:id} : get the "id" garde.
     *
     * @param id the id of the garde to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the garde, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Garde> getGarde(@PathVariable("id") Long id) {
        log.debug("REST request to get Garde : {}", id);
        Optional<Garde> garde = gardeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(garde);
    }

    /**
     * {@code DELETE  /gardes/:id} : delete the "id" garde.
     *
     * @param id the id of the garde to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarde(@PathVariable("id") Long id) {
        log.debug("REST request to delete Garde : {}", id);
        gardeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
