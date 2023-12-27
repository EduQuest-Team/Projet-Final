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
import { IGarde } from 'app/shared/model/garde.model';
import { getEntities as getGardes } from 'app/entities/garde/garde.reducer';
import { IHistorique } from 'app/shared/model/historique.model';
import { getEntities as getHistoriques } from 'app/entities/historique/historique.reducer';
import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';
import { getEntity, updateEntity, createEntity, reset } from './pharmacie-garde.reducer';

export const PharmacieGardeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pharmacies = useAppSelector(state => state.pharmacie.entities);
  const gardes = useAppSelector(state => state.garde.entities);
  const historiques = useAppSelector(state => state.historique.entities);
  const pharmacieGardeEntity = useAppSelector(state => state.pharmacieGarde.entity);
  const loading = useAppSelector(state => state.pharmacieGarde.loading);
  const updating = useAppSelector(state => state.pharmacieGarde.updating);
  const updateSuccess = useAppSelector(state => state.pharmacieGarde.updateSuccess);

  const handleClose = () => {
    navigate('/pharmacie-garde');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPharmacies({}));
    dispatch(getGardes({}));
    dispatch(getHistoriques({}));
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
      ...pharmacieGardeEntity,
      ...values,
      pharmacies: mapIdList(values.pharmacies),
      gardes: mapIdList(values.gardes),
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
          ...pharmacieGardeEntity,
          pharmacies: pharmacieGardeEntity?.pharmacies?.map(e => e.id.toString()),
          gardes: pharmacieGardeEntity?.gardes?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.pharmacieGarde.home.createOrEditLabel" data-cy="PharmacieGardeCreateUpdateHeading">
            <Translate contentKey="pharmaAiApp.pharmacieGarde.home.createOrEditLabel">Create or edit a PharmacieGarde</Translate>
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
                  id="pharmacie-garde-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('pharmaAiApp.pharmacieGarde.dateDebut')}
                id="pharmacie-garde-dateDebut"
                name="dateDebut"
                data-cy="dateDebut"
                type="date"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacieGarde.dateFin')}
                id="pharmacie-garde-dateFin"
                name="dateFin"
                data-cy="dateFin"
                type="date"
              />
              <ValidatedField
                label={translate('pharmaAiApp.pharmacieGarde.pharmacie')}
                id="pharmacie-garde-pharmacie"
                data-cy="pharmacie"
                type="select"
                multiple
                name="pharmacies"
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
              <ValidatedField
                label={translate('pharmaAiApp.pharmacieGarde.garde')}
                id="pharmacie-garde-garde"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pharmacie-garde" replace color="info">
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

export default PharmacieGardeUpdate;
