package com.pharma.repository;

import com.pharma.domain.Ville;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ville entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VilleRepository extends JpaRepository<Ville, Long> {
    @Query("SELECT v.nom, COUNT(s) FROM Ville v JOIN v.zones s GROUP BY v.nom")
    @Query("SELECT v.nom, COUNT(z.id) FROM ville v\n" + "" + "" + "JOIN zone z WHERE v.id = z.ville_id\n" + "GROUP BY\n" + "    v.nom")
    List<Object[]> countZonePerVille();
}
