package com.pharma.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class GardeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Garde getGardeSample1() {
        return new Garde().id(1L);
    }

    public static Garde getGardeSample2() {
        return new Garde().id(2L);
    }

    public static Garde getGardeRandomSampleGenerator() {
        return new Garde().id(longCount.incrementAndGet());
    }
}
