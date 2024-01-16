import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pharmacie-garde.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
export const PharmacieGardeDetail = () => {
  const dispatch = useAppDispatch();
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);
  const isPharmacien = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.PHARMACIEN]));

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pharmacieGardeEntity = useAppSelector(state => state.pharmacieGarde.entity);
  return (
    <Row className="detail">
      <Col md="2">
        <h2 data-cy="pharmacieGardeDetailsHeading">
          <Translate contentKey="pharmaAiApp.pharmacieGarde.detail.title">PharmacieGarde</Translate>
        </h2>
        <dl className="jh-entity-details detail">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pharmacieGardeEntity.id}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="pharmaAiApp.pharmacieGarde.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            {pharmacieGardeEntity.dateDebut ? (
              <TextFormat value={pharmacieGardeEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="pharmaAiApp.pharmacieGarde.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            {pharmacieGardeEntity.dateFin ? (
              <TextFormat value={pharmacieGardeEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="pharmaAiApp.pharmacieGarde.pharmacie">Pharmacie</Translate>
          </dt>
          <dd>
            {pharmacieGardeEntity.pharmacies
              ? pharmacieGardeEntity.pharmacies.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nom}</a>
                    {pharmacieGardeEntity.pharmacies && i === pharmacieGardeEntity.pharmacies.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="pharmaAiApp.pharmacieGarde.garde">Garde</Translate>
          </dt>
          <dd>
            {pharmacieGardeEntity.gardes
              ? pharmacieGardeEntity.gardes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.type ? 'Day' : 'Night'}</a>
                    {pharmacieGardeEntity.gardes && i === pharmacieGardeEntity.gardes.length - 1 ? '' : ', '}
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
          <Button tag={Link} to="/pharmacie-garde" replace color="info" data-cy="entityDetailsBackButton" className="detail">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
        )}
        &nbsp;
        {/*<Button tag={Link} to={`/pharmacie-garde/${pharmacieGardeEntity.id}/edit`} replace color="primary">*/}
        {/*  <FontAwesomeIcon icon="pencil-alt" />{' '}*/}
        {/*  <span className="d-none d-md-inline">*/}
        {/*    <Translate contentKey="entity.action.edit">Edit</Translate>*/}
        {/*  </span>*/}
        {/*</Button>*/}
      </Col>
    </Row>
  );
};

export default PharmacieGardeDetail;
