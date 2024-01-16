package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.PharmacieGarde;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PharmacieGarde entity.
 *
 * When extending this class, extend PharmacieGardeRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface PharmacieGardeRepository extends PharmacieGardeRepositoryWithBagRelationships, JpaRepository<PharmacieGarde, Long> {
    default Optional<PharmacieGarde> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<PharmacieGarde> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<PharmacieGarde> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    List<PharmacieGarde> findByPharmaciesId(Long id);
}
