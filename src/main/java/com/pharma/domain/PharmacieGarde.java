package com.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PharmacieGarde.
 */
@Entity
@Table(name = "pharmacie_garde")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PharmacieGarde implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_pharmacie_garde__pharmacie",
        joinColumns = @JoinColumn(name = "pharmacie_garde_id"),
        inverseJoinColumns = @JoinColumn(name = "pharmacie_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zone", "gardes", "pharmaciegardes", "pharmacien", "position" }, allowSetters = true)
    private Set<Pharmacie> pharmacies = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_pharmacie_garde__garde",
        joinColumns = @JoinColumn(name = "pharmacie_garde_id"),
        inverseJoinColumns = @JoinColumn(name = "garde_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pharmacies", "pharmaciegardes" }, allowSetters = true)
    private Set<Garde> gardes = new HashSet<>();

    @JsonIgnoreProperties(value = { "pharmaciegarde", "pharmacien" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "pharmaciegarde")
    private Historique historique;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PharmacieGarde id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateDebut() {
        return this.dateDebut;
    }

    public PharmacieGarde dateDebut(LocalDate dateDebut) {
        this.setDateDebut(dateDebut);
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return this.dateFin;
    }

    public PharmacieGarde dateFin(LocalDate dateFin) {
        this.setDateFin(dateFin);
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Set<Pharmacie> getPharmacies() {
        return this.pharmacies;
    }

    public void setPharmacies(Set<Pharmacie> pharmacies) {
        this.pharmacies = pharmacies;
    }

    public PharmacieGarde pharmacies(Set<Pharmacie> pharmacies) {
        this.setPharmacies(pharmacies);
        return this;
    }

    public PharmacieGarde addPharmacie(Pharmacie pharmacie) {
        this.pharmacies.add(pharmacie);
        return this;
    }

    public PharmacieGarde removePharmacie(Pharmacie pharmacie) {
        this.pharmacies.remove(pharmacie);
        return this;
    }

    public Set<Garde> getGardes() {
        return this.gardes;
    }

    public void setGardes(Set<Garde> gardes) {
        this.gardes = gardes;
    }

    public PharmacieGarde gardes(Set<Garde> gardes) {
        this.setGardes(gardes);
        return this;
    }

    public PharmacieGarde addGarde(Garde garde) {
        this.gardes.add(garde);
        return this;
    }

    public PharmacieGarde removeGarde(Garde garde) {
        this.gardes.remove(garde);
        return this;
    }

    public Historique getHistorique() {
        return this.historique;
    }

    public void setHistorique(Historique historique) {
        if (this.historique != null) {
            this.historique.setPharmaciegarde(null);
        }
        if (historique != null) {
            historique.setPharmaciegarde(this);
        }
        this.historique = historique;
    }

    public PharmacieGarde historique(Historique historique) {
        this.setHistorique(historique);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PharmacieGarde)) {
            return false;
        }
        return getId() != null && getId().equals(((PharmacieGarde) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PharmacieGarde{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
