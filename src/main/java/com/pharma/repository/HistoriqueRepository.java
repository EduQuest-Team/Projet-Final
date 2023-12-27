package com.pharma.repository;

import com.pharma.domain.Historique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Historique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoriqueRepository extends JpaRepository<Historique, Long> {}
