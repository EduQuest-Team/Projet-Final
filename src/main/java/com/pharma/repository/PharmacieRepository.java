package com.pharma.repository;

import com.pharma.domain.Pharmacie;
import com.pharma.domain.Ville;
import com.pharma.domain.Zone;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pharmacie entity.
 *
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
        "select Distinct p from Pharmacie p, PharmacieGarde pg, Zone z, Ville v " +
        "Where p.zone_id = z AND v = z.ville_id " +
        "AND z = :zone" +
        "AND v = :ville" +
        "AND( pg.garde_id = 0 OR pg.garde_id = 1 )" +
        // + "AND (pg.garde.type = :J or pg.garde.type = :N) "
        "AND p.status = 1"
    )
    default List<Pharmacie> getPharmaciesByVilleAndZone(@Param("ville") Ville ville, @Param("zone") Zone zone) {
        return this.fetchBagRelationships(this.findAll());
    }
    // default
    // List<Pharmacie> getPharmaciesByVilleAndZone(@Param("villeId") Long villeId,
    // @Param("zoneId") Long zoneId) {
    // return this.fetchBagRelationships(this.findAll());
    // }

    // @Param("J") Garde J, @Param("N") Garde N
    // ,@Param("J") GardeType J,
    // @Param("N") GardeType N

}
