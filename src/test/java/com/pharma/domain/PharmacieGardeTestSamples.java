package com.pharma.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class PharmacieGardeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static PharmacieGarde getPharmacieGardeSample1() {
        return new PharmacieGarde().id(1L);
    }

    public static PharmacieGarde getPharmacieGardeSample2() {
        return new PharmacieGarde().id(2L);
    }

    public static PharmacieGarde getPharmacieGardeRandomSampleGenerator() {
        return new PharmacieGarde().id(longCount.incrementAndGet());
    }
}
