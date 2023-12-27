package com.pharma.domain;

import static com.pharma.domain.VilleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VilleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ville.class);
        Ville ville1 = getVilleSample1();
        Ville ville2 = new Ville();
        assertThat(ville1).isNotEqualTo(ville2);

        ville2.setId(ville1.getId());
        assertThat(ville1).isEqualTo(ville2);

        ville2 = getVilleSample2();
        assertThat(ville1).isNotEqualTo(ville2);
    }
}
