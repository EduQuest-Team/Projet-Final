package com.pharma.repository;

import com.pharma.domain.PharmacieGarde;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface PharmacieGardeRepositoryWithBagRelationships {
    Optional<PharmacieGarde> fetchBagRelationships(Optional<PharmacieGarde> pharmacieGarde);

    List<PharmacieGarde> fetchBagRelationships(List<PharmacieGarde> pharmacieGardes);

    Page<PharmacieGarde> fetchBagRelationships(Page<PharmacieGarde> pharmacieGardes);
}
