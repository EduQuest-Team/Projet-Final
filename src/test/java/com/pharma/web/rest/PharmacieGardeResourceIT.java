package com.pharma.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pharma.IntegrationTest;
import com.pharma.domain.PharmacieGarde;
import com.pharma.repository.PharmacieGardeRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PharmacieGardeResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PharmacieGardeResourceIT {

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/pharmacie-gardes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PharmacieGardeRepository pharmacieGardeRepository;

    @Mock
    private PharmacieGardeRepository pharmacieGardeRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPharmacieGardeMockMvc;

    private PharmacieGarde pharmacieGarde;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PharmacieGarde createEntity(EntityManager em) {
        PharmacieGarde pharmacieGarde = new PharmacieGarde().dateDebut(DEFAULT_DATE_DEBUT).dateFin(DEFAULT_DATE_FIN);
        return pharmacieGarde;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PharmacieGarde createUpdatedEntity(EntityManager em) {
        PharmacieGarde pharmacieGarde = new PharmacieGarde().dateDebut(UPDATED_DATE_DEBUT).dateFin(UPDATED_DATE_FIN);
        return pharmacieGarde;
    }

    @BeforeEach
    public void initTest() {
        pharmacieGarde = createEntity(em);
    }

    @Test
    @Transactional
    void createPharmacieGarde() throws Exception {
        int databaseSizeBeforeCreate = pharmacieGardeRepository.findAll().size();
        // Create the PharmacieGarde
        restPharmacieGardeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isCreated());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeCreate + 1);
        PharmacieGarde testPharmacieGarde = pharmacieGardeList.get(pharmacieGardeList.size() - 1);
        assertThat(testPharmacieGarde.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testPharmacieGarde.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    void createPharmacieGardeWithExistingId() throws Exception {
        // Create the PharmacieGarde with an existing ID
        pharmacieGarde.setId(1L);

        int databaseSizeBeforeCreate = pharmacieGardeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPharmacieGardeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isBadRequest());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPharmacieGardes() throws Exception {
        // Initialize the database
        pharmacieGardeRepository.saveAndFlush(pharmacieGarde);

        // Get all the pharmacieGardeList
        restPharmacieGardeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pharmacieGarde.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPharmacieGardesWithEagerRelationshipsIsEnabled() throws Exception {
        when(pharmacieGardeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPharmacieGardeMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(pharmacieGardeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPharmacieGardesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(pharmacieGardeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPharmacieGardeMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(pharmacieGardeRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getPharmacieGarde() throws Exception {
        // Initialize the database
        pharmacieGardeRepository.saveAndFlush(pharmacieGarde);

        // Get the pharmacieGarde
        restPharmacieGardeMockMvc
            .perform(get(ENTITY_API_URL_ID, pharmacieGarde.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pharmacieGarde.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPharmacieGarde() throws Exception {
        // Get the pharmacieGarde
        restPharmacieGardeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPharmacieGarde() throws Exception {
        // Initialize the database
        pharmacieGardeRepository.saveAndFlush(pharmacieGarde);

        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();

        // Update the pharmacieGarde
        PharmacieGarde updatedPharmacieGarde = pharmacieGardeRepository.findById(pharmacieGarde.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedPharmacieGarde are not directly saved in db
        em.detach(updatedPharmacieGarde);
        updatedPharmacieGarde.dateDebut(UPDATED_DATE_DEBUT).dateFin(UPDATED_DATE_FIN);

        restPharmacieGardeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPharmacieGarde.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPharmacieGarde))
            )
            .andExpect(status().isOk());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
        PharmacieGarde testPharmacieGarde = pharmacieGardeList.get(pharmacieGardeList.size() - 1);
        assertThat(testPharmacieGarde.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPharmacieGarde.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    void putNonExistingPharmacieGarde() throws Exception {
        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();
        pharmacieGarde.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPharmacieGardeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pharmacieGarde.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isBadRequest());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPharmacieGarde() throws Exception {
        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();
        pharmacieGarde.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPharmacieGardeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isBadRequest());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPharmacieGarde() throws Exception {
        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();
        pharmacieGarde.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPharmacieGardeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacieGarde)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePharmacieGardeWithPatch() throws Exception {
        // Initialize the database
        pharmacieGardeRepository.saveAndFlush(pharmacieGarde);

        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();

        // Update the pharmacieGarde using partial update
        PharmacieGarde partialUpdatedPharmacieGarde = new PharmacieGarde();
        partialUpdatedPharmacieGarde.setId(pharmacieGarde.getId());

        partialUpdatedPharmacieGarde.dateDebut(UPDATED_DATE_DEBUT).dateFin(UPDATED_DATE_FIN);

        restPharmacieGardeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPharmacieGarde.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPharmacieGarde))
            )
            .andExpect(status().isOk());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
        PharmacieGarde testPharmacieGarde = pharmacieGardeList.get(pharmacieGardeList.size() - 1);
        assertThat(testPharmacieGarde.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPharmacieGarde.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    void fullUpdatePharmacieGardeWithPatch() throws Exception {
        // Initialize the database
        pharmacieGardeRepository.saveAndFlush(pharmacieGarde);

        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();

        // Update the pharmacieGarde using partial update
        PharmacieGarde partialUpdatedPharmacieGarde = new PharmacieGarde();
        partialUpdatedPharmacieGarde.setId(pharmacieGarde.getId());

        partialUpdatedPharmacieGarde.dateDebut(UPDATED_DATE_DEBUT).dateFin(UPDATED_DATE_FIN);

        restPharmacieGardeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPharmacieGarde.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPharmacieGarde))
            )
            .andExpect(status().isOk());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
        PharmacieGarde testPharmacieGarde = pharmacieGardeList.get(pharmacieGardeList.size() - 1);
        assertThat(testPharmacieGarde.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPharmacieGarde.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    void patchNonExistingPharmacieGarde() throws Exception {
        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();
        pharmacieGarde.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPharmacieGardeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pharmacieGarde.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isBadRequest());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPharmacieGarde() throws Exception {
        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();
        pharmacieGarde.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPharmacieGardeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isBadRequest());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPharmacieGarde() throws Exception {
        int databaseSizeBeforeUpdate = pharmacieGardeRepository.findAll().size();
        pharmacieGarde.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPharmacieGardeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pharmacieGarde))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PharmacieGarde in the database
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePharmacieGarde() throws Exception {
        // Initialize the database
        pharmacieGardeRepository.saveAndFlush(pharmacieGarde);

        int databaseSizeBeforeDelete = pharmacieGardeRepository.findAll().size();

        // Delete the pharmacieGarde
        restPharmacieGardeMockMvc
            .perform(delete(ENTITY_API_URL_ID, pharmacieGarde.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PharmacieGarde> pharmacieGardeList = pharmacieGardeRepository.findAll();
        assertThat(pharmacieGardeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
