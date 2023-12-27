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
import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';
import { getEntities as getPharmacieGardes } from 'app/entities/pharmacie-garde/pharmacie-garde.reducer';
import { IGarde } from 'app/shared/model/garde.model';
import { getEntity, updateEntity, createEntity, reset } from './garde.reducer';

export const GardeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pharmacies = useAppSelector(state => state.pharmacie.entities);
  const pharmacieGardes = useAppSelector(state => state.pharmacieGarde.entities);
  const gardeEntity = useAppSelector(state => state.garde.entity);
  const loading = useAppSelector(state => state.garde.loading);
  const updating = useAppSelector(state => state.garde.updating);
  const updateSuccess = useAppSelector(state => state.garde.updateSuccess);

  const handleClose = () => {
    navigate('/garde');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPharmacies({}));
    dispatch(getPharmacieGardes({}));
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

    const entity = {
      ...gardeEntity,
      ...values,
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
          ...gardeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.garde.home.createOrEditLabel" data-cy="GardeCreateUpdateHeading">
            <Translate contentKey="pharmaAiApp.garde.home.createOrEditLabel">Create or edit a Garde</Translate>
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
                  id="garde-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('pharmaAiApp.garde.type')}
                id="garde-type"
                name="type"
                data-cy="type"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/garde" replace color="info">
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

export default GardeUpdate;
