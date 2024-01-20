package com.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pharmacie.
 */
@Entity
@Table(name = "pharmacie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pharmacie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;

    @Lob
    @Column(name = "image", length = Integer.MAX_VALUE, nullable = true)
    private byte[] image;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "ville" }, allowSetters = true)
    private Zone zone;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_pharmacie__garde",
        joinColumns = @JoinColumn(name = "pharmacie_id"),
        inverseJoinColumns = @JoinColumn(name = "garde_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pharmacies", "pharmaciegardes" }, allowSetters = true)
    private Set<Garde> gardes = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "pharmacies")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pharmacies", "gardes" }, allowSetters = true)
    private Set<PharmacieGarde> pharmaciegardes = new HashSet<>();

    @JsonIgnoreProperties(value = { "pharmacie" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "pharmacie")
    private Pharmacien pharmacien;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pharmacie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Pharmacie nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Pharmacie adresse(String adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public byte[] getImage() {
        return this.image;
    }

    public Pharmacie image(byte[] image) {
        this.setImage(image);
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Double getLatitude() {
        return this.latitude;
    }

    public Pharmacie latitude(Double latitude) {
        this.setLatitude(latitude);
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return this.longitude;
    }

    public Pharmacie longitude(Double longitude) {
        this.setLongitude(longitude);
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Pharmacie status(Boolean status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Zone getZone() {
        return this.zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public Pharmacie zone(Zone zone) {
        this.setZone(zone);
        return this;
    }

    public Set<Garde> getGardes() {
        return this.gardes;
    }

    public void setGardes(Set<Garde> gardes) {
        this.gardes = gardes;
    }

    public Pharmacie gardes(Set<Garde> gardes) {
        this.setGardes(gardes);
        return this;
    }

    public Pharmacie addGarde(Garde garde) {
        this.gardes.add(garde);
        return this;
    }

    public Pharmacie removeGarde(Garde garde) {
        this.gardes.remove(garde);
        return this;
    }

    public Set<PharmacieGarde> getPharmaciegardes() {
        return this.pharmaciegardes;
    }

    public void setPharmaciegardes(Set<PharmacieGarde> pharmacieGardes) {
        if (this.pharmaciegardes != null) {
            this.pharmaciegardes.forEach(i -> i.removePharmacie(this));
        }
        if (pharmacieGardes != null) {
            pharmacieGardes.forEach(i -> i.addPharmacie(this));
        }
        this.pharmaciegardes = pharmacieGardes;
    }

    public Pharmacie pharmaciegardes(Set<PharmacieGarde> pharmacieGardes) {
        this.setPharmaciegardes(pharmacieGardes);
        return this;
    }

    public Pharmacie addPharmaciegarde(PharmacieGarde pharmacieGarde) {
        this.pharmaciegardes.add(pharmacieGarde);
        pharmacieGarde.getPharmacies().add(this);
        return this;
    }

    public Pharmacie removePharmaciegarde(PharmacieGarde pharmacieGarde) {
        this.pharmaciegardes.remove(pharmacieGarde);
        pharmacieGarde.getPharmacies().remove(this);
        return this;
    }

    public Pharmacien getPharmacien() {
        return this.pharmacien;
    }

    public void setPharmacien(Pharmacien pharmacien) {
        if (this.pharmacien != null) {
            this.pharmacien.setPharmacie(null);
        }
        if (pharmacien != null) {
            pharmacien.setPharmacie(this);
        }
        this.pharmacien = pharmacien;
    }

    public Pharmacie pharmacien(Pharmacien pharmacien) {
        this.setPharmacien(pharmacien);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pharmacie)) {
            return false;
        }
        return getId() != null && getId().equals(((Pharmacie) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pharmacie{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", image='" + getImage() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
