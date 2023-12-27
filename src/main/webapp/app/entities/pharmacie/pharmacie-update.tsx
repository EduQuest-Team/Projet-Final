import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IZone } from 'app/shared/model/zone.model';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { IGarde } from 'app/shared/model/garde.model';
import { getEntities as getGardes } from 'app/entities/garde/garde.reducer';
import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';
import { getEntities as getPharmacieGardes } from 'app/entities/pharmacie-garde/pharmacie-garde.reducer';
import { IPharmacien } from 'app/shared/model/pharmacien.model';
import { getEntities as getPharmaciens } from 'app/entities/pharmacien/pharmacien.reducer';
import { IPosition } from 'app/shared/model/position.model';
import { getEntities as getPositions } from 'app/entities/position/position.reducer';
import { IPharmacie } from 'app/shared/model/pharmacie.model';
import { getEntity, updateEntity, createEntity, reset } from './pharmacie.reducer';

export const PharmacieUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const zones = useAppSelector(state => state.zone.entities);
  const gardes = useAppSelector(state => state.garde.entities);
  const pharmacieGardes = useAppSelector(state => state.pharmacieGarde.entities);
  const pharmaciens = useAppSelector(state => state.pharmacien.entities);
  const positions = useAppSelector(state => state.position.entities);
  const pharmacieEntity = useAppSelector(state => state.pharmacie.entity);
  const loading = useAppSelector(state => state.pharmacie.loading);
  const updating = useAppSelector(state => state.pharmacie.updating);
  const updateSuccess = useAppSelector(state => state.pharmacie.updateSuccess);

  const handleClose = () => {
    navigate('/pharmacie' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getZones({}));
    dispatch(getGardes({}));
    dispatch(getPharmacieGardes({}));
    dispatch(getPharmaciens({}));
    dispatch(getPositions({}));
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
      ...pharmacieEntity,
      ...values,
      gardes: mapIdList(values.gardes),
      zone: zones.find(it => it.id.toString() === values.zone.toString()),
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
          ...pharmacieEntity,
          zone: pharmacieEntity?.zone?.id,
          gardes: pharmacieEntity?.gardes?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.pharmacie.home.createOrEditLabel" data-cy="PharmacieCreateUpdateHeading">
            <Translate contentKey="pharmaAiApp.pharmacie.home.createOrEditLabel">Create or edit a Pharmacie</Translate>
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
                  id="pharmacie-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('pharmaAiApp.pharmacie.nom')} id="pharmacie-nom" name="nom" data-cy="nom" type="text" />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacie.adresse')}
                id="pharmacie-adresse"
                name="adresse"
                data-cy="adresse"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacie.image')}
                id="pharmacie-image"
                name="image"
                data-cy="image"
                type="file"
                accept="image/*"
              />
              {/*<input type="file" id="pharmacie-image"*/}
              {/*       name="image"*/}
              {/*       data-cy="image"*/}
              {/*       accept="image/png, image/jpeg"/>*/}
              <ValidatedField
                label={translate('pharmaAiApp.pharmacie.longitude')}
                id="pharmacie-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacie.latitude')}
                id="pharmacie-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacie.status')}
                id="pharmacie-status"
                name="status"
                data-cy="status"
                check
                type="checkbox"
              />
              <ValidatedField id="pharmacie-zone" name="zone" data-cy="zone" label={translate('pharmaAiApp.pharmacie.zone')} type="select">
                <option value="" key="0" />
                {zones
                  ? zones.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('pharmaAiApp.pharmacie.garde')}
                id="pharmacie-garde"
                data-cy="garde"
                type="select"
                multiple
                name="gardes"
              >
                <option value="" key="0" />
                {gardes
                  ? gardes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pharmacie" replace color="info">
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

export default PharmacieUpdate;
