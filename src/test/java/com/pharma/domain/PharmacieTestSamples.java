package com.pharma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class PharmacieTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Pharmacie getPharmacieSample1() {
        return new Pharmacie().id(1L).nom("nom1").adresse("adresse1").image("image1");
    }

    public static Pharmacie getPharmacieSample2() {
        return new Pharmacie().id(2L).nom("nom2").adresse("adresse2").image("image2");
    }

    public static Pharmacie getPharmacieRandomSampleGenerator() {
        return new Pharmacie()
            .id(longCount.incrementAndGet())
            .nom(UUID.randomUUID().toString())
            .adresse(UUID.randomUUID().toString())
            .image(UUID.randomUUID().toString());
    }
}
