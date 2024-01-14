package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Pharmacien;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface PharmacienRepositoryWithBagRelationships {
    Optional<Pharmacien> fetchBagRelationships(Optional<Pharmacien> pharmacien);

    List<Pharmacien> fetchBagRelationships(List<Pharmacien> pharmaciens);

    Page<Pharmacien> fetchBagRelationships(Page<Pharmacien> pharmaciens);
}
