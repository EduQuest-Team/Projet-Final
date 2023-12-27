package com.pharma.domain;

import static com.pharma.domain.VilleTestSamples.*;
import static com.pharma.domain.ZoneTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.pharma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ZoneTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zone.class);
        Zone zone1 = getZoneSample1();
        Zone zone2 = new Zone();
        assertThat(zone1).isNotEqualTo(zone2);

        zone2.setId(zone1.getId());
        assertThat(zone1).isEqualTo(zone2);

        zone2 = getZoneSample2();
        assertThat(zone1).isNotEqualTo(zone2);
    }

    @Test
    void villeTest() throws Exception {
        Zone zone = getZoneRandomSampleGenerator();
        Ville villeBack = getVilleRandomSampleGenerator();

        zone.setVille(villeBack);
        assertThat(zone.getVille()).isEqualTo(villeBack);

        zone.ville(null);
        assertThat(zone.getVille()).isNull();
    }
}
