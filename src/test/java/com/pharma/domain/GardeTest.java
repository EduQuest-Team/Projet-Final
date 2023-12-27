package com.pharma.domain;

import static com.pharma.domain.GardeTestSamples.*;
import static com.pharma.domain.PharmacieGardeTestSamples.*;
import static com.pharma.domain.PharmacieTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class GardeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Garde.class);
        Garde garde1 = getGardeSample1();
        Garde garde2 = new Garde();
        assertThat(garde1).isNotEqualTo(garde2);

        garde2.setId(garde1.getId());
        assertThat(garde1).isEqualTo(garde2);

        garde2 = getGardeSample2();
        assertThat(garde1).isNotEqualTo(garde2);
    }

    @Test
    void pharmacieTest() throws Exception {
        Garde garde = getGardeRandomSampleGenerator();
        Pharmacie pharmacieBack = getPharmacieRandomSampleGenerator();

        garde.addPharmacie(pharmacieBack);
        assertThat(garde.getPharmacies()).containsOnly(pharmacieBack);
        assertThat(pharmacieBack.getGardes()).containsOnly(garde);

        garde.removePharmacie(pharmacieBack);
        assertThat(garde.getPharmacies()).doesNotContain(pharmacieBack);
        assertThat(pharmacieBack.getGardes()).doesNotContain(garde);

        garde.pharmacies(new HashSet<>(Set.of(pharmacieBack)));
        assertThat(garde.getPharmacies()).containsOnly(pharmacieBack);
        assertThat(pharmacieBack.getGardes()).containsOnly(garde);

        garde.setPharmacies(new HashSet<>());
        assertThat(garde.getPharmacies()).doesNotContain(pharmacieBack);
        assertThat(pharmacieBack.getGardes()).doesNotContain(garde);
    }

    @Test
    void pharmaciegardeTest() throws Exception {
        Garde garde = getGardeRandomSampleGenerator();
        PharmacieGarde pharmacieGardeBack = getPharmacieGardeRandomSampleGenerator();

        garde.addPharmaciegarde(pharmacieGardeBack);
        assertThat(garde.getPharmaciegardes()).containsOnly(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getGardes()).containsOnly(garde);

        garde.removePharmaciegarde(pharmacieGardeBack);
        assertThat(garde.getPharmaciegardes()).doesNotContain(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getGardes()).doesNotContain(garde);

        garde.pharmaciegardes(new HashSet<>(Set.of(pharmacieGardeBack)));
        assertThat(garde.getPharmaciegardes()).containsOnly(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getGardes()).containsOnly(garde);

        garde.setPharmaciegardes(new HashSet<>());
        assertThat(garde.getPharmaciegardes()).doesNotContain(pharmacieGardeBack);
        assertThat(pharmacieGardeBack.getGardes()).doesNotContain(garde);
    }
}
