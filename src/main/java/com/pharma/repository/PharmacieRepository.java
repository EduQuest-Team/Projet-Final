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
        //            "select Distinct p from Pharmacie p, PharmacieGarde pg, Zone z, Ville v Where p.zone.id = z.id AND z.ville.id = v.id AND z = :zone AND v = :ville AND( p.gardes.size = 0 OR pg.gardes.size = 1 ) AND (pg.garde.type = :J or pg.garde.type = :N) "
        "select Distinct p from Pharmacie p, PharmacieGarde pg, Zone z, Ville v Where p.zone.id = z.id AND z.ville.id = v.id AND z = :zone AND v = :ville AND (pg.gardes.type = :garde) "
        //        "AND p.status = true"
    )
    //    default List<Pharmacie> getPharmaciesByVilleAndZone(@Param("ville") Ville ville, @Param("zone") Zone zone, @Param("garde") Garde garde) {
    default List<Pharmacie> getPharmaciesByVilleAndZone(@Param("ville") Ville ville, @Param("zone") Zone zone, @Param("garde") Long garde) {
        return this.fetchBagRelationships(this.findAll());
    }

    //    Pharmacie getPharmacieByPharmacien(@Param("pharmacienId") Long pharmacienId);
    // default
    // List<Pharmacie> getPharmaciesByVilleAndZone(@Param("villeId") Long villeId,
    // @Param("zoneId") Long zoneId) {
    // return this.fetchBagRelationships(this.findAll());
    // }

    // @Param("J") Garde J, @Param("N") Garde N
    // ,@Param("J") GardeType J,
    // @Param("N") GardeType N

    //    @Query("SELECT s FROM Student s LEFT JOIN FETCH s.groupes g WHERE g.id = :groupId AND g.academicYear.id = :academicYearId")
    //    @Query("SELECT p FROM Pharmacie p LEFT JOIN Zone z ON p.zone z WHERE z.id = 1 AND z.ville_id = 1")

    //    @Query("SELECT p FROM Pharmacie p LEFT JOIN p.zone z WHERE z.id = :zoneId AND z.ville.id = :villeId")
    //    List<Pharmacie> findByGroupIdAndAcademicYearId(@Param("zoneId") Long zoneId, @Param("villeId") Long villeId);

    //    Pharmacie findByPharmacie(@Param("pharmacienId") Long  pharmacienId);

    //    public static Pharmacie getPharmacieForAuthenticatedPharmacien(@Param("pharmacienId") Long pharmacienId) throws AccessDeniedException {
    //        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //        if (authentication != null && authentication.getPrincipal() instanceof Pharmacien) {
    //            Pharmacien authenticatedPharmacien = (Pharmacien) authentication.getPrincipal();
    //            return authenticatedPharmacien.getPharmacie();
    //        } else {
    //            throw new AccessDeniedException("Access is denied");
    //        }
    //    }
    //    default Pharmacie getPharmacieForAuthenticatedPharmacien(@PathVariable("pharmacienId") Long pharmacienId) throws AccessDeniedException {
    //        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //        if (authentication != null && authentication.getPrincipal() instanceof Pharmacien) {
    //            Pharmacien authenticatedPharmacien = (Pharmacien) authentication.getPrincipal();
    //            if (authenticatedPharmacien.getId().equals(pharmacienId)) {
    //                return authenticatedPharmacien.getPharmacie();
    //            } else {
    //                throw new AccessDeniedException("Access is denied");
    //            }
    //        } else {
    //            throw new AccessDeniedException("Access is denied");
    //        }
    //    }
    //    default Pharmacie getPharmacieForAuthenticatedPharmacien(Long pharmacienId) throws AccessDeniedException {
    //        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //        if (authentication != null && authentication.getPrincipal() instanceof Pharmacien) {
    //            Pharmacien authenticatedPharmacien = (Pharmacien) authentication.getPrincipal();
    //            if (authenticatedPharmacien.getId().equals(pharmacienId)) {
    //                return authenticatedPharmacien.getPharmacie();
    //            } else {
    //                throw new AccessDeniedException("Access is denied");
    //            }
    //        } else {
    //            throw new AccessDeniedException("Access is denied");
    //        }
    //    }

    List<Pharmacie> findByPharmacienId(Long id);

    @Query("SELECT v.nom, COUNT(p.id) FROM Ville v JOIN Pharmacie p ON v.id = p.zone.ville.id GROUP BY v.nom")
    List<Object[]> countPharmaciesPerVille();

    @Query("SELECT z.nom, COUNT(p.id) FROM Zone z JOIN Pharmacie p ON z.id = p.zone.id GROUP BY z.nom")
    List<Object[]> countPharmaciesPerZone();
}
