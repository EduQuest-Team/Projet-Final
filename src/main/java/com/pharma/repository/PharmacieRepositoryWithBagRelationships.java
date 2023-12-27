package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface PharmacieRepositoryWithBagRelationships {
    Optional<Pharmacie> fetchBagRelationships(Optional<Pharmacie> pharmacie);

    List<Pharmacie> fetchBagRelationships(List<Pharmacie> pharmacies);

    Page<Pharmacie> fetchBagRelationships(Page<Pharmacie> pharmacies);
}
