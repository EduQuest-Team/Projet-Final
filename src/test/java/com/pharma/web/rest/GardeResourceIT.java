package com.pharma.web.rest;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.hamcrest.Matchers.hasItem;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pharma.IntegrationTest;
// import com.pharma.domain.Garde;
// import com.pharma.repository.GardeRepository;
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
//  * Integration tests for the {@link GardeResource} REST controller.
//  */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GardeResourceIT {
    //     private static final Boolean DEFAULT_TYPE = false;
    //     private static final Boolean UPDATED_TYPE = true;

    //     private static final String ENTITY_API_URL = "/api/gardes";
    //     private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    //     private static Random random = new Random();
    //     private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    //     @Autowired
    //     private GardeRepository gardeRepository;

    //     @Autowired
    //     private EntityManager em;

    //     @Autowired
    //     private MockMvc restGardeMockMvc;

    //     private Garde garde;

    //     /**
    //      * Create an entity for this test.
    //      *
    //      * This is a static method, as tests for other entities might also need it,
    //      * if they test an entity which requires the current entity.
    //      */
    //     public static Garde createEntity(EntityManager em) {
    //         Garde garde = new Garde().type(DEFAULT_TYPE);
    //         return garde;
    //     }

    //     /**
    //      * Create an updated entity for this test.
    //      *
    //      * This is a static method, as tests for other entities might also need it,
    //      * if they test an entity which requires the current entity.
    //      */
    //     public static Garde createUpdatedEntity(EntityManager em) {
    //         Garde garde = new Garde().type(UPDATED_TYPE);
    //         return garde;
    //     }

    //     @BeforeEach
    //     public void initTest() {
    //         garde = createEntity(em);
    //     }

    //     @Test
    //     @Transactional
    //     void createGarde() throws Exception {
    //         int databaseSizeBeforeCreate = gardeRepository.findAll().size();
    //         // Create the Garde
    //         restGardeMockMvc
    //             .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(garde)))
    //             .andExpect(status().isCreated());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeCreate + 1);
    //         Garde testGarde = gardeList.get(gardeList.size() - 1);
    //         assertThat(testGarde.getType()).isEqualTo(DEFAULT_TYPE);
    //     }

    //     @Test
    //     @Transactional
    //     void createGardeWithExistingId() throws Exception {
    //         // Create the Garde with an existing ID
    //         garde.setId(1L);

    //         int databaseSizeBeforeCreate = gardeRepository.findAll().size();

    //         // An entity with an existing ID cannot be created, so this API call must fail
    //         restGardeMockMvc
    //             .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(garde)))
    //             .andExpect(status().isBadRequest());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeCreate);
    //     }

    //     @Test
    //     @Transactional
    //     void getAllGardes() throws Exception {
    //         // Initialize the database
    //         gardeRepository.saveAndFlush(garde);

    //         // Get all the gardeList
    //         restGardeMockMvc
    //             .perform(get(ENTITY_API_URL + "?sort=id,desc"))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
    //             .andExpect(jsonPath("$.[*].id").value(hasItem(garde.getId().intValue())))
    //             .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.booleanValue())));
    //     }

    //     @Test
    //     @Transactional
    //     void getGarde() throws Exception {
    //         // Initialize the database
    //         gardeRepository.saveAndFlush(garde);

    //         // Get the garde
    //         restGardeMockMvc
    //             .perform(get(ENTITY_API_URL_ID, garde.getId()))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
    //             .andExpect(jsonPath("$.id").value(garde.getId().intValue()))
    //             .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.booleanValue()));
    //     }

    //     @Test
    //     @Transactional
    //     void getNonExistingGarde() throws Exception {
    //         // Get the garde
    //         restGardeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    //     }

    //     @Test
    //     @Transactional
    //     void putExistingGarde() throws Exception {
    //         // Initialize the database
    //         gardeRepository.saveAndFlush(garde);

    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();

    //         // Update the garde
    //         Garde updatedGarde = gardeRepository.findById(garde.getId()).orElseThrow();
    //         // Disconnect from session so that the updates on updatedGarde are not directly saved in db
    //         em.detach(updatedGarde);
    //         updatedGarde.type(UPDATED_TYPE);

    //         restGardeMockMvc
    //             .perform(
    //                 put(ENTITY_API_URL_ID, updatedGarde.getId())
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(TestUtil.convertObjectToJsonBytes(updatedGarde))
    //             )
    //             .andExpect(status().isOk());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //         Garde testGarde = gardeList.get(gardeList.size() - 1);
    //         assertThat(testGarde.getType()).isEqualTo(UPDATED_TYPE);
    //     }

    //     @Test
    //     @Transactional
    //     void putNonExistingGarde() throws Exception {
    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();
    //         garde.setId(longCount.incrementAndGet());

    //         // If the entity doesn't have an ID, it will throw BadRequestAlertException
    //         restGardeMockMvc
    //             .perform(
    //                 put(ENTITY_API_URL_ID, garde.getId())
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(TestUtil.convertObjectToJsonBytes(garde))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void putWithIdMismatchGarde() throws Exception {
    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();
    //         garde.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restGardeMockMvc
    //             .perform(
    //                 put(ENTITY_API_URL_ID, longCount.incrementAndGet())
    //                     .contentType(MediaType.APPLICATION_JSON)
    //                     .content(TestUtil.convertObjectToJsonBytes(garde))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void putWithMissingIdPathParamGarde() throws Exception {
    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();
    //         garde.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restGardeMockMvc
    //             .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(garde)))
    //             .andExpect(status().isMethodNotAllowed());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void partialUpdateGardeWithPatch() throws Exception {
    //         // Initialize the database
    //         gardeRepository.saveAndFlush(garde);

    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();

    //         // Update the garde using partial update
    //         Garde partialUpdatedGarde = new Garde();
    //         partialUpdatedGarde.setId(garde.getId());

    //         partialUpdatedGarde.type(UPDATED_TYPE);

    //         restGardeMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, partialUpdatedGarde.getId())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGarde))
    //             )
    //             .andExpect(status().isOk());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //         Garde testGarde = gardeList.get(gardeList.size() - 1);
    //         assertThat(testGarde.getType()).isEqualTo(UPDATED_TYPE);
    //     }

    //     @Test
    //     @Transactional
    //     void fullUpdateGardeWithPatch() throws Exception {
    //         // Initialize the database
    //         gardeRepository.saveAndFlush(garde);

    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();

    //         // Update the garde using partial update
    //         Garde partialUpdatedGarde = new Garde();
    //         partialUpdatedGarde.setId(garde.getId());

    //         partialUpdatedGarde.type(UPDATED_TYPE);

    //         restGardeMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, partialUpdatedGarde.getId())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGarde))
    //             )
    //             .andExpect(status().isOk());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //         Garde testGarde = gardeList.get(gardeList.size() - 1);
    //         assertThat(testGarde.getType()).isEqualTo(UPDATED_TYPE);
    //     }

    //     @Test
    //     @Transactional
    //     void patchNonExistingGarde() throws Exception {
    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();
    //         garde.setId(longCount.incrementAndGet());

    //         // If the entity doesn't have an ID, it will throw BadRequestAlertException
    //         restGardeMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, garde.getId())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(garde))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void patchWithIdMismatchGarde() throws Exception {
    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();
    //         garde.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restGardeMockMvc
    //             .perform(
    //                 patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
    //                     .contentType("application/merge-patch+json")
    //                     .content(TestUtil.convertObjectToJsonBytes(garde))
    //             )
    //             .andExpect(status().isBadRequest());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void patchWithMissingIdPathParamGarde() throws Exception {
    //         int databaseSizeBeforeUpdate = gardeRepository.findAll().size();
    //         garde.setId(longCount.incrementAndGet());

    //         // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    //         restGardeMockMvc
    //             .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(garde)))
    //             .andExpect(status().isMethodNotAllowed());

    //         // Validate the Garde in the database
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeUpdate);
    //     }

    //     @Test
    //     @Transactional
    //     void deleteGarde() throws Exception {
    //         // Initialize the database
    //         gardeRepository.saveAndFlush(garde);

    //         int databaseSizeBeforeDelete = gardeRepository.findAll().size();

    //         // Delete the garde
    //         restGardeMockMvc
    //             .perform(delete(ENTITY_API_URL_ID, garde.getId()).accept(MediaType.APPLICATION_JSON))
    //             .andExpect(status().isNoContent());

    //         // Validate the database contains one less item
    //         List<Garde> gardeList = gardeRepository.findAll();
    //         assertThat(gardeList).hasSize(databaseSizeBeforeDelete - 1);
    //     }
}
