import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHospital, faMedkit, faClockRotateLeft, faUserNurse } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPharmacistByUserId } from 'app/entities/pharmaciens/pharmaciens.reducer';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';

// export interface IPharmacistHomeProps {
//   userId: string | number;
// }

const PharmacistHome = () => {
  // const PharmacistHome = (props: IPharmacistHomeProps)  => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  const account = useAppSelector(state => state.authentication.account);

  const loading = useAppSelector(state => state.pharmaciens.loading);
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);
  const [isLoading, setIsLoading] = useState(false);
  const pharmacie = useAppSelector(state => state.pharmaciens.pharmacie);

  // const pharmacie = useAppSelector(state => state.pharmacie.entity);

  // const [userId, setUserId] = useState<number>(account.id);
  // const [userId, setUserId] = useState(props.userId);

  const handleFetch = () => {
    // console.log(zone, ville);
    // console.log(props.userId);
    // console.log(userId);
    // setUserId(account.id);
    // setIsLoading(true);
    if (id) {
      dispatch(getPharmacistByUserId({ userId: id }));
    }
    // dispatch(getPharmacistByUserId({ userId: props.userId }));
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    handleFetch();
  }, []);
  // }, [userId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* <div className="header-body mt-6 mb-5"></div> */}
          {!pharmacist.pharmacie ? (
            <div className="flex-box py-3">
              <Button tag={Link} to="/pharmacie/new" color="danger" size="lg" data-cy="entityDetailsButton">
                <FontAwesomeIcon icon={faEdit} /> <span className="d-none d-md-inline">Create Pharmacy</span>
              </Button>
            </div>
          ) : (
            <>
              <div className="row text-center align-items-center justify-center ">
                <div className="col-xl-6 row-cols-2 py-3">
                  <Button
                    tag={Link}
                    to={`/pharmacist/${account.id}/${pharmacist.id}/profile`}
                    color="info"
                    size="lg"
                    data-cy="entityDetailsButton"
                  >
                    <FontAwesomeIcon icon={faUserNurse} /> <span className="d-none d-md-inline">View Profile</span>
                  </Button>
                </div>

                <div className="col-xl-6 row-cols-2">
                  <Button
                    tag={Link}
                    to={`/pharmacist/${account.id}/${pharmacist.id}/pharmacy`}
                    color="success"
                    size="lg"
                    data-cy="entityDetailsButton"
                  >
                    <FontAwesomeIcon icon={faMedkit} /> <span className="d-none d-md-inline">View Pharmacy</span>
                  </Button>
                </div>
              </div>

              <div className="row text-center align-items-center justify-center ">
                <div className="col-xl-6 row-cols-2 py-3">
                  <Button
                    tag={Link}
                    to={`/pharmacist/${account.id}/${pharmacist.id}/guard`}
                    color="primary"
                    size="lg"
                    data-cy="entityEditButton"
                  >
                    <FontAwesomeIcon icon={faHospital} /> <span className="d-none d-md-inline">Mention a guard</span>
                  </Button>
                </div>

                <div className="col-xl-6 row-cols-2">
                  <Button
                    tag={Link}
                    to={`/pharmacist/${account.id}/${pharmacist.id}/history`}
                    color="secondary"
                    size="lg"
                    data-cy="entityEditButton"
                  >
                    <FontAwesomeIcon icon={faClockRotateLeft} /> <span className="d-none d-md-inline">History of Guard</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PharmacistHome;
