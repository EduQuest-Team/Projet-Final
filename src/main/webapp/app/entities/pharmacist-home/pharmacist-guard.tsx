import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, translate, ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { getEntities as getGardes } from 'app/entities/garde/garde.reducer';
import { getEntities as getPharmacieGardes } from 'app/entities/pharmacie-garde/pharmacie-garde.reducer';
import { getEntities as getPharmaciens } from 'app/entities/pharmacien/pharmacien.reducer';
import { createEntity, updateEntity } from 'app/entities/pharmacie/pharmacie.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { getPharmacyByPharmacistId } from 'app/entities/pharmaciens/pharmaciens.reducer';

export const PharmacieGuard = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const pharmacie = useAppSelector(state => state.pharmaciens.pharmacie);
  useEffect(() => {
    dispatch(getPharmacyByPharmacistId({ pharmacistId: id }));
  }, []);

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [imageUrl, setImageUrl] = useState<string>('pharma.png');

  const gardes = useAppSelector(state => state.garde.entities);

  const pharmacieEntity = useAppSelector(state => state.pharmaciens.pharmacie);
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);

  const loading = useAppSelector(state => state.pharmaciens.loading);
  const updating = useAppSelector(state => state.pharmacie.updating);
  const updateSuccess = useAppSelector(state => state.pharmacie.updateSuccess);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    navigate(`/pharmacist/${pharmacist.id}/guard` + location.search);
  };

  useEffect(() => {
    dispatch(getGardes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  const myArray = ['1', '2', '', '3'];
  const result = mapIdList(myArray);
  // console.log(result);

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
      ...pharmacieEntity[0],
      ...values,
      // ...gardes,
      gardes: mapIdList(values.gardes),
      // gardes: mapIdList(gardeIds),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const gardeTypes = {
    type1: true,
    type2: false,
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...pharmacieEntity[0],
          zone: pharmacieEntity?.zone?.id,
          // ...gardes,
          // gardes: pharmacieEntity[0]?.gardes?.map(e => e.id.toString()),
          gardes: pharmacieEntity[0]?.gardes?.map(e => e.id.toString()),
          // gardes: pharmacieEntity[0]?.gardes?.map(e => e.id.toString()) || [],
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pharmaAiApp.pharmacie.home.createOrEditLabel" data-cy="PharmacieCreateUpdateHeading">
            Mention a guard
          </h2>
        </Col>
      </Row>
      {pharmacieEntity && gardes ? (
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
                <ValidatedField
                  readOnly
                  label={translate('pharmaAiApp.pharmacie.nom')}
                  id="pharmacie-nom"
                  name="nom"
                  data-cy="nom"
                  type="text"
                />
                <ValidatedField
                  label={translate('pharmaAiApp.pharmacie.garde')}
                  id="pharmacie-garde"
                  data-cy="garde"
                  type="select"
                  multiple
                  name="gardes"
                >
                  {gardes
                    ? gardes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                          {/*{otherEntity.id  ? 'Jour' : 'Nuit'}*/}
                        </option>
                      ))
                    : null}
                </ValidatedField>
                {/*<ValidatedField id="pharmacie-garde" name="gardes" data-cy="garde"*/}
                {/*                label={translate('pharmaAiApp.pharmacie.garde')}*/}
                {/*                type="select">*/}
                {/*    /!*<option value="" key="0"/>*!/*/}
                {/*    {gardes*/}
                {/*        ? Object.entries(gardeTypes).map(([key, value]) => (*/}
                {/*            <option key={key} value={value.toString()}>*/}
                {/*                /!*{value ? 'Jour' : 'Nuit'}*!/*/}
                {/*                {value ? 'Day' : 'Night'}*/}
                {/*            </option>*/}
                {/*        ))*/}
                {/*        : null}*/}
                {/*</ValidatedField>*/}
                <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to={`/pharmacist`} replace color="info">
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
      ) : (
        !loading && <div className="alert alert-warning">No Pharmacy Guard found</div>
      )}
    </div>
  );
};

export default PharmacieGuard;
