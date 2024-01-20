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
import { IPharmacien } from 'app/shared/model/pharmacien.model';
import { getEntity, updateEntity, createEntity, reset } from './pharmacien.reducer';

export const PharmacienUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pharmacies = useAppSelector(state => state.pharmacie.entities);
  const pharmacienEntity = useAppSelector(state => state.pharmacien.entity);
  const loading = useAppSelector(state => state.pharmacien.loading);
  const updating = useAppSelector(state => state.pharmacien.updating);
  const updateSuccess = useAppSelector(state => state.pharmacien.updateSuccess);

  const handleClose = () => {
    navigate('/pharmacien');
  };

  useEffect(() => {
    if (!isNew) {
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

    const entity = {
      ...pharmacienEntity,
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
          ...pharmacienEntity,
          pharmacie: pharmacienEntity?.pharmacie?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.pharmacien.home.createOrEditLabel" data-cy="PharmacienCreateUpdateHeading">
            <Translate contentKey="pharmaAiApp.pharmacien.home.createOrEditLabel">Create or edit a Pharmacien</Translate>
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
                  id="pharmacien-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('pharmaAiApp.pharmacien.nom')} id="pharmacien-nom" name="nom" data-cy="nom" type="text" />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacien.prenom')}
                id="pharmacien-prenom"
                name="prenom"
                data-cy="prenom"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacien.email')}
                id="pharmacien-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacien.password')}
                id="pharmacien-password"
                name="password"
                data-cy="password"
                type="text"
              />
              <ValidatedField
                id="pharmacien-pharmacie"
                name="pharmacie"
                data-cy="pharmacie"
                label={translate('pharmaAiApp.pharmacien.pharmacie')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pharmacien" replace color="info">
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

export default PharmacienUpdate;
