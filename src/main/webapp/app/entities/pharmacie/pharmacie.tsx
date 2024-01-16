import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, updateEntity } from './pharmacie.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const Pharmacie = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const pharmacieList = useAppSelector(state => state.pharmacie.entities);
  const loading = useAppSelector(state => state.pharmacie.loading);
  const totalItems = useAppSelector(state => state.pharmacie.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };
  const toggleActive = pharmacie => () => {
    dispatch(
      updateEntity({
        ...pharmacie,
        status: !pharmacie.status,
      }),
    );
  };
  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="pharmacie-heading" data-cy="PharmacieHeading">
        <Translate contentKey="pharmaAiApp.pharmacie.home.title">Pharmacies</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="pharmaAiApp.pharmacie.home.refreshListLabel">Refresh List</Translate>
          </Button>
          {/*<Link to="/pharmacie/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">*/}
          {/*  <FontAwesomeIcon icon="plus" />*/}
          {/*  &nbsp;*/}
          {/*  <Translate contentKey="pharmaAiApp.pharmacie.home.createLabel">Create new Pharmacie</Translate>*/}
          {/*</Link>*/}
        </div>
      </h2>
      <div className="table-responsive">
        {pharmacieList && pharmacieList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.nom">Nom</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('nom')} />
                </th>
                <th className="hand" onClick={sort('adresse')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.adresse">Adresse</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('adresse')} />
                </th>
                <th className="hand" onClick={sort('image')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.image">Image</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
                </th>
                <th className="hand" onClick={sort('latitude')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.latitude">Latitude</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('latitude')} />
                </th>
                <th className="hand" onClick={sort('longitude')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.longitude">Longitude</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('longitude')} />
                </th>

                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="pharmaAiApp.pharmacie.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>

                <th>
                  <Translate contentKey="pharmaAiApp.pharmacie.zone">Zone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="pharmaAiApp.pharmacie.garde">Garde</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pharmacieList.map((pharmacie, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/pharmacie/${pharmacie.id}`} color="link" size="sm">
                      {pharmacie.id}
                    </Button>
                  </td>
                  <td>{pharmacie.nom}</td>
                  <td>{pharmacie.adresse}</td>
                  <td>
                    <img src={`data:image/jpeg;base64,${pharmacie.image}`} alt="PharmaImg" width="100px" height="100px" />
                  </td>

                  <td>{pharmacie.latitude}</td>
                  <td>{pharmacie.longitude}</td>
                  {/*<td>{pharmacie.status ? 'true' : 'false'}</td>*/}
                  <td>
                    {pharmacie.status ? (
                      <Button color="success" onClick={toggleActive(pharmacie)}>
                        {/*<Translate contentKey="pharmaAiApp.pharmacie.activated">True</Translate>*/}
                        {/*{pharmacie.status}*/}
                        Activated
                      </Button>
                    ) : (
                      <Button color="danger" onClick={toggleActive(pharmacie)}>
                        {/*<Translate contentKey="pharmaAiApp.pharmacie.deactivated">False</Translate>*/}
                        {/*{pharmacie.status}*/}
                        Desactivated
                      </Button>
                    )}
                  </td>
                  <td>{pharmacie.zone ? <Link to={`/zone/${pharmacie.zone.id}`}>{pharmacie.zone.id}</Link> : ''}</td>
                  <td>
                    {pharmacie.gardes ? (
                      <Link to={`/garde/${pharmacie.gardes.id}`}>
                        {pharmacie.gardes.map((val, i) => (
                          <span key={val.id}>
                            {val.id == 1 && 'Day'}
                            {val.id == 2 && 'Night'}
                            {pharmacie.gardes && i === pharmacie.gardes.length - 1 ? '' : ', '}
                          </span>
                        ))}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/pharmacie/${pharmacie.id}`} color="primary" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {/*<Button*/}
                      {/*  tag={Link}*/}
                      {/*  to={`/pharmacie/${pharmacie.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}*/}
                      {/*  color="primary"*/}
                      {/*  size="sm"*/}
                      {/*  data-cy="entityEditButton"*/}
                      {/*>*/}
                      {/*  <FontAwesomeIcon icon="pencil-alt" />{' '}*/}
                      {/*  <span className="d-none d-md-inline">*/}
                      {/*    <Translate contentKey="entity.action.edit">Edit</Translate>*/}
                      {/*  </span>*/}
                      {/*</Button>*/}
                      {/*<Button*/}
                      {/*  onClick={() =>*/}
                      {/*    (window.location.href = `/pharmacie/${pharmacie.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)*/}
                      {/*  }*/}
                      {/*  color="danger"*/}
                      {/*  size="sm"*/}
                      {/*  data-cy="entityDeleteButton"*/}
                      {/*>*/}
                      {/*  <FontAwesomeIcon icon="trash" />{' '}*/}
                      {/*  <span className="d-none d-md-inline">*/}
                      {/*    <Translate contentKey="entity.action.delete">Delete</Translate>*/}
                      {/*  </span>*/}
                      {/*</Button>*/}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="pharmaAiApp.pharmacie.home.notFound">No Pharmacies found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={pharmacieList && pharmacieList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pharmacie;
