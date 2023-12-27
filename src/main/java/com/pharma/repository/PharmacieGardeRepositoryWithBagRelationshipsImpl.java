package com.pharma.repository;

import com.pharma.domain.PharmacieGarde;
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
public class PharmacieGardeRepositoryWithBagRelationshipsImpl implements PharmacieGardeRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<PharmacieGarde> fetchBagRelationships(Optional<PharmacieGarde> pharmacieGarde) {
        return pharmacieGarde.map(this::fetchPharmacies).map(this::fetchGardes);
    }

    @Override
    public Page<PharmacieGarde> fetchBagRelationships(Page<PharmacieGarde> pharmacieGardes) {
        return new PageImpl<>(
            fetchBagRelationships(pharmacieGardes.getContent()),
            pharmacieGardes.getPageable(),
            pharmacieGardes.getTotalElements()
        );
    }

    @Override
    public List<PharmacieGarde> fetchBagRelationships(List<PharmacieGarde> pharmacieGardes) {
        return Optional.of(pharmacieGardes).map(this::fetchPharmacies).map(this::fetchGardes).orElse(Collections.emptyList());
    }

    PharmacieGarde fetchPharmacies(PharmacieGarde result) {
        return entityManager
            .createQuery(
                "select pharmacieGarde from PharmacieGarde pharmacieGarde left join fetch pharmacieGarde.pharmacies where pharmacieGarde.id = :id",
                PharmacieGarde.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<PharmacieGarde> fetchPharmacies(List<PharmacieGarde> pharmacieGardes) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, pharmacieGardes.size()).forEach(index -> order.put(pharmacieGardes.get(index).getId(), index));
        List<PharmacieGarde> result = entityManager
            .createQuery(
                "select pharmacieGarde from PharmacieGarde pharmacieGarde left join fetch pharmacieGarde.pharmacies where pharmacieGarde in :pharmacieGardes",
                PharmacieGarde.class
            )
            .setParameter("pharmacieGardes", pharmacieGardes)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    PharmacieGarde fetchGardes(PharmacieGarde result) {
        return entityManager
            .createQuery(
                "select pharmacieGarde from PharmacieGarde pharmacieGarde left join fetch pharmacieGarde.gardes where pharmacieGarde.id = :id",
                PharmacieGarde.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<PharmacieGarde> fetchGardes(List<PharmacieGarde> pharmacieGardes) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, pharmacieGardes.size()).forEach(index -> order.put(pharmacieGardes.get(index).getId(), index));
        List<PharmacieGarde> result = entityManager
            .createQuery(
                "select pharmacieGarde from PharmacieGarde pharmacieGarde left join fetch pharmacieGarde.gardes where pharmacieGarde in :pharmacieGardes",
                PharmacieGarde.class
            )
            .setParameter("pharmacieGardes", pharmacieGardes)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
