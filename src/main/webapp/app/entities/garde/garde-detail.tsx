import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './garde.reducer';

export const GardeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const gardeEntity = useAppSelector(state => state.garde.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="gardeDetailsHeading">
          <Translate contentKey="pharmaAiApp.garde.detail.title">Garde</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{gardeEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="pharmaAiApp.garde.type">Type</Translate>
            </span>
          </dt>
          <dd>{gardeEntity.type ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/garde" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/garde/${gardeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GardeDetail;
