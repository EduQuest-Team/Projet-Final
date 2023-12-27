package com.pharma.repository;

import com.pharma.domain.Pharmacien;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pharmacien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PharmacienRepository extends JpaRepository<Pharmacien, Long> {}
