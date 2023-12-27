package com.pharma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class PharmacieTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Pharmacie getPharmacieSample1() {
        return new Pharmacie().id(1L).nom("nom1").adresse("adresse1").image(null);
    }

    public static Pharmacie getPharmacieSample2() {
        return new Pharmacie().id(2L).nom("nom2").adresse("adresse2").image(null);
    }

    public static Pharmacie getPharmacieRandomSampleGenerator() {
        //        return new Pharmacie()
        //                .id(longCount.incrementAndGet())
        //                .nom(UUID.randomUUID().toString())
        //                .adresse(UUID.randomUUID().toString());
        Pharmacie pharmacie = new Pharmacie();
        pharmacie.setId(longCount.incrementAndGet());
        pharmacie.setNom(UUID.randomUUID().toString());
        pharmacie.setAdresse(UUID.randomUUID().toString());

        // Generate a random image
        byte[] imageBytes = generateRandomImage();

        // Convert byte array to Blob
        pharmacie.setImage(imageBytes);

        return pharmacie;
    }

    private static byte[] generateRandomImage() {
        // Generate random image bytes here
        // Replace this with your own logic to generate random image bytes

        byte[] randomImageBytes = new byte[1024]; // Example: 1024 bytes

        new Random().nextBytes(randomImageBytes);

        return randomImageBytes;
    }
}
