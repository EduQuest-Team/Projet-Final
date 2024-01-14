package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Pharmacien;
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
public class PharmacienRepositoryWithBagRelationshipsImpl implements PharmacienRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Pharmacien> fetchBagRelationships(Optional<Pharmacien> pharmacien) {
        return pharmacien.map(this::fetchGardes);
    }

    @Override
    public Page<Pharmacien> fetchBagRelationships(Page<Pharmacien> pharmaciens) {
        return new PageImpl<>(fetchBagRelationships(pharmaciens.getContent()), pharmaciens.getPageable(), pharmaciens.getTotalElements());
    }

    @Override
    public List<Pharmacien> fetchBagRelationships(List<Pharmacien> pharmaciens) {
        return Optional.of(pharmaciens).map(this::fetchGardes).orElse(Collections.emptyList());
    }

    Pharmacien fetchGardes(Pharmacien result) {
        return entityManager
            .createQuery(
                "select pharmacien from Pharmacien pharmacien left join fetch pharmacien.pharmacie where pharmacien.id = :id",
                Pharmacien.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Pharmacien> fetchGardes(List<Pharmacien> pharmaciens) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, pharmaciens.size()).forEach(index -> order.put(pharmaciens.get(index).getId(), index));
        List<Pharmacien> result = entityManager
            .createQuery(
                "select pharmacien from Pharmacien pharmacien left join fetch pharmacien.pharmacie where pharmacien in :pharmaciens",
                Pharmacien.class
            )
            .setParameter("pharmaciens", pharmaciens)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
