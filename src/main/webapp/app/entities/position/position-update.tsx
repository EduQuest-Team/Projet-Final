import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPharmacie } from 'app/shared/model/pharmacie.model';
import { getEntities as getPharmacies } from 'app/entities/pharmacie/pharmacie.reducer';
import { IPosition } from 'app/shared/model/position.model';
import { getEntity, updateEntity, createEntity, reset } from './position.reducer';

export const PositionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pharmacies = useAppSelector(state => state.pharmacie.entities);
  const positionEntity = useAppSelector(state => state.position.entity);
  const loading = useAppSelector(state => state.position.loading);
  const updating = useAppSelector(state => state.position.updating);
  const updateSuccess = useAppSelector(state => state.position.updateSuccess);

  const handleClose = () => {
    navigate('/position');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPharmacies({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.latitude !== undefined && typeof values.latitude !== 'number') {
      values.latitude = Number(values.latitude);
    }
    if (values.longitude !== undefined && typeof values.longitude !== 'number') {
      values.longitude = Number(values.longitude);
    }

    const entity = {
      ...positionEntity,
      ...values,
      pharmacie: pharmacies.find(it => it.id.toString() === values.pharmacie.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...positionEntity,
          pharmacie: positionEntity?.pharmacie?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.position.home.createOrEditLabel" data-cy="PositionCreateUpdateHeading">
            <Translate contentKey="pharmaAiApp.position.home.createOrEditLabel">Create or edit a Position</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="position-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('pharmaAiApp.position.latitude')}
                id="position-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.position.longitude')}
                id="position-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
              />
              <ValidatedField
                id="position-pharmacie"
                name="pharmacie"
                data-cy="pharmacie"
                label={translate('pharmaAiApp.position.pharmacie')}
                type="select"
              >
                <option value="" key="0" />
                {pharmacies
                  ? pharmacies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/position" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PositionUpdate;
