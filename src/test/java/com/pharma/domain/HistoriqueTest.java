package com.pharma.domain;

import static com.pharma.domain.HistoriqueTestSamples.*;
import static com.pharma.domain.PharmacieGardeTestSamples.*;
import static com.pharma.domain.PharmacienTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HistoriqueTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Historique.class);
        Historique historique1 = getHistoriqueSample1();
        Historique historique2 = new Historique();
        assertThat(historique1).isNotEqualTo(historique2);

        historique2.setId(historique1.getId());
        assertThat(historique1).isEqualTo(historique2);

        historique2 = getHistoriqueSample2();
        assertThat(historique1).isNotEqualTo(historique2);
    }

    @Test
    void pharmaciegardeTest() throws Exception {
        Historique historique = getHistoriqueRandomSampleGenerator();
        PharmacieGarde pharmacieGardeBack = getPharmacieGardeRandomSampleGenerator();

        historique.setPharmaciegarde(pharmacieGardeBack);
        assertThat(historique.getPharmaciegarde()).isEqualTo(pharmacieGardeBack);

        historique.pharmaciegarde(null);
        assertThat(historique.getPharmaciegarde()).isNull();
    }

    @Test
    void pharmacienTest() throws Exception {
        Historique historique = getHistoriqueRandomSampleGenerator();
        Pharmacien pharmacienBack = getPharmacienRandomSampleGenerator();

        historique.setPharmacien(pharmacienBack);
        assertThat(historique.getPharmacien()).isEqualTo(pharmacienBack);

        historique.pharmacien(null);
        assertThat(historique.getPharmacien()).isNull();
    }
}
