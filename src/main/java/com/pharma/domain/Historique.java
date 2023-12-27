package com.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Historique.
 */
@Entity
@Table(name = "historique")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Historique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "path")
    private String path;

    @Column(name = "date")
    private LocalDate date;

    @JsonIgnoreProperties(value = { "pharmacies", "gardes", "historique" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private PharmacieGarde pharmaciegarde;

    @JsonIgnoreProperties(value = { "pharmacie", "historique" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Pharmacien pharmacien;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Historique id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return this.path;
    }

    public Historique path(String path) {
        this.setPath(path);
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Historique date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public PharmacieGarde getPharmaciegarde() {
        return this.pharmaciegarde;
    }

    public void setPharmaciegarde(PharmacieGarde pharmacieGarde) {
        this.pharmaciegarde = pharmacieGarde;
    }

    public Historique pharmaciegarde(PharmacieGarde pharmacieGarde) {
        this.setPharmaciegarde(pharmacieGarde);
        return this;
    }

    public Pharmacien getPharmacien() {
        return this.pharmacien;
    }

    public void setPharmacien(Pharmacien pharmacien) {
        this.pharmacien = pharmacien;
    }

    public Historique pharmacien(Pharmacien pharmacien) {
        this.setPharmacien(pharmacien);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Historique)) {
            return false;
        }
        return getId() != null && getId().equals(((Historique) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Historique{" +
            "id=" + getId() +
            ", path='" + getPath() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
