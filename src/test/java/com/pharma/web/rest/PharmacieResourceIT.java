package com.pharma.web.rest;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.hamcrest.Matchers.hasItem;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pharma.IntegrationTest;
// import com.pharma.domain.Pharmacie;
// import com.pharma.repository.PharmacieRepository;
// import jakarta.persistence.EntityManager;
// import java.sql.Blob;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Random;
// import java.util.concurrent.atomic.AtomicLong;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.data.domain.PageImpl;
// import org.springframework.data.domain.Pageable;
// import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.transaction.annotation.Transactional;

// /**
//  * Integration tests for the {@link PharmacieResource} REST controller.
//  */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PharmacieResourceIT {
    // private static final String DEFAULT_NOM = "AAAAAAAAAA";
    // private static final String UPDATED_NOM = "BBBBBBBBBB";

    // private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    // private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    // private static final byte[] DEFAULT_IMAGE = null;
    // private static final byte[] UPDATED_IMAGE = null;

    // private static final Double DEFAULT_LATITUDE = 1D;
    // private static final Double UPDATED_LATITUDE = 2D;

    // private static final Double DEFAULT_LONGITUDE = 1D;
    // private static final Double UPDATED_LONGITUDE = 2D;

    // private static final Boolean DEFAULT_STATUS = false;
    // private static final Boolean UPDATED_STATUS = true;

    // private static final String ENTITY_API_URL = "/api/pharmacies";
    // private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    // private static Random random = new Random();
    // private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 *
    // Integer.MAX_VALUE));

    // @Autowired
    // private PharmacieRepository pharmacieRepository;

    // @Mock
    // private PharmacieRepository pharmacieRepositoryMock;

    // @Autowired
    // private EntityManager em;

    // @Autowired
    // private MockMvc restPharmacieMockMvc;

    // private Pharmacie pharmacie;

    // /**
    // * Create an entity for this test.
    // *
    // * This is a static method, as tests for other entities might also need it,
    // * if they test an entity which requires the current entity.
    // */
    // public static Pharmacie createEntity(EntityManager em) {
    // Pharmacie pharmacie = new Pharmacie()
    // .nom(DEFAULT_NOM)
    // .adresse(DEFAULT_ADRESSE)
    // .image(DEFAULT_IMAGE)
    // .latitude(DEFAULT_LATITUDE)
    // .longitude(DEFAULT_LONGITUDE)
    // .status(DEFAULT_STATUS);
    // return pharmacie;
    // }

    // /**
    // * Create an updated entity for this test.
    // *
    // * This is a static method, as tests for other entities might also need it,
    // * if they test an entity which requires the current entity.
    // */
    // public static Pharmacie createUpdatedEntity(EntityManager em) {
    // Pharmacie pharmacie = new Pharmacie()
    // .nom(UPDATED_NOM)
    // .adresse(UPDATED_ADRESSE)
    // .image(UPDATED_IMAGE)
    // .latitude(UPDATED_LATITUDE)
    // .longitude(UPDATED_LONGITUDE)
    // .status(UPDATED_STATUS);
    // return pharmacie;
    // }

    // @BeforeEach
    // public void initTest() {
    // pharmacie = createEntity(em);
    // }

    // @Test
    // @Transactional
    // void createPharmacie() throws Exception {
    // int databaseSizeBeforeCreate = pharmacieRepository.findAll().size();
    // // Create the Pharmacie
    // restPharmacieMockMvc
    // .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacie)))
    // .andExpect(status().isCreated());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeCreate + 1);
    // Pharmacie testPharmacie = pharmacieList.get(pharmacieList.size() - 1);
    // assertThat(testPharmacie.getNom()).isEqualTo(DEFAULT_NOM);
    // assertThat(testPharmacie.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    // assertThat(testPharmacie.getImage()).isEqualTo(DEFAULT_IMAGE);
    // assertThat(testPharmacie.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
    // assertThat(testPharmacie.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    // assertThat(testPharmacie.getStatus()).isEqualTo(DEFAULT_STATUS);
    // }

    // @Test
    // @Transactional
    // void createPharmacieWithExistingId() throws Exception {
    // // Create the Pharmacie with an existing ID
    // pharmacie.setId(1L);

    // int databaseSizeBeforeCreate = pharmacieRepository.findAll().size();

    // // An entity with an existing ID cannot be created, so this API call must
    // fail
    // restPharmacieMockMvc
    // .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacie)))
    // .andExpect(status().isBadRequest());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeCreate);
    // }

    // @Test
    // @Transactional
    // void getAllPharmacies() throws Exception {
    // // Initialize the database
    // pharmacieRepository.saveAndFlush(pharmacie);

    // // Get all the pharmacieList
    // restPharmacieMockMvc
    // .perform(get(ENTITY_API_URL + "?sort=id,desc"))
    // .andExpect(status().isOk())
    // .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
    // .andExpect(jsonPath("$.[*].id").value(hasItem(pharmacie.getId().intValue())))
    // .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
    // .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
    // .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
    // .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
    // .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
    // .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    // }

    // @SuppressWarnings({ "unchecked" })
    // void getAllPharmaciesWithEagerRelationshipsIsEnabled() throws Exception {
    // when(pharmacieRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new
    // PageImpl(new ArrayList<>()));

    // restPharmacieMockMvc.perform(get(ENTITY_API_URL +
    // "?eagerload=true")).andExpect(status().isOk());

    // verify(pharmacieRepositoryMock,
    // times(1)).findAllWithEagerRelationships(any());
    // }

    // @SuppressWarnings({ "unchecked" })
    // void getAllPharmaciesWithEagerRelationshipsIsNotEnabled() throws Exception {
    // when(pharmacieRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new
    // PageImpl(new ArrayList<>()));

    // restPharmacieMockMvc.perform(get(ENTITY_API_URL +
    // "?eagerload=false")).andExpect(status().isOk());
    // verify(pharmacieRepositoryMock, times(1)).findAll(any(Pageable.class));
    // }

    // @Test
    // @Transactional
    // void getPharmacie() throws Exception {
    // // Initialize the database
    // pharmacieRepository.saveAndFlush(pharmacie);

    // // Get the pharmacie
    // restPharmacieMockMvc
    // .perform(get(ENTITY_API_URL_ID, pharmacie.getId()))
    // .andExpect(status().isOk())
    // .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
    // .andExpect(jsonPath("$.id").value(pharmacie.getId().intValue()))
    // .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
    // .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
    // .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
    // .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
    // .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
    // .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    // }

    // @Test
    // @Transactional
    // void getNonExistingPharmacie() throws Exception {
    // // Get the pharmacie
    // restPharmacieMockMvc.perform(get(ENTITY_API_URL_ID,
    // Long.MAX_VALUE)).andExpect(status().isNotFound());
    // }

    // @Test
    // @Transactional
    // void putExistingPharmacie() throws Exception {
    // // Initialize the database
    // pharmacieRepository.saveAndFlush(pharmacie);

    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();

    // // Update the pharmacie
    // Pharmacie updatedPharmacie =
    // pharmacieRepository.findById(pharmacie.getId()).orElseThrow();
    // // Disconnect from session so that the updates on updatedPharmacie are not
    // directly saved in db
    // em.detach(updatedPharmacie);
    // updatedPharmacie
    // .nom(UPDATED_NOM)
    // .adresse(UPDATED_ADRESSE)
    // .image(UPDATED_IMAGE)
    // .latitude(UPDATED_LATITUDE)
    // .longitude(UPDATED_LONGITUDE)
    // .status(UPDATED_STATUS);

    // restPharmacieMockMvc
    // .perform(
    // put(ENTITY_API_URL_ID, updatedPharmacie.getId())
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(TestUtil.convertObjectToJsonBytes(updatedPharmacie))
    // )
    // .andExpect(status().isOk());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // Pharmacie testPharmacie = pharmacieList.get(pharmacieList.size() - 1);
    // assertThat(testPharmacie.getNom()).isEqualTo(UPDATED_NOM);
    // assertThat(testPharmacie.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    // assertThat(testPharmacie.getImage()).isEqualTo(UPDATED_IMAGE);
    // assertThat(testPharmacie.getLatitude()).isEqualTo(UPDATED_LATITUDE);
    // assertThat(testPharmacie.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    // assertThat(testPharmacie.getStatus()).isEqualTo(UPDATED_STATUS);
    // }

    // @Test
    // @Transactional
    // void putNonExistingPharmacie() throws Exception {
    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();
    // pharmacie.setId(longCount.incrementAndGet());

    // // If the entity doesn't have an ID, it will throw BadRequestAlertException
    // restPharmacieMockMvc
    // .perform(
    // put(ENTITY_API_URL_ID, pharmacie.getId())
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(TestUtil.convertObjectToJsonBytes(pharmacie))
    // )
    // .andExpect(status().isBadRequest());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // }

    // @Test
    // @Transactional
    // void putWithIdMismatchPharmacie() throws Exception {
    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();
    // pharmacie.setId(longCount.incrementAndGet());

    // // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    // restPharmacieMockMvc
    // .perform(
    // put(ENTITY_API_URL_ID, longCount.incrementAndGet())
    // .contentType(MediaType.APPLICATION_JSON)
    // .content(TestUtil.convertObjectToJsonBytes(pharmacie))
    // )
    // .andExpect(status().isBadRequest());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // }

    // @Test
    // @Transactional
    // void putWithMissingIdPathParamPharmacie() throws Exception {
    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();
    // pharmacie.setId(longCount.incrementAndGet());

    // // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    // restPharmacieMockMvc
    // .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pharmacie)))
    // .andExpect(status().isMethodNotAllowed());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // }

    // @Test
    // @Transactional
    // void partialUpdatePharmacieWithPatch() throws Exception {
    // // Initialize the database
    // pharmacieRepository.saveAndFlush(pharmacie);

    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();

    // // Update the pharmacie using partial update
    // Pharmacie partialUpdatedPharmacie = new Pharmacie();
    // partialUpdatedPharmacie.setId(pharmacie.getId());

    // partialUpdatedPharmacie.image(UPDATED_IMAGE).latitude(UPDATED_LATITUDE).longitude(UPDATED_LONGITUDE).status(UPDATED_STATUS);

    // restPharmacieMockMvc
    // .perform(
    // patch(ENTITY_API_URL_ID, partialUpdatedPharmacie.getId())
    // .contentType("application/merge-patch+json")
    // .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPharmacie))
    // )
    // .andExpect(status().isOk());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // Pharmacie testPharmacie = pharmacieList.get(pharmacieList.size() - 1);
    // assertThat(testPharmacie.getNom()).isEqualTo(DEFAULT_NOM);
    // assertThat(testPharmacie.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    // assertThat(testPharmacie.getImage()).isEqualTo(UPDATED_IMAGE);
    // assertThat(testPharmacie.getLatitude()).isEqualTo(UPDATED_LATITUDE);
    // assertThat(testPharmacie.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    // assertThat(testPharmacie.getStatus()).isEqualTo(UPDATED_STATUS);
    // }

    // @Test
    // @Transactional
    // void fullUpdatePharmacieWithPatch() throws Exception {
    // // Initialize the database
    // pharmacieRepository.saveAndFlush(pharmacie);

    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();

    // // Update the pharmacie using partial update
    // Pharmacie partialUpdatedPharmacie = new Pharmacie();
    // partialUpdatedPharmacie.setId(pharmacie.getId());

    // partialUpdatedPharmacie
    // .nom(UPDATED_NOM)
    // .adresse(UPDATED_ADRESSE)
    // .image(UPDATED_IMAGE)
    // .latitude(UPDATED_LATITUDE)
    // .longitude(UPDATED_LONGITUDE)
    // .status(UPDATED_STATUS);

    // restPharmacieMockMvc
    // .perform(
    // patch(ENTITY_API_URL_ID, partialUpdatedPharmacie.getId())
    // .contentType("application/merge-patch+json")
    // .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPharmacie))
    // )
    // .andExpect(status().isOk());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // Pharmacie testPharmacie = pharmacieList.get(pharmacieList.size() - 1);
    // assertThat(testPharmacie.getNom()).isEqualTo(UPDATED_NOM);
    // assertThat(testPharmacie.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    // assertThat(testPharmacie.getImage()).isEqualTo(UPDATED_IMAGE);
    // assertThat(testPharmacie.getLatitude()).isEqualTo(UPDATED_LATITUDE);
    // assertThat(testPharmacie.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    // assertThat(testPharmacie.getStatus()).isEqualTo(UPDATED_STATUS);
    // }

    // @Test
    // @Transactional
    // void patchNonExistingPharmacie() throws Exception {
    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();
    // pharmacie.setId(longCount.incrementAndGet());

    // // If the entity doesn't have an ID, it will throw BadRequestAlertException
    // restPharmacieMockMvc
    // .perform(
    // patch(ENTITY_API_URL_ID, pharmacie.getId())
    // .contentType("application/merge-patch+json")
    // .content(TestUtil.convertObjectToJsonBytes(pharmacie))
    // )
    // .andExpect(status().isBadRequest());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // }

    // @Test
    // @Transactional
    // void patchWithIdMismatchPharmacie() throws Exception {
    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();
    // pharmacie.setId(longCount.incrementAndGet());

    // // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    // restPharmacieMockMvc
    // .perform(
    // patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
    // .contentType("application/merge-patch+json")
    // .content(TestUtil.convertObjectToJsonBytes(pharmacie))
    // )
    // .andExpect(status().isBadRequest());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // }

    // @Test
    // @Transactional
    // void patchWithMissingIdPathParamPharmacie() throws Exception {
    // int databaseSizeBeforeUpdate = pharmacieRepository.findAll().size();
    // pharmacie.setId(longCount.incrementAndGet());

    // // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    // restPharmacieMockMvc
    // .perform(
    // patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pharmacie))
    // )
    // .andExpect(status().isMethodNotAllowed());

    // // Validate the Pharmacie in the database
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeUpdate);
    // }

    // @Test
    // @Transactional
    // void deletePharmacie() throws Exception {
    // // Initialize the database
    // pharmacieRepository.saveAndFlush(pharmacie);

    // int databaseSizeBeforeDelete = pharmacieRepository.findAll().size();

    // // Delete the pharmacie
    // restPharmacieMockMvc
    // .perform(delete(ENTITY_API_URL_ID,
    // pharmacie.getId()).accept(MediaType.APPLICATION_JSON))
    // .andExpect(status().isNoContent());

    // // Validate the database contains one less item
    // List<Pharmacie> pharmacieList = pharmacieRepository.findAll();
    // assertThat(pharmacieList).hasSize(databaseSizeBeforeDelete - 1);
    // }
}
