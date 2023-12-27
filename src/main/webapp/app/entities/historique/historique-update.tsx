import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPharmacieGarde } from 'app/shared/model/pharmacie-garde.model';
import { getEntities as getPharmacieGardes } from 'app/entities/pharmacie-garde/pharmacie-garde.reducer';
import { IPharmacien } from 'app/shared/model/pharmacien.model';
import { getEntities as getPharmaciens } from 'app/entities/pharmacien/pharmacien.reducer';
import { IHistorique } from 'app/shared/model/historique.model';
import { getEntity, updateEntity, createEntity, reset } from './historique.reducer';

export const HistoriqueUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pharmacieGardes = useAppSelector(state => state.pharmacieGarde.entities);
  const pharmaciens = useAppSelector(state => state.pharmacien.entities);
  const historiqueEntity = useAppSelector(state => state.historique.entity);
  const loading = useAppSelector(state => state.historique.loading);
  const updating = useAppSelector(state => state.historique.updating);
  const updateSuccess = useAppSelector(state => state.historique.updateSuccess);

  const handleClose = () => {
    navigate('/historique');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getPharmacieGardes({}));
    dispatch(getPharmaciens({}));
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
      ...historiqueEntity,
      ...values,
      pharmaciegarde: pharmacieGardes.find(it => it.id.toString() === values.pharmaciegarde.toString()),
      pharmacien: pharmaciens.find(it => it.id.toString() === values.pharmacien.toString()),
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
          ...historiqueEntity,
          pharmaciegarde: historiqueEntity?.pharmaciegarde?.id,
          pharmacien: historiqueEntity?.pharmacien?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.historique.home.createOrEditLabel" data-cy="HistoriqueCreateUpdateHeading">
            <Translate contentKey="pharmaAiApp.historique.home.createOrEditLabel">Create or edit a Historique</Translate>
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
                  id="historique-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('pharmaAiApp.historique.path')}
                id="historique-path"
                name="path"
                data-cy="path"
                type="text"
              />
              <ValidatedField
                label={translate('pharmaAiApp.historique.date')}
                id="historique-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <ValidatedField
                id="historique-pharmaciegarde"
                name="pharmaciegarde"
                data-cy="pharmaciegarde"
                label={translate('pharmaAiApp.historique.pharmaciegarde')}
                type="select"
              >
                <option value="" key="0" />
                {pharmacieGardes
                  ? pharmacieGardes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="historique-pharmacien"
                name="pharmacien"
                data-cy="pharmacien"
                label={translate('pharmaAiApp.historique.pharmacien')}
                type="select"
              >
                <option value="" key="0" />
                {pharmaciens
                  ? pharmaciens.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/historique" replace color="info">
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

export default HistoriqueUpdate;
