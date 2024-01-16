package com.pharma.repository;

import com.pharma.domain.*;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Spring Data JPA repository for the Pharmacie entity.
 * <p>
 * When extending this class, extend PharmacieRepositoryWithBagRelationships
 * too.
 * For more information refer to
 * https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface PharmacieRepository extends PharmacieRepositoryWithBagRelationships, JpaRepository<Pharmacie, Long> {
    default Optional<Pharmacie> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Pharmacie> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Pharmacie> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    @Query(
        "SELECT distinct p FROM Pharmacie p, Garde g join p.zone z on  z.id = :zoneId join z.ville v ON v.id = :villeId WHERE g.id = :gardeId AND p.status = true"
    )
    List<Pharmacie> getPharmaciesByVilleAndZoneAndGarde(
        @Param("gardeId") Long gardeId,
        @Param("zoneId") Long zoneId,
        @Param("villeId") Long villeId
    );

    //
    //    @Query(
    //            //            "select Distinct p from Pharmacie p, PharmacieGarde pg, Zone z, Ville v Where p.zone.id = z.id AND z.ville.id = v.id AND z = :zone AND v = :ville AND( p.gardes.size = 0 OR pg.gardes.size = 1 ) AND (pg.garde.type = :J or pg.garde.type = :N) "
    //            "select Distinct p from Pharmacie p, PharmacieGarde pg, Zone z, Ville v Where p.zone.id = z.id AND z.ville.id = v.id AND z = :zone AND v = :ville AND (pg.gardes.type = :garde) "
    //            //        "AND p.status = true"
    //    )
    //    default List<Pharmacie> getPharmaciesByVilleAndZone(@Param("ville") Ville ville, @Param("zone") Zone zone, @Param("garde") Garde garde) {
    //    default List<Pharmacie> getPharmaciesByVilleAndZone(@Param("ville") Ville ville, @Param("zone") Zone zone, @Param("garde") Long garde) {
    //        return this.fetchBagRelationships(this.findAll());
    //    }
    //@Query("SELECT ph FROM Pharmacien ph JOIN ph.pharmacie p LEFT JOIN p.zone z WHERE p.zone.id = :zoneId AND z.ville.id = :villeId")

    //    Pharmacie getPharmacieByPharmacien(@Param("pharmacienId") Long pharmacienId);
    // default
    // List<Pharmacie> getPharmaciesByVilleAndZone(@Param("villeId") Long villeId,
    // @Param("zoneId") Long zoneId) {
    // return this.fetchBagRelationships(this.findAll());
    // }

    // @Param("J") Garde J, @Param("N") Garde N
    // ,@Param("J") GardeType J,
    // @Param("N") GardeType N

    //    Pharmacie findByPharmacie(@Param("pharmacienId") Long  pharmacienId);

    List<Pharmacie> findByPharmacienId(Long id);

    @Query("SELECT v.nom, COUNT(p.id) FROM Ville v JOIN Pharmacie p ON v.id = p.zone.ville.id GROUP BY v.nom")
    List<Object[]> countPharmaciesPerVille();

    @Query("SELECT z.nom, COUNT(p.id) FROM Zone z JOIN Pharmacie p ON z.id = p.zone.id GROUP BY z.nom")
    List<Object[]> countPharmaciesPerZone();
}
