import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pharmacien.reducer';
import { getPharmacyByPharmacistId } from 'app/entities/pharmaciens/pharmaciens.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const PharmacienDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const pharmacie = useAppSelector(state => state.pharmaciens.pharmacie);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  useEffect(() => {
    dispatch(getPharmacyByPharmacistId({ pharmacistId: id }));
  }, []);

  const pharmacienEntity = useAppSelector(state => state.pharmacien.entity);
  return (
    <Row className="detail">
      <Col md="2">
        <h2 data-cy="pharmacienDetailsHeading" className="text-center">
          <Translate contentKey="pharmaAiApp.pharmacien.detail.title">Pharmacien</Translate>
        </h2>
        <dl className="jh-entity-details detail">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pharmacienEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="pharmaAiApp.pharmacien.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{pharmacienEntity.nom}</dd>
          <dt>
            <span id="prenom">
              <Translate contentKey="pharmaAiApp.pharmacien.prenom">Prenom</Translate>
            </span>
          </dt>
          <dd>{pharmacienEntity.prenom}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="pharmaAiApp.pharmacien.email">Email</Translate>
            </span>
          </dt>
          <dd>{pharmacienEntity.email}</dd>
          {/*<dt>*/}
          {/*  <span id="password">*/}
          {/*    <Translate contentKey="pharmaAiApp.pharmacien.password">Password</Translate>*/}
          {/*  </span>*/}
          {/*</dt>*/}
          {/*<dd>{pharmacienEntity.password}</dd>*/}
          <dt>
            <Translate contentKey="pharmaAiApp.pharmacien.pharmacie">Pharmacie</Translate>
          </dt>
          {/*<dd>{pharmacienEntity.pharmacie ? pharmacienEntity.pharmacie.id : ''}</dd>*/}
          {pharmacie.map((p, i) => (
            <dd key={p.id}>{p.nom}</dd>
          ))}
        </dl>
        <Button tag={Link} to="/pharmacien" replace color="info" data-cy="entityDetailsBackButton" className="detail">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        {/*<Button tag={Link} to={`/pharmacien/${pharmacienEntity.id}/edit`} replace color="primary">*/}
        {/*  <FontAwesomeIcon icon="pencil-alt" />{' '}*/}
        {/*  <span className="d-none d-md-inline">*/}
        {/*    <Translate contentKey="entity.action.edit">Edit</Translate>*/}
        {/*  </span>*/}
        {/*</Button>*/}
      </Col>
    </Row>
  );
};

export default PharmacienDetail;
