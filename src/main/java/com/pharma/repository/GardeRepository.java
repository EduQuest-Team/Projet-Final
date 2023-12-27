package com.pharma.repository;

import com.pharma.domain.Garde;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Garde entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GardeRepository extends JpaRepository<Garde, Long> {}
