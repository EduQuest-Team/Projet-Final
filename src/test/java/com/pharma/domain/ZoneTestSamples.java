package com.pharma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ZoneTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Zone getZoneSample1() {
        return new Zone().id(1L).nom("nom1");
    }

    public static Zone getZoneSample2() {
        return new Zone().id(2L).nom("nom2");
    }

    public static Zone getZoneRandomSampleGenerator() {
        return new Zone().id(longCount.incrementAndGet()).nom(UUID.randomUUID().toString());
    }
}
