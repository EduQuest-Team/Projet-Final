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
    @Query("SELECT v.nom, COUNT(z.id) FROM Ville v JOIN Zone z ON v.id = z.ville.id GROUP BY v.nom")
    List<Object[]> countZonePerVille();
    //    @Query("SELECT
    //    v.nom,
    //    COUNT(z.id)
    //FROM
    //    ville v
    //JOIN zone z ON
    //    v.id = z.ville_id
    //GROUP BY
    //    v.nom")
}
