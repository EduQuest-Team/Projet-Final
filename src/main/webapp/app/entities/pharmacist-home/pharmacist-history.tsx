import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getPharmacyGuard } from './pharmacist.reducer';

export const PharmacieGarde = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const pharmacieGardeList = useAppSelector(state => state.pharmacieGarde.entities);
  const pharmacyGardeList = useAppSelector(state => state.pharmacyGarde.pharmacieGuard);
  const gardes = useAppSelector(state => state.garde.entity);
  const loading = useAppSelector(state => state.pharmacieGarde.loading);
  const { id } = useParams<'id'>();
  const pharmacie = useAppSelector(state => state.pharmaciens.pharmacie);

  const getAllEntities = () => {
    if (pharmacie) {
      dispatch(
        getPharmacyGuard(1),
        // getPharmacyGuard(pharmacie[0].id),
        // getPharmacyGuard(id),
      );
    }
    // dispatch(
    //     getPharmacyGuard(pharmacie[0].id),
    //     // getPharmacyGuard(id),
    // );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="pharmacie-garde-heading" data-cy="PharmacieGardeHeading">
        <Translate contentKey="pharmaAiApp.pharmacieGarde.home.title">Historique Pharmacies & Gardes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="pharmaAiApp.pharmacieGarde.home.refreshListLabel">Refresh List</Translate>
          </Button>
          {/*<Link to="/pharmacie-garde/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">*/}
          {/*  <FontAwesomeIcon icon="plus" />*/}
          {/*  &nbsp;*/}
          {/*  <Translate contentKey="pharmaAiApp.pharmacieGarde.home.createLabel">Create new Pharmacie Garde</Translate>*/}
          {/*</Link>*/}
        </div>
      </h2>
      <div className="table-responsive">
        {pharmacyGardeList && pharmacyGardeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="pharmaAiApp.pharmacieGarde.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('dateDebut')}>
                  <Translate contentKey="pharmaAiApp.pharmacieGarde.dateDebut">Date Debut</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateDebut')} />
                </th>
                <th className="hand" onClick={sort('dateFin')}>
                  <Translate contentKey="pharmaAiApp.pharmacieGarde.dateFin">Date Fin</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateFin')} />
                </th>

                <th>
                  <Translate contentKey="pharmaAiApp.pharmacieGarde.garde">Garde</Translate>
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>

            <tbody>
              {pharmacyGardeList.map((pharmacieGarde, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/pharmacie-garde/${pharmacieGarde.id}`} color="link" size="sm">
                      {pharmacieGarde.id}
                    </Button>
                  </td>
                  <td>
                    {pharmacieGarde.dateDebut ? (
                      <TextFormat type="date" value={pharmacieGarde.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {pharmacieGarde.dateFin ? (
                      <TextFormat type="date" value={pharmacieGarde.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>

                  <td>
                    {pharmacieGarde.gardes ? 'Day' : 'Night'}
                    {/*          {pharmacieGarde.gardes*/}
                    {/*              ? pharmacieGarde.gardes.map((val, j) => (*/}
                    {/*                  <span key={j}>*/}
                    {/*  <Link to={`/garde/${val.id}`}>*/}
                    {/*      /!*{val.type ? 'Day' : 'Night'}*!/*/}
                    {/*      {val.id ? 'Day' : 'Night'}*/}
                    {/*      /!*{val.id ? 'Day' : 'Night'}*!/*/}
                    {/*  </Link>*/}
                    {/*                      {j === pharmacieGarde.gardes.length - 1 ? '' : ', '}*/}
                    {/*</span>*/}
                    {/*              ))*/}
                    {/*              : null}*/}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/pharmacie-garde/${pharmacieGarde.id}`}
                        color="primary"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {/*<Button*/}
                      {/*  tag={Link}*/}
                      {/*  to={`/pharmacie-garde/${pharmacieGarde.id}/edit`}*/}
                      {/*  color="primary"*/}
                      {/*  size="sm"*/}
                      {/*  data-cy="entityEditButton"*/}
                      {/*>*/}
                      {/*  <FontAwesomeIcon icon="pencil-alt" />{' '}*/}
                      {/*  <span className="d-none d-md-inline">*/}
                      {/*    <Translate contentKey="entity.action.edit">Edit</Translate>*/}
                      {/*  </span>*/}
                      {/*</Button>*/}
                      <Button
                        onClick={() => (window.location.href = `/pharmacie-garde/${pharmacieGarde.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No History Gardes found</div>
        )}
      </div>
    </div>
  );
};

export default PharmacieGarde;
