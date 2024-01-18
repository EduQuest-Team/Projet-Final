package com.pharma.web.rest;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.hamcrest.Matchers.hasItem;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pharma.IntegrationTest;
// import com.pharma.domain.Pharmacien;
// import com.pharma.repository.PharmacienRepository;
// import jakarta.persistence.EntityManager;
// import java.util.List;
// import java.util.Random;
// import java.util.concurrent.atomic.AtomicLong;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.transaction.annotation.Transactional;

// /**
//  * Integration tests for the {@link PharmacienResource} REST controller.
//  */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PharmacienResourceIT {
    //     private static final String DEFAULT_NOM = "AAAAAAAAAA";
    //     private static final String UPDATED_NOM = "BBBBBBBBBB";

    //     private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    //     private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    //     private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    //     private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    //     private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    //     private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    //     private static final String ENTITY_API_URL = "/api/pharmaciens";
    //     private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    //     private static Random random = new Random();
    //     private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    //     @Autowired
    //     private PharmacienRepository pharmacienRepository;

    //     @Autowired
    //     private EntityManager em;

    //     @Autowired
    //     private MockMvc restPharmacienMockMvc;

    //     private Pharmacien pharmacien;

    //     /**
    //      * Create an entity for this test.
    //      *
    //      * This is a static method, as tests for other entities might also need it,
    //      * if they test an entity which requires the current entity.
    //      */
    //     public static Pharmacien createEntity(EntityManager em) {
    //         Pharmacien pharmacien = new Pharmacien().nom(DEFAULT_NOM).prenom(DEFAULT_PRENOM).email(DEFAULT_EMAIL).password(DEFAULT_PASSWORD);
    //         return pharmacien;
    //     }

    //     /**
    //      * Create an updated entity for this test.
    //      *
    //      * This is a static method, as tests for other entities might also need it,
    //      * if they test an entity which requires the current entity.
    //      */
    //     public static Pharmacien createUpdatedEntity(EntityManager em) {
    //         Pharmacien pharmacien = new Pharmacien().nom(UPDATED_NOM).prenom(UPDATED_PRENOM).email(UPDATED_EMAIL).password(UPDATED_PASSWORD);
    //         return pharmacien;
    //     }

    //     @BeforeEach
    //     public void initTest() {
    //         pharmacien = createEntity(em);
    //     }

    //     @Test
    //     @Transactional
    //     void createPharmacien() throws Exception {
    //         int databaseSizeBeforeCreate = pharmacienRepository.findAll().size();
    //         // Create the Pharmacien
    //         restPharmacienMockMvc
    //             .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacien)))
    //             .andExpect(status().isCreated());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeCreate + 1);
    //         Pharmacien testPharmacien = pharmacienList.get(pharmacienList.size() - 1);
    //         assertThat(testPharmacien.getNom()).isEqualTo(DEFAULT_NOM);
    //         assertThat(testPharmacien.getPrenom()).isEqualTo(DEFAULT_PRENOM);
    //         assertThat(testPharmacien.getEmail()).isEqualTo(DEFAULT_EMAIL);
    //         assertThat(testPharmacien.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    //     }

    //     @Test
    //     @Transactional
    //     void createPharmacienWithExistingId() throws Exception {
    //         // Create the Pharmacien with an existing ID
    //         pharmacien.setId(1L);

    //         int databaseSizeBeforeCreate = pharmacienRepository.findAll().size();

    //         // An entity with an existing ID cannot be created, so this API call must fail
    //         restPharmacienMockMvc
    //             .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacien)))
    //             .andExpect(status().isBadRequest());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeCreate);
    //     }

    //     @Test
    //     @Transactional
    //     void getAllPharmaciens() throws Exception {
    //         // Initialize the database
    //         pharmacienRepository.saveAndFlush(pharmacien);

    //         // Get all the pharmacienList
    //         restPharmacienMockMvc
    //             .perform(get(ENTITY_API_URL + "?sort=id,desc"))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
    //             .andExpect(jsonPath("$.[*].id").value(hasItem(pharmacien.getId().intValue())))
    //             .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
    //             .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
    //             .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
    //             .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    //     }

    //     @Test
    //     @Transactional
    //     void getPharmacien() throws Exception {
    //         // Initialize the database
    //         pharmacienRepository.saveAndFlush(pharmacien);

    //         // Get the pharmacien
    //         restPharmacienMockMvc
    //             .perform(get(ENTITY_API_URL_ID, pharmacien.getId()))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
    //             .andExpect(jsonPath("$.id").value(pharmacien.getId().intValue()))
    //             .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
    //             .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
    //             .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
    //             .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    //     }

    //     @Test
    //     @Transactional
    //     void getNonExistingPharmacien() throws Exception {
    //         // Get the pharmacien
    //         restPharmacienMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    //     }

    //     @Test
    //     @Transactional
    //     void putExistingPharmacien() throws Exception {
    //         // Initialize the database
    //         pharmacienRepository.saveAndFlush(pharmacien);

    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();

    //         // Update the pharmacien
    //         Pharmacien updatedPharmacien = pharmacienRepository.findById(pharmacien.getId()).orElseThrow();
    //         // Disconnect from session so that the updates on updatedPharmacien are not directly saved in db
    //         em.detach(updatedPharmacien);
    //         updatedPharmacien.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).email(UPDATED_EMAIL).password(UPDATED_PASSWORD);

    //         restPharmacienMockMvc
    //             .perform(
    //                 put(ENTITY_API_URL_ID, updatedPharmacien.getId())
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(TestUtil.convertObjectToJsonBytes(updatedPharmacien))
    //             )
    //             .andExpect(status().isOk());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //         Pharmacien testPharmacien = pharmacienList.get(pharmacienList.size() - 1);
    //         assertThat(testPharmacien.getNom()).isEqualTo(UPDATED_NOM);
    //         assertThat(testPharmacien.getPrenom()).isEqualTo(UPDATED_PRENOM);
    //         assertThat(testPharmacien.getEmail()).isEqualTo(UPDATED_EMAIL);
    //         assertThat(testPharmacien.getPassword()).isEqualTo(UPDATED_PASSWORD);
    //     }

    //     @Test
    //     @Transactional
    //     void putNonExistingPharmacien() throws Exception {
    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();
    //         pharmacien.setId(longCount.incrementAndGet());

    //         // If the entity doesn't have an ID, it will throw BadRequestAlertException
    //         restPharmacienMockMvc
    //             .perform(
    //                 put(ENTITY_API_URL_ID, pharmacien.getId())
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(TestUtil.convertObjectToJsonBytes(pharmacien))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void putWithIdMismatchPharmacien() throws Exception {
    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();
    //         pharmacien.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restPharmacienMockMvc
    //             .perform(
    //                 put(ENTITY_API_URL_ID, longCount.incrementAndGet())
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(TestUtil.convertObjectToJsonBytes(pharmacien))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void putWithMissingIdPathParamPharmacien() throws Exception {
    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();
    //         pharmacien.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restPharmacienMockMvc
    //             .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacien)))
    //             .andExpect(status().isMethodNotAllowed());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void partialUpdatePharmacienWithPatch() throws Exception {
    //         // Initialize the database
    //         pharmacienRepository.saveAndFlush(pharmacien);

    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();

    //         // Update the pharmacien using partial update
    //         Pharmacien partialUpdatedPharmacien = new Pharmacien();
    //         partialUpdatedPharmacien.setId(pharmacien.getId());

    //         partialUpdatedPharmacien.prenom(UPDATED_PRENOM).email(UPDATED_EMAIL);

    //         restPharmacienMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, partialUpdatedPharmacien.getId())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPharmacien))
    //             )
    //             .andExpect(status().isOk());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //         Pharmacien testPharmacien = pharmacienList.get(pharmacienList.size() - 1);
    //         assertThat(testPharmacien.getNom()).isEqualTo(DEFAULT_NOM);
    //         assertThat(testPharmacien.getPrenom()).isEqualTo(UPDATED_PRENOM);
    //         assertThat(testPharmacien.getEmail()).isEqualTo(UPDATED_EMAIL);
    //         assertThat(testPharmacien.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    //     }

    //     @Test
    //     @Transactional
    //     void fullUpdatePharmacienWithPatch() throws Exception {
    //         // Initialize the database
    //         pharmacienRepository.saveAndFlush(pharmacien);

    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();

    //         // Update the pharmacien using partial update
    //         Pharmacien partialUpdatedPharmacien = new Pharmacien();
    //         partialUpdatedPharmacien.setId(pharmacien.getId());

    //         partialUpdatedPharmacien.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).email(UPDATED_EMAIL).password(UPDATED_PASSWORD);

    //         restPharmacienMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, partialUpdatedPharmacien.getId())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPharmacien))
    //             )
    //             .andExpect(status().isOk());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //         Pharmacien testPharmacien = pharmacienList.get(pharmacienList.size() - 1);
    //         assertThat(testPharmacien.getNom()).isEqualTo(UPDATED_NOM);
    //         assertThat(testPharmacien.getPrenom()).isEqualTo(UPDATED_PRENOM);
    //         assertThat(testPharmacien.getEmail()).isEqualTo(UPDATED_EMAIL);
    //         assertThat(testPharmacien.getPassword()).isEqualTo(UPDATED_PASSWORD);
    //     }

    //     @Test
    //     @Transactional
    //     void patchNonExistingPharmacien() throws Exception {
    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();
    //         pharmacien.setId(longCount.incrementAndGet());

    //         // If the entity doesn't have an ID, it will throw BadRequestAlertException
    //         restPharmacienMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, pharmacien.getId())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(pharmacien))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void patchWithIdMismatchPharmacien() throws Exception {
    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();
    //         pharmacien.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restPharmacienMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(pharmacien))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void patchWithMissingIdPathParamPharmacien() throws Exception {
    //         int databaseSizeBeforeUpdate = pharmacienRepository.findAll().size();
    //         pharmacien.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restPharmacienMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pharmacien))
    //             )
    //             .andExpect(status().isMethodNotAllowed());

    //         // Validate the Pharmacien in the database
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void deletePharmacien() throws Exception {
    //         // Initialize the database
    //         pharmacienRepository.saveAndFlush(pharmacien);

    //         int databaseSizeBeforeDelete = pharmacienRepository.findAll().size();

    //         // Delete the pharmacien
    //         restPharmacienMockMvc
    //             .perform(delete(ENTITY_API_URL_ID, pharmacien.getId()).accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isNoContent());

    //         // Validate the database contains one less item
    //         List<Pharmacien> pharmacienList = pharmacienRepository.findAll();
    //         assertThat(pharmacienList).hasSize(databaseSizeBeforeDelete - 1);
    //     }
}
