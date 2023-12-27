package com.pharma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class HistoriqueTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Historique getHistoriqueSample1() {
        return new Historique().id(1L).path("path1");
    }

    public static Historique getHistoriqueSample2() {
        return new Historique().id(2L).path("path2");
    }

    public static Historique getHistoriqueRandomSampleGenerator() {
        return new Historique().id(longCount.incrementAndGet()).path(UUID.randomUUID().toString());
    }
}
