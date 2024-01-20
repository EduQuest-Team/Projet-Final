package com.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Garde.
 */
@Entity
@Table(name = "garde")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Garde implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private Boolean type;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "gardes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zone", "gardes", "pharmaciegardes", "pharmacien", "position" }, allowSetters = true)
    private Set<Pharmacie> pharmacies = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "gardes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pharmacies", "gardes" }, allowSetters = true)
    private Set<PharmacieGarde> pharmaciegardes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Garde id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getType() {
        return this.type;
    }

    public Garde type(Boolean type) {
        this.setType(type);
        return this;
    }

    public void setType(Boolean type) {
        this.type = type;
    }

    public Set<Pharmacie> getPharmacies() {
        return this.pharmacies;
    }

    public void setPharmacies(Set<Pharmacie> pharmacies) {
        if (this.pharmacies != null) {
            this.pharmacies.forEach(i -> i.removeGarde(this));
        }
        if (pharmacies != null) {
            pharmacies.forEach(i -> i.addGarde(this));
        }
        this.pharmacies = pharmacies;
    }

    public Garde pharmacies(Set<Pharmacie> pharmacies) {
        this.setPharmacies(pharmacies);
        return this;
    }

    public Garde addPharmacie(Pharmacie pharmacie) {
        this.pharmacies.add(pharmacie);
        pharmacie.getGardes().add(this);
        return this;
    }

    public Garde removePharmacie(Pharmacie pharmacie) {
        this.pharmacies.remove(pharmacie);
        pharmacie.getGardes().remove(this);
        return this;
    }

    public Set<PharmacieGarde> getPharmaciegardes() {
        return this.pharmaciegardes;
    }

    public void setPharmaciegardes(Set<PharmacieGarde> pharmacieGardes) {
        if (this.pharmaciegardes != null) {
            this.pharmaciegardes.forEach(i -> i.removeGarde(this));
        }
        if (pharmacieGardes != null) {
            pharmacieGardes.forEach(i -> i.addGarde(this));
        }
        this.pharmaciegardes = pharmacieGardes;
    }

    public Garde pharmaciegardes(Set<PharmacieGarde> pharmacieGardes) {
        this.setPharmaciegardes(pharmacieGardes);
        return this;
    }

    public Garde addPharmaciegarde(PharmacieGarde pharmacieGarde) {
        this.pharmaciegardes.add(pharmacieGarde);
        pharmacieGarde.getGardes().add(this);
        return this;
    }

    public Garde removePharmaciegarde(PharmacieGarde pharmacieGarde) {
        this.pharmaciegardes.remove(pharmacieGarde);
        pharmacieGarde.getGardes().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Garde)) {
            return false;
        }
        return getId() != null && getId().equals(((Garde) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Garde{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
