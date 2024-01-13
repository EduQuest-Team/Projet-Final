package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Pharmacien;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pharmacien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PharmacienRepository extends PharmacieRepositoryWithBagRelationships, JpaRepository<Pharmacien, Long> {
    //    @Query("SELECT ph FROM Pharmacien ph, Pharmacie p LEFT JOIN p.zone z WHERE z.id = :zoneId AND z.ville.id = :villeId")
    @Query("SELECT ph FROM Pharmacien ph JOIN ph.pharmacie p LEFT JOIN p.zone z WHERE p.zone.id = :zoneId AND z.ville.id = :villeId")
    List<Pharmacien> findByZoneAndVille(@Param("zoneId") Long zoneId, @Param("villeId") Long villeId);

    //    @Query("SELECT * FROM pharmacie JOIN pharmacien on pharmacie.id = pharmacien.pharmacie_id WHERE pharmacien.id =1500")
    //    @Query("SELECT p FROM Pharmacie p JOIN Pharmacien ph ON p.id = ph.pharmacie.id WHERE ph.id = :pharmacienId")
    //    Pharmacie findByPharmacie(@Param("pharmacienId") Long pharmacienId);
    //    Pharmacie getPharmacieByPharmacien(@Param("pharmacienId") Long pharmacienId);
    //    default Optional<Pharmacien> getPharmacieByPharmacien(@Param("pharmacienId") Long pharmacienId) {
    ////        return this.fetchBagRelationships(this.findById(pharmacienId));
    //        return this.fetchBagRelationships(this.findById(pharmacienId));
    //
    //    }
    //    Pharmacie findByPharmacie(@Param("pharmacienId") Long pharmacienId);

    @Query("SELECT p.pharmacie FROM Pharmacien p WHERE p.id = :pharmacienId")
    Pharmacie findByPharmacy(@Param("pharmacienId") Long pharmacienId);
}
