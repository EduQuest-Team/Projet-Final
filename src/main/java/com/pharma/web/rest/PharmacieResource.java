package com.pharma.web.rest;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Ville;
import com.pharma.domain.Zone;
import com.pharma.repository.PharmacieRepository;
import com.pharma.security.AuthoritiesConstants;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pharma.domain.Pharmacie}.
 */
@RestController
@RequestMapping("/api/pharmacies")
@Transactional
public class PharmacieResource {

    private final Logger log = LoggerFactory.getLogger(PharmacieResource.class);

    private static final String ENTITY_NAME = "pharmacie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PharmacieRepository pharmacieRepository;

    public PharmacieResource(PharmacieRepository pharmacieRepository) {
        this.pharmacieRepository = pharmacieRepository;
    }

    /**
     * {@code POST  /pharmacies} : Create a new pharmacie.
     *
     * @param pharmacie the pharmacie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new pharmacie, or with status {@code 400 (Bad Request)} if
     *         the pharmacie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Pharmacie> createPharmacie(@RequestBody Pharmacie pharmacie) throws URISyntaxException {
        log.debug("REST request to save Pharmacie : {}", pharmacie);
        if (pharmacie.getId() != null) {
            throw new BadRequestAlertException("A new pharmacie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pharmacie result = pharmacieRepository.save(pharmacie);
        return ResponseEntity
            .created(new URI("/api/pharmacies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pharmacies/:id} : Updates an existing pharmacie.
     *
     * @param id        the id of the pharmacie to save.
     * @param pharmacie the pharmacie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated pharmacie,
     *         or with status {@code 400 (Bad Request)} if the pharmacie is not
     *         valid,
     *         or with status {@code 500 (Internal Server Error)} if the pharmacie
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pharmacie> updatePharmacie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Pharmacie pharmacie
    ) throws URISyntaxException {
        log.debug("REST request to update Pharmacie : {}, {}", id, pharmacie);
        if (pharmacie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pharmacie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pharmacieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Pharmacie result = pharmacieRepository.save(pharmacie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pharmacie.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pharmacies/:id} : Partial updates given fields of an existing
     * pharmacie, field will ignore if it is null
     *
     * @param id        the id of the pharmacie to save.
     * @param pharmacie the pharmacie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated pharmacie,
     *         or with status {@code 400 (Bad Request)} if the pharmacie is not
     *         valid,
     *         or with status {@code 404 (Not Found)} if the pharmacie is not found,
     *         or with status {@code 500 (Internal Server Error)} if the pharmacie
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pharmacie> partialUpdatePharmacie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Pharmacie pharmacie
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pharmacie partially : {}, {}", id, pharmacie);
        if (pharmacie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pharmacie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pharmacieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pharmacie> result = pharmacieRepository
            .findById(pharmacie.getId())
            .map(existingPharmacie -> {
                if (pharmacie.getNom() != null) {
                    existingPharmacie.setNom(pharmacie.getNom());
                }
                if (pharmacie.getAdresse() != null) {
                    existingPharmacie.setAdresse(pharmacie.getAdresse());
                }
                if (pharmacie.getImage() != null) {
                    existingPharmacie.setImage(pharmacie.getImage());
                }
                if (pharmacie.getLatitude() != null) {
                    existingPharmacie.setLatitude(pharmacie.getLatitude());
                }
                if (pharmacie.getLongitude() != null) {
                    existingPharmacie.setLongitude(pharmacie.getLongitude());
                }
                if (pharmacie.getStatus() != null) {
                    existingPharmacie.setStatus(pharmacie.getStatus());
                }

                return existingPharmacie;
            })
            .map(pharmacieRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pharmacie.getId().toString())
        );
    }

    /**
     * {@code GET  /pharmacies} : get all the pharmacies.
     *
     * @param pageable  the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @param filter    the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of pharmacies in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Pharmacie>> getAllPharmacies(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        if ("pharmacien-is-null".equals(filter)) {
            log.debug("REST request to get all Pharmacies where pharmacien is null");
            return new ResponseEntity<>(
                StreamSupport
                    .stream(pharmacieRepository.findAll().spliterator(), false)
                    .filter(pharmacie -> pharmacie.getPharmacien() == null)
                    .toList(),
                HttpStatus.OK
            );
        }

        if ("position-is-null".equals(filter)) {
            log.debug("REST request to get all Pharmacies where position is null");
            return new ResponseEntity<>(
                StreamSupport
                    .stream(pharmacieRepository.findAll().spliterator(), false)
                    .filter(pharmacie -> pharmacie.getPosition() == null)
                    .toList(),
                HttpStatus.OK
            );
        }
        log.debug("REST request to get a page of Pharmacies");
        Page<Pharmacie> page;
        if (eagerload) {
            page = pharmacieRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = pharmacieRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    // @GetMapping("/{garde}/{zone}/{city}")
    // @PostMapping("/byGardeAndZoneAndVille")
    // public List<Pharmacie> findByGardesAndVille(@RequestParam("villeId") int
    // villeId, @RequestParam("j") boolean j,
    // @RequestParam("n") boolean n)
    // {
    // Ville ville = new Ville();
    // ville.setId(villeId);
    // return pharmacieRepository.getPharmaciesByVilleAndGarde(ville, j ?
    // GardeType.J : GardeType.N,
    // n ? GardeType.N : GardeType.J);
    // }
    @GetMapping("/{garde}/{zone}/{city}")
    public List<Pharmacie> findByVilleAndZone(
        // @PathVariable("garde") Garde gardeId,
        // @PathVariable("zone") Zone zoneId, @PathVariable("city") Ville villeId),
        @PathVariable("garde") Long gardeId,
        @PathVariable("zone") Long zoneId,
        @PathVariable("city") Long villeId
    ) {
        Zone zone = new Zone();
        zone.setId(zoneId);
        Ville ville = new Ville();
        ville.setId(villeId);
        return pharmacieRepository.getPharmaciesByVilleAndZone(
            ville,
            zone
            // , j ? GardeType.J : GardeType.N,
            // n ? GardeType.N : GardeType.J
        );
        // pharmacieRouter.get('/pharmacies/:garde/:zone/:city', async (req, res) => {
        // const garde = req.params.garde;
        // const zone = req.params.zone;
        // const city = req.params.city;

        // try {
        // const pharmacies = await Pharmacie.find({ garde: garde, zone: zone })
        // .populate({
        // path: 'zone',
        // match: { city: city }
        // })
        // .exec();

        // const filteredPharmacies = pharmacies.filter((pharmacy) => {
        // return pharmacy.zone !== null;
        // });

        // res.json(filteredPharmacies);
        // } catch (err) {
        // console.error(err.message);
        // res.status(500).send('Server Error');
        // }
    }

    /**
     * {@code GET  /pharmacies/:id} : get the "id" pharmacie.
     *
     * @param id the id of the pharmacie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the pharmacie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pharmacie> getPharmacie(@PathVariable("id") Long id) {
        log.debug("REST request to get Pharmacie : {}", id);
        Optional<Pharmacie> pharmacie = pharmacieRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(pharmacie);
    }

    /**
     * {@code DELETE  /pharmacies/:id} : delete the "id" pharmacie.
     *
     * @param id the id of the pharmacie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deletePharmacie(@PathVariable("id") Long id) {
        log.debug("REST request to delete Pharmacie : {}", id);
        pharmacieRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
