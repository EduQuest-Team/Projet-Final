import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pharmacie.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const PharmacieDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);
  const isPharmacien = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.PHARMACIEN]));
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);

  const pharmacieEntity = useAppSelector(state => state.pharmacie.entity);
  return (
    <Row className="detail">
      <Col md="2">
        <h2 data-cy="pharmacieDetailsHeading" className="text-center">
          <Translate contentKey="pharmaAiApp.pharmacie.detail.title">Pharmacie</Translate>
        </h2>
        <dl className="jh-entity-details detail">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pharmacieEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="pharmaAiApp.pharmacie.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{pharmacieEntity.nom}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="pharmaAiApp.pharmacie.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{pharmacieEntity.adresse}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="pharmaAiApp.pharmacie.image">Image</Translate>
            </span>
          </dt>
          {/* <dd>{pharmacieEntity.image}</dd> */}
          <img alt="PharmaImage" src={`data:image/png;base64,${pharmacieEntity.image}`} style={{ maxHeight: '120px' }} />
          <dt>
            <span id="latitude">
              <Translate contentKey="pharmaAiApp.pharmacie.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{pharmacieEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="pharmaAiApp.pharmacie.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{pharmacieEntity.longitude}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="pharmaAiApp.pharmacie.status">Status</Translate>
            </span>
          </dt>
          <dd>{pharmacieEntity.status ? 'Activated' : 'Desactivated'}</dd>
          <dt>
            <Translate contentKey="pharmaAiApp.pharmacie.zone">Zone</Translate>
          </dt>
          <dd>{pharmacieEntity.zone ? pharmacieEntity.zone.id : ''}</dd>
          <dt>
            <Translate contentKey="pharmaAiApp.pharmacie.garde">Garde</Translate>
          </dt>
          <dd>
            {pharmacieEntity.gardes
              ? pharmacieEntity.gardes.map((val, i) => (
                  <span key={val.id}>
                    {/* <a>{val.id}</a> &nbsp;*/}
                    {val.id === 1 && 'Day'}
                    {val.id === 2 && 'Night'}
                    {/* <a>{val.type}</a>*/}
                    {pharmacieEntity.gardes && i === pharmacieEntity.gardes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        {isPharmacien ? (
          <Button tag={Link} to={`/pharmacist`} replace color="info" data-cy="entityDetailsBackButton" className="detail">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
        ) : (
          <Button tag={Link} to="/pharmacie" replace color="info" data-cy="entityDetailsBackButton" className="detail">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
        )}
        &nbsp;
        {isPharmacien && (
          <Button tag={Link} to={`/pharmacie/${pharmacieEntity.id}/edit`} replace color="primary" className="detail">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default PharmacieDetail;
