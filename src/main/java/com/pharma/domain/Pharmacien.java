package com.pharma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pharmacien.
 */
@Entity
@Table(name = "pharmacien")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pharmacien implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @JsonIgnoreProperties(value = { "zone", "gardes", "pharmaciegardes", "pharmacien", "position" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Pharmacie pharmacie;

    @JsonIgnoreProperties(value = { "pharmaciegarde", "pharmacien" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "pharmacien")
    private Historique historique;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pharmacien id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Pharmacien nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Pharmacien prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return this.email;
    }

    public Pharmacien email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public Pharmacien password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Pharmacie getPharmacie() {
        return this.pharmacie;
    }

    public void setPharmacie(Pharmacie pharmacie) {
        this.pharmacie = pharmacie;
    }

    public Pharmacien pharmacie(Pharmacie pharmacie) {
        this.setPharmacie(pharmacie);
        return this;
    }

    public Historique getHistorique() {
        return this.historique;
    }

    public void setHistorique(Historique historique) {
        if (this.historique != null) {
            this.historique.setPharmacien(null);
        }
        if (historique != null) {
            historique.setPharmacien(this);
        }
        this.historique = historique;
    }

    public Pharmacien historique(Historique historique) {
        this.setHistorique(historique);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pharmacien)) {
            return false;
        }
        return getId() != null && getId().equals(((Pharmacien) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pharmacien{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
