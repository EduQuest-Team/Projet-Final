package com.pharma.repository;

import com.pharma.domain.Ville;
import com.pharma.domain.Zone;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Zone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
    List<Zone> findByVille(Ville ville);
    // @Query("select Distinct z from Zone z, Ville v "
    //         + "Where z.ville_id = v.id "
    //         + "AND v = :ville")
    // default List<Zone> findByVille(@Param("ville") Ville ville) {
    //     return this.findAll();
    // }

}
