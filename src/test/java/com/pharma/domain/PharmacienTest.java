package com.pharma.domain;

// import static com.pharma.domain.HistoriqueTestSamples.*;
import static com.pharma.domain.PharmacieTestSamples.*;
import static com.pharma.domain.PharmacienTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PharmacienTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pharmacien.class);
        Pharmacien pharmacien1 = getPharmacienSample1();
        Pharmacien pharmacien2 = new Pharmacien();
        assertThat(pharmacien1).isNotEqualTo(pharmacien2);

        pharmacien2.setId(pharmacien1.getId());
        assertThat(pharmacien1).isEqualTo(pharmacien2);

        pharmacien2 = getPharmacienSample2();
        assertThat(pharmacien1).isNotEqualTo(pharmacien2);
    }

    @Test
    void pharmacieTest() throws Exception {
        Pharmacien pharmacien = getPharmacienRandomSampleGenerator();
        Pharmacie pharmacieBack = getPharmacieRandomSampleGenerator();

        pharmacien.setPharmacie(pharmacieBack);
        assertThat(pharmacien.getPharmacie()).isEqualTo(pharmacieBack);

        pharmacien.pharmacie(null);
        assertThat(pharmacien.getPharmacie()).isNull();
    }
    // @Test
    // void historiqueTest() throws Exception {
    //     Pharmacien pharmacien = getPharmacienRandomSampleGenerator();
    //     Historique historiqueBack = getHistoriqueRandomSampleGenerator();

    //     pharmacien.setHistorique(historiqueBack);
    //     assertThat(pharmacien.getHistorique()).isEqualTo(historiqueBack);
    //     assertThat(historiqueBack.getPharmacien()).isEqualTo(pharmacien);

    //     pharmacien.historique(null);
    //     assertThat(pharmacien.getHistorique()).isNull();
    //     assertThat(historiqueBack.getPharmacien()).isNull();
    // }
}
