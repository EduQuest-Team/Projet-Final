package com.pharma.domain;

import static com.pharma.domain.GardeTestSamples.*;
import static com.pharma.domain.PharmacieGardeTestSamples.*;
import static com.pharma.domain.PharmacieTestSamples.*;
import static com.pharma.domain.PharmacienTestSamples.*;
// import static com.pharma.domain.PositionTestSamples.*;
import static com.pharma.domain.ZoneTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class PharmacieTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pharmacie.class);
        Pharmacie pharmacie1 = getPharmacieSample1();
        Pharmacie pharmacie2 = new Pharmacie();
        assertThat(pharmacie1).isNotEqualTo(pharmacie2);

        pharmacie2.setId(pharmacie1.getId());
        assertThat(pharmacie1).isEqualTo(pharmacie2);

        pharmacie2 = getPharmacieSample2();
        assertThat(pharmacie1).isNotEqualTo(pharmacie2);
    }

    @Test
    void zoneTest() throws Exception {
        Pharmacie pharmacie = getPharmacieRandomSampleGenerator();
        Zone zoneBack = getZoneRandomSampleGenerator();

        pharmacie.setZone(zoneBack);
        assertThat(pharmacie.getZone()).isEqualTo(zoneBack);

        pharmacie.zone(null);
        assertThat(pharmacie.getZone()).isNull();
    }

    @Test
    void gardeTest() throws Exception {
        Pharmacie pharmacie = getPharmacieRandomSampleGenerator();
        Garde gardeBack = getGardeRandomSampleGenerator();

        pharmacie.addGarde(gardeBack);
        assertThat(pharmacie.getGardes()).containsOnly(gardeBack);

        pharmacie.removeGarde(gardeBack);
        assertThat(pharmacie.getGardes()).doesNotContain(gardeBack);

        pharmacie.gardes(new HashSet<>(Set.of(gardeBack)));
        assertThat(pharmacie.getGardes()).containsOnly(gardeBack);

        pharmacie.setGardes(new HashSet<>());
        assertThat(pharmacie.getGardes()).doesNotContain(gardeBack);
    }

    @Test
    void pharmaciegardeTest() throws Exception {
        Pharmacie pharmacie = getPharmacieRandomSampleGenerator();
        PharmacieGarde pharmacieGardeBack = getPharmacieGardeRandomSampleGenerator();

        pharmacie.addPharmaciegarde(pharmacieGardeBack);
        assertThat(pharmacie.getPharmaciegardes()).containsOnly(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getPharmacies()).containsOnly(pharmacie);

        pharmacie.removePharmaciegarde(pharmacieGardeBack);
        assertThat(pharmacie.getPharmaciegardes()).doesNotContain(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getPharmacies()).doesNotContain(pharmacie);

        pharmacie.pharmaciegardes(new HashSet<>(Set.of(pharmacieGardeBack)));
        assertThat(pharmacie.getPharmaciegardes()).containsOnly(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getPharmacies()).containsOnly(pharmacie);

        pharmacie.setPharmaciegardes(new HashSet<>());
        assertThat(pharmacie.getPharmaciegardes()).doesNotContain(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getPharmacies()).doesNotContain(pharmacie);
    }

    @Test
    void pharmacienTest() throws Exception {
        Pharmacie pharmacie = getPharmacieRandomSampleGenerator();
        Pharmacien pharmacienBack = getPharmacienRandomSampleGenerator();

        pharmacie.setPharmacien(pharmacienBack);
        assertThat(pharmacie.getPharmacien()).isEqualTo(pharmacienBack);
        assertThat(pharmacienBack.getPharmacie()).isEqualTo(pharmacie);

        pharmacie.pharmacien(null);
        assertThat(pharmacie.getPharmacien()).isNull();
        assertThat(pharmacienBack.getPharmacie()).isNull();
    }
    // @Test
    // void positionTest() throws Exception {
    //     Pharmacie pharmacie = getPharmacieRandomSampleGenerator();
    //     Position positionBack = getPositionRandomSampleGenerator();

    //     assertThat(positionBack.getPharmacie()).isEqualTo(pharmacie);

    //     assertThat(positionBack.getPharmacie()).isNull();
    // }
}
