package com.pharma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class VilleTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Ville getVilleSample1() {
        return new Ville().id(1L).nom("nom1").image(null);
    }

    public static Ville getVilleSample2() {
        return new Ville().id(1L).nom("nom2").image(null);
    }

    public static Ville getVilleRandomSampleGenerator() {
        Ville ville = new Ville();
        ville.setId(longCount.incrementAndGet());
        ville.setNom(UUID.randomUUID().toString());

        // Generate a random image
        byte[] imageBytes = generateRandomImage();

        // Convert byte array to Blob
        ville.setImage(imageBytes);
        return ville;
    }

    private static byte[] generateRandomImage() {
        // Generate random image bytes here
        // Replace this with your own logic to generate random image bytes

        byte[] randomImageBytes = new byte[1024]; // Example: 1024 bytes

        new Random().nextBytes(randomImageBytes);

        return randomImageBytes;
    }
}
