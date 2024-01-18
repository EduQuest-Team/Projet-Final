import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPharmacistByUserId } from 'app/entities/pharmaciens/pharmaciens.reducer';

const PharmacistHome = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const account = useAppSelector(state => state.authentication.account);

  const loading = useAppSelector(state => state.pharmaciens.loading);
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const pharmacie = useAppSelector(state => state.pharmacie.entity);

  // const [userId, setUserId] = useState<number>(account.id);
  const [userId, setUserId] = useState(account.id);

  const handleFetch = () => {
    // console.log(zone, ville);
    // console.log(userId);
    setUserId(account.id);
    setIsLoading(true);
    setCompleted(false);
    // dispatch(getPharmacistByUserId({ userId: userId }));
    dispatch(getPharmacistByUserId(userId));
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      setCompleted(true);
    }
  }, [loading]);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <div className="header-body mt-6 mb-5"></div>
      {!pharmacist.pharmacie ? (
        <div className="flex-box py-3">
          <Button tag={Link} to={`/pharmacie/new`} color="danger" size="lg" data-cy="entityDetailsButton">
            <FontAwesomeIcon icon="person" /> <span className="d-none d-md-inline">Create Pharmacy</span>
          </Button>
        </div>
      ) : (
        <>
          <div className="row text-center align-items-center justify-center ">
            <div className="col-xl-6 row-cols-2 py-3">
              <Button tag={Link} to={`/pharmacist/${pharmacist.id}/profile`} color="info" size="lg" data-cy="entityDetailsButton">
                <FontAwesomeIcon icon="pray" /> <span className="d-none d-md-inline">View Profile</span>
              </Button>
            </div>

            <div className="col-xl-6 row-cols-2">
              <Button tag={Link} to={`/pharmacist/${pharmacist.id}/pharmacy`} color="success" size="lg" data-cy="entityDetailsButton">
                <FontAwesomeIcon icon="person" /> <span className="d-none d-md-inline">View Pharmacy</span>
              </Button>
            </div>
          </div>

          <div className="row text-center align-items-center justify-center ">
            <div className="col-xl-6 row-cols-2 py-3">
              <Button tag={Link} to={`/pharmacist/${pharmacist.id}/guard`} color="primary" size="lg" data-cy="entityEditButton">
                <FontAwesomeIcon icon="commenting" /> <span className="d-none d-md-inline">Mention a guard</span>
              </Button>
            </div>

            <div className="col-xl-6 row-cols-2">
              <Button tag={Link} to={`/pharmacist/${pharmacist.id}/history`} color="secondary" size="lg" data-cy="entityEditButton">
                <FontAwesomeIcon icon="history" /> <span className="d-none d-md-inline">History of Guard</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PharmacistHome;
