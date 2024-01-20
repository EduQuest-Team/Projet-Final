package com.pharma.domain;

import static com.pharma.domain.GardeTestSamples.*;
// import static com.pharma.domain.HistoriqueTestSamples.*;
import static com.pharma.domain.PharmacieGardeTestSamples.*;
import static com.pharma.domain.PharmacieTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PharmacieGardeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PharmacieGarde.class);
        PharmacieGarde pharmacieGarde1 = getPharmacieGardeSample1();
        PharmacieGarde pharmacieGarde2 = new PharmacieGarde();
        assertThat(pharmacieGarde1).isNotEqualTo(pharmacieGarde2);

        pharmacieGarde2.setId(pharmacieGarde1.getId());
        assertThat(pharmacieGarde1).isEqualTo(pharmacieGarde2);

        pharmacieGarde2 = getPharmacieGardeSample2();
        assertThat(pharmacieGarde1).isNotEqualTo(pharmacieGarde2);
    }

    @Test
    void pharmacieTest() throws Exception {
        PharmacieGarde pharmacieGarde = getPharmacieGardeRandomSampleGenerator();
        Pharmacie pharmacieBack = getPharmacieRandomSampleGenerator();

        pharmacieGarde.addPharmacie(pharmacieBack);
        assertThat(pharmacieGarde.getPharmacies()).containsOnly(pharmacieBack);

        pharmacieGarde.removePharmacie(pharmacieBack);
        assertThat(pharmacieGarde.getPharmacies()).doesNotContain(pharmacieBack);

        pharmacieGarde.pharmacies(new HashSet<>(Set.of(pharmacieBack)));
        assertThat(pharmacieGarde.getPharmacies()).containsOnly(pharmacieBack);

        pharmacieGarde.setPharmacies(new HashSet<>());
        assertThat(pharmacieGarde.getPharmacies()).doesNotContain(pharmacieBack);
    }

    @Test
    void gardeTest() throws Exception {
        PharmacieGarde pharmacieGarde = getPharmacieGardeRandomSampleGenerator();
        Garde gardeBack = getGardeRandomSampleGenerator();

        pharmacieGarde.addGarde(gardeBack);
        assertThat(pharmacieGarde.getGardes()).containsOnly(gardeBack);

        pharmacieGarde.removeGarde(gardeBack);
        assertThat(pharmacieGarde.getGardes()).doesNotContain(gardeBack);

        pharmacieGarde.gardes(new HashSet<>(Set.of(gardeBack)));
        assertThat(pharmacieGarde.getGardes()).containsOnly(gardeBack);

        pharmacieGarde.setGardes(new HashSet<>());
        assertThat(pharmacieGarde.getGardes()).doesNotContain(gardeBack);
    }
    // @Test
    // void historiqueTest() throws Exception {
    //     PharmacieGarde pharmacieGarde = getPharmacieGardeRandomSampleGenerator();
    //     Historique historiqueBack = getHistoriqueRandomSampleGenerator();

    //     assertThat(historiqueBack.getPharmaciegarde()).isEqualTo(pharmacieGarde);

    //     assertThat(historiqueBack.getPharmaciegarde()).isNull();
    // }
}
