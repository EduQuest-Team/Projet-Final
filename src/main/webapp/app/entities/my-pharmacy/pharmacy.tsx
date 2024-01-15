import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

// import {getEntity} from 'app/entities/pharmacist/pharmacist.reducer';

// import {getEntities, getEntity, updateEntity} from './pharmacy.reducer';
// import {getEntities, updateEntity} from './pharmacy.reducer';
// import {getEntities, updateEntity} from './pharmacy.reducer';
// import {getPharmacien, getPharmacyByPharmacienId} from "app/entities/pharmacien/pharmacien.reducer";
import { useStateManager } from 'react-select';
// import {getPharmacyByUserId} from "app/entities/pharmaciens/pharmaciens.reducer";
// import {getPharmacist} from "app/entities/my-pharmacy/pharmacy.reducer";
import { getSession } from 'app/shared/reducers/authentication';
import { reset } from 'app/modules/account/settings/settings.reducer';
// import {getEntity} from 'app/entities/pharmacien/pharmacien.reducer';
import { getPharmacyByUserId } from 'app/entities/pharmaciens/pharmaciens.reducer';

const Pharmacy = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  // const pharmacieEntity = useAppSelector(state => state.pharmacie.entity);
  // const pharmacistEntity = useAppSelector(state => state.pharmacist.entity);

  // const pharmacieList = useAppSelector(state => state.pharmacy.entities);
  // const loading = useAppSelector(state => state.pharmacy.loading);
  // const totalItems = useAppSelector(state => state.pharmacy.totalItems);
  const account = useAppSelector(state => state.authentication.account);

  // const pharmacist = useAppSelector(state => state.pharmacist.entity);

  const loading = useAppSelector(state => state.pharmaciens.loading);
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);

  // const uId = account.id;
  const userId = account?.id;
  console.log('UserId:', userId);

  // console.log(uId);
  // const [pharmacistId, setPharmacistId] = useState<number>(pId);

  const { id } = useParams<'id'>();
  useEffect(() => {
    // dispatch(getPharmacyByUserId(uId));
    // const uId = account.id;
    const userId = account?.id;

    // dispatch(getPharmacyByUserId(userId));
    if (userId) {
      dispatch(getPharmacyByUserId(userId));
    }
    // dispatch(getEntity(pharmacistId));
    // dispatch(getPharmacyByPharmacienId({pharmacistId: pharmacistId}));
  }, []);

  // useEffect(() => {
  //     dispatch(getSession());
  //     return () => {
  //         dispatch(reset());
  //     };
  // }, []);
  const staticId = 1;
  // const staticId = account.id;
  // const staticId = pharmacieEntity.id;
  // const pharmacistId = 1500;
  // const getAllEntities = () => {
  // dispatch(
  //     getEntities({
  //         page: paginationState.activePage - 1,
  //         size: paginationState.itemsPerPage,
  //         sort: `${paginationState.sort},${paginationState.order}`,
  //     }),
  // );
  // dispatch(getEntity(id));
  // };

  // useEffect(() => {
  //     dispatch(getEntity(pharmacistId));
  //     dispatch(getPharmacyByPharmacienId({pharmacistId: pharmacistId}));
  // }, []);

  // const sortEntities = () => {
  //     getAllEntities();
  //     const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
  //     if (pageLocation.search !== endURL) {
  //         navigate(`${pageLocation.pathname}${endURL}`);
  //     }
  // };

  // useEffect(() => {
  //     sortEntities();
  // }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  // useEffect(() => {
  //     const params = new URLSearchParams(pageLocation.search);
  //     const page = params.get('page');
  //     const sort = params.get(SORT);
  //     if (page && sort) {
  //         const sortSplit = sort.split(',');
  //         setPaginationState({
  //             ...paginationState,
  //             activePage: +page,
  //             sort: sortSplit[0],
  //             order: sortSplit[1],
  //         });
  //     }
  // }, [pageLocation.search]);

  // const sort = p => () => {
  //     setPaginationState({
  //         ...paginationState,
  //         order: paginationState.order === ASC ? DESC : ASC,
  //         sort: p,
  //     });
  // };
  //
  // const handlePagination = currentPage =>
  //     setPaginationState({
  //         ...paginationState,
  //         activePage: currentPage,
  //     });
  //
  // const handleSyncList = () => {
  //     sortEntities();
  // };
  //
  // const getSortIconByFieldName = (fieldName: string) => {
  //     const sortFieldName = paginationState.sort;
  //     const order = paginationState.order;
  //     if (sortFieldName !== fieldName) {
  //         return faSort;
  //     } else {
  //         return order === ASC ? faSortUp : faSortDown;
  //     }
  // };

  return (
    <div>
      <h2 id="settings-title">
        Pharmacist settings for {account.login} {account.id}
      </h2>
      <div className="order-xl-2">
        <div className="card card-profile">
          <img
            src="/content/images/uploads/banner.jpg"
            height="240px"
            width="1080px"
            alt="Image placeholder"
            className="float-center rounded mx-auto d-block"
          />
          <div className="row justify-content-center">
            <div className="col-lg-3 order-lg-2">
              <div className="card-profile-image">
                <a href="#">
                  {pharmacist.user?.imageUrl ? (
                    <img src={`/content/images/uploads/${pharmacist.user?.imageUrl}`} className="rounded-circle" />
                  ) : (
                    <img src={`/content/images/uploads/pharmacist.png`} className="rounded-circle" />
                  )}
                </a>
              </div>
            </div>
          </div>
          <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span className="heading">{pharmacist.nom}</span>
                    <span className="description">Nom</span>
                  </div>
                  <div>
                    <span className="heading">{pharmacist.prenom}</span>
                    <span className="description">Prenom</span>
                  </div>
                  {/*<div>*/}
                  {/*    <span className="heading">{formatInstantString(pharmacist.user?.createdDate)}</span>*/}
                  {/*    /!*<span className="heading">{pharmacist.email}</span>*!/*/}
                  {/*    /!*<span className="description">Email</span>*!/*/}
                  {/*    <span className="description">Created Date</span>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
            <div className="text-center">
              <h5 className="h3">{`${pharmacist.user?.firstName} ${pharmacist.user?.lastName}`}</h5>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2"></i>
                {pharmacist.user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<h2 id="pharmacie-heading" data-cy="PharmacieHeading">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.home.title">Pharmacies</Translate>*/}
      {/*    <div className="d-flex justify-content-end">*/}
      {/*        <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>*/}
      {/*            <FontAwesomeIcon icon="sync" spin={loading}/>{' '}*/}
      {/*            <Translate contentKey="pharmaAiApp.pharmacie.home.refreshListLabel">Refresh List</Translate>*/}
      {/*        </Button>*/}
      {/*        <Link to="/pharmacie/new" className="btn btn-primary jh-create-entity" id="jh-create-entity"*/}
      {/*              data-cy="entityCreateButton">*/}
      {/*            <FontAwesomeIcon icon="plus"/>*/}
      {/*            &nbsp;*/}
      {/*            <Translate contentKey="pharmaAiApp.pharmacie.home.createLabel">Create new Pharmacie</Translate>*/}
      {/*        </Link>*/}
      {/*    </div>*/}
      {/*</h2>*/}
      {/*<div className="table-responsive">*/}
      {/*    {pharmacieList && pharmacieList.length > 0 ? (*/}
      {/*        <Table responsive>*/}
      {/*            <thead>*/}
      {/*            <tr>*/}
      {/*                <th className="hand" onClick={sort('id')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.id">ID</Translate> <FontAwesomeIcon*/}
      {/*                    icon={getSortIconByFieldName('id')}/>*/}
      {/*                </th>*/}
      {/*                <th className="hand" onClick={sort('nom')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.nom">Nom</Translate> <FontAwesomeIcon*/}
      {/*                    icon={getSortIconByFieldName('nom')}/>*/}
      {/*                </th>*/}
      {/*                <th className="hand" onClick={sort('adresse')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.adresse">Adresse</Translate>{' '}*/}
      {/*                    <FontAwesomeIcon icon={getSortIconByFieldName('adresse')}/>*/}
      {/*                </th>*/}
      {/*                <th className="hand" onClick={sort('image')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.image">Image</Translate>{' '}*/}
      {/*                    <FontAwesomeIcon icon={getSortIconByFieldName('image')}/>*/}
      {/*                </th>*/}
      {/*                <th className="hand" onClick={sort('latitude')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.latitude">Latitude</Translate>{' '}*/}
      {/*                    <FontAwesomeIcon icon={getSortIconByFieldName('latitude')}/>*/}
      {/*                </th>*/}
      {/*                <th className="hand" onClick={sort('longitude')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.longitude">Longitude</Translate>{' '}*/}
      {/*                    <FontAwesomeIcon icon={getSortIconByFieldName('longitude')}/>*/}
      {/*                </th>*/}
      {/*                <th className="hand" onClick={sort('status')}>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.status">Status</Translate>{' '}*/}
      {/*                    <FontAwesomeIcon icon={getSortIconByFieldName('status')}/>*/}
      {/*                </th>*/}
      {/*                <th>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.zone">Zone</Translate> <FontAwesomeIcon*/}
      {/*                    icon="sort"/>*/}
      {/*                </th>*/}
      {/*                <th>*/}
      {/*                    <Translate contentKey="pharmaAiApp.pharmacie.garde">Garde</Translate>*/}
      {/*                    <FontAwesomeIcon icon="sort"/>*/}
      {/*                </th>*/}
      {/*                <th/>*/}
      {/*            </tr>*/}
      {/*            </thead>*/}
      {/*            <tbody>*/}
      {/*            {pharmacieList.map((pharmacie, i) => (*/}
      {/*                <tr key={`entity-${i}`} data-cy="entityTable">*/}
      {/*                    <td>*/}
      {/*                        <Button tag={Link} to={`/pharmacie/${pharmacie.id}`} color="link" size="sm">*/}
      {/*                            {pharmacie.id}*/}
      {/*                        </Button>*/}
      {/*                    </td>*/}
      {/*                    <td>{pharmacie.nom}</td>*/}
      {/*                    <td>{pharmacie.adresse}</td>*/}
      {/*                    <td>*/}
      {/*                        <img src={`data:image/jpeg;base64,${pharmacie.image}`} alt="PharmaImg" width="100px"*/}
      {/*                             height="100px"/>*/}
      {/*                    </td>*/}

      {/*                    <td>{pharmacie.latitude}</td>*/}
      {/*                    <td>{pharmacie.longitude}</td>*/}
      {/*                    /!*<td>{pharmacie.status ? 'true' : 'false'}</td>*!/*/}
      {/*                    <td>*/}
      {/*                        {pharmacie.status ? (*/}
      {/*                            <Button color="success">*/}
      {/*                                /!*<Translate contentKey="pharmaAiApp.pharmacie.activated">True</Translate>*!/*/}
      {/*                                /!*{pharmacie.status}*!/*/}
      {/*                                Activated*/}
      {/*                            </Button>*/}
      {/*                        ) : (*/}
      {/*                            <Button color="danger">*/}
      {/*                                /!*<Translate contentKey="pharmaAiApp.pharmacie.deactivated">False</Translate>*!/*/}
      {/*                                /!*{pharmacie.status}*!/*/}
      {/*                                Desactivated*/}
      {/*                            </Button>*/}
      {/*                        )}*/}
      {/*                    </td>*/}
      {/*                    <td>{pharmacie.zone ?*/}
      {/*                        <Link to={`/zone/${pharmacie.zone.id}`}>{pharmacie.zone.id}</Link> : ''}</td>*/}
      {/*                    <td>*/}
      {/*                        {pharmacie.gardes ? (*/}
      {/*                            <Link to={`/garde/${pharmacie.gardes.id}`}>*/}
      {/*                                {pharmacie.gardes.map((val, i) => (*/}
      {/*                                    <span key={val.id}>*/}
      {/*                {val.id == 1 && 'Day'}*/}
      {/*                                        {val.id == 2 && 'Night'}*/}
      {/*                                        {pharmacie.gardes && i === pharmacie.gardes.length - 1 ? '' : ', '}*/}
      {/*              </span>*/}
      {/*                                ))}*/}
      {/*                            </Link>*/}
      {/*                        ) : (*/}
      {/*                            ''*/}
      {/*                        )}*/}
      {/*                    </td>*/}
      {/*                    <td className="text-end">*/}
      {/*                        <div className="btn-group flex-btn-group-container">*/}
      {/*                            <Button tag={Link} to={`/pharmacie/${pharmacie.id}`} color="info" size="sm"*/}
      {/*                                    data-cy="entityDetailsButton">*/}
      {/*                                <FontAwesomeIcon icon="eye"/>{' '}*/}
      {/*                                <span className="d-none d-md-inline">*/}
      {/*              <Translate contentKey="entity.action.view">View</Translate>*/}
      {/*            </span>*/}
      {/*                            </Button>*/}
      {/*                            <Button*/}
      {/*                                tag={Link}*/}
      {/*                                to={`/pharmacie/${pharmacie.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}*/}
      {/*                                color="primary"*/}
      {/*                                size="sm"*/}
      {/*                                data-cy="entityEditButton"*/}
      {/*                            >*/}
      {/*                                <FontAwesomeIcon icon="pencil-alt"/>{' '}*/}
      {/*                                <span className="d-none d-md-inline">*/}
      {/*              <Translate contentKey="entity.action.edit">Edit</Translate>*/}
      {/*            </span>*/}
      {/*                            </Button>*/}
      {/*                        </div>*/}
      {/*                    </td>*/}
      {/*                </tr>*/}
      {/*            ))}*/}
      {/*            </tbody>*/}
      {/*        </Table>*/}
      {/*    ) : (*/}
      {/*        !loading && (*/}
      {/*            <div className="alert alert-warning">*/}
      {/*                <Translate contentKey="pharmaAiApp.pharmacie.home.notFound">No Pharmacies found</Translate>*/}
      {/*            </div>*/}
      {/*        )*/}
      {/*    )}*/}
      {/*</div>*/}
      {/*{totalItems ? (*/}
      {/*    <div className={pharmacieList && pharmacieList.length > 0 ? '' : 'd-none'}>*/}
      {/*        <div className="justify-content-center d-flex">*/}
      {/*            <JhiItemCount page={paginationState.activePage} total={totalItems}*/}
      {/*                          itemsPerPage={paginationState.itemsPerPage} i18nEnabled/>*/}
      {/*        </div>*/}
      {/*        <div className="justify-content-center d-flex">*/}
      {/*            <JhiPagination*/}
      {/*                activePage={paginationState.activePage}*/}
      {/*                onSelect={handlePagination}*/}
      {/*                maxButtons={5}*/}
      {/*                itemsPerPage={paginationState.itemsPerPage}*/}
      {/*                totalItems={totalItems}*/}
      {/*            />*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*) : (*/}
      {/*    ''*/}
      {/*)}*/}
      {/*<Row>*/}
      {/*    <Col md="8">*/}
      {/*        <h2 data-cy="pharmacieDetailsHeading">*/}
      {/*            <Translate contentKey="pharmaAiApp.pharmacie.detail.title">Pharmacie</Translate>*/}
      {/*        </h2>*/}
      {/*        <dl className="jh-entity-details">*/}
      {/*            <dt>*/}
      {/*  <span id="id">*/}
      {/*    <Translate contentKey="global.field.id">ID</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.id}</dd>*/}
      {/*            <dt>*/}
      {/*  <span id="nom">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.nom">Nom</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.nom}</dd>*/}
      {/*            <dt>*/}
      {/*  <span id="adresse">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.adresse">Adresse</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.adresse}</dd>*/}
      {/*            <dt>*/}
      {/*  <span id="image">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.image">Image</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            /!*<dd>{pharmacieEntity.image}</dd>*!/*/}
      {/*            <img alt="PharmaImage" src={`data:image/jpeg;base64,${pharmacieEntity.image}`}*/}
      {/*                 style={{maxHeight: '120px'}}/>*/}
      {/*            <dt>*/}
      {/*  <span id="latitude">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.latitude">Latitude</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.latitude}</dd>*/}
      {/*            <dt>*/}
      {/*  <span id="longitude">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.longitude">Longitude</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.longitude}</dd>*/}
      {/*            <dt>*/}
      {/*  <span id="status">*/}
      {/*    <Translate contentKey="pharmaAiApp.pharmacie.status">Status</Translate>*/}
      {/*  </span>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.status ? 'Activated' : 'Desactivated'}</dd>*/}
      {/*            <dt>*/}
      {/*                <Translate contentKey="pharmaAiApp.pharmacie.zone">Zone</Translate>*/}
      {/*            </dt>*/}
      {/*            <dd>{pharmacieEntity.zone ? pharmacieEntity.zone.id : ''}</dd>*/}
      {/*            <dt>*/}
      {/*                <Translate contentKey="pharmaAiApp.pharmacie.garde">Garde</Translate>*/}
      {/*            </dt>*/}
      {/*            <dd>*/}
      {/*                {pharmacieEntity.gardes*/}
      {/*                    ? pharmacieEntity.gardes.map((val, i) => (*/}
      {/*                        <span key={val.id}>*/}
      {/*          /!*<a>{val.id}</a> &nbsp;*!/*/}
      {/*                            {val.id == 1 && 'Day'}*/}
      {/*                            {val.id == 2 && 'Night'}*/}
      {/*                            /!*<a>{val.type}</a>*!/*/}
      {/*                            {pharmacieEntity.gardes && i === pharmacieEntity.gardes.length - 1 ? '' : ', '}*/}
      {/*        </span>*/}
      {/*                    ))*/}
      {/*                    : null}*/}
      {/*            </dd>*/}
      {/*        </dl>*/}
      {/*        <Button tag={Link} to="/pharmacie" replace color="info" data-cy="entityDetailsBackButton">*/}
      {/*            <FontAwesomeIcon icon="arrow-left"/>{' '}*/}
      {/*            <span className="d-none d-md-inline">*/}
      {/*  <Translate contentKey="entity.action.back">Back</Translate>*/}
      {/*</span>*/}
      {/*        </Button>*/}
      {/*        &nbsp;*/}
      {/*        <Button tag={Link} to={`/pharmacie/${pharmacieEntity.id}/edit`} replace color="primary">*/}
      {/*            <FontAwesomeIcon icon="pencil-alt"/>{' '}*/}
      {/*            <span className="d-none d-md-inline">*/}
      {/*  <Translate contentKey="entity.action.edit">Edit</Translate>*/}
      {/*</span>*/}
      {/*        </Button>*/}
      {/*    </Col>*/}
      {/*</Row>*/}
    </div>
  );
};

export default Pharmacy;
