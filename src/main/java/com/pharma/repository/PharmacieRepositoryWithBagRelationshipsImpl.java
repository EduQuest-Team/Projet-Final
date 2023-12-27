package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class PharmacieRepositoryWithBagRelationshipsImpl implements PharmacieRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Pharmacie> fetchBagRelationships(Optional<Pharmacie> pharmacie) {
        return pharmacie.map(this::fetchGardes);
    }

    @Override
    public Page<Pharmacie> fetchBagRelationships(Page<Pharmacie> pharmacies) {
        return new PageImpl<>(fetchBagRelationships(pharmacies.getContent()), pharmacies.getPageable(), pharmacies.getTotalElements());
    }

    @Override
    public List<Pharmacie> fetchBagRelationships(List<Pharmacie> pharmacies) {
        return Optional.of(pharmacies).map(this::fetchGardes).orElse(Collections.emptyList());
    }

    Pharmacie fetchGardes(Pharmacie result) {
        return entityManager
            .createQuery(
                "select pharmacie from Pharmacie pharmacie left join fetch pharmacie.gardes where pharmacie.id = :id",
                Pharmacie.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Pharmacie> fetchGardes(List<Pharmacie> pharmacies) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, pharmacies.size()).forEach(index -> order.put(pharmacies.get(index).getId(), index));
        List<Pharmacie> result = entityManager
            .createQuery(
                "select pharmacie from Pharmacie pharmacie left join fetch pharmacie.gardes where pharmacie in :pharmacies",
                Pharmacie.class
            )
            .setParameter("pharmacies", pharmacies)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
