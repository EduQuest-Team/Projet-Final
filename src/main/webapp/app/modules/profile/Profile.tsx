import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPharmaciens, getPharmacyByPharmacistId } from 'app/entities/pharmaciens/pharmaciens.reducer';

import { getEntity } from 'app/entities/pharmacien/pharmacien.reducer';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { format } from 'date-fns';

function formatDateString(inputDateString: string): string {
  const dateObject = new Date(inputDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return dateObject.toLocaleString('en-US', options);
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
// function formatInstantString(inputInstant: string): string {
//   const currentInstant = new Date(inputInstant);
//
//   const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   };
//   // Format the date string using date-fns
//   // const formattedString = format(currentInstant, 'yyyy-MM-dd HH:mm:ss');
//   const formattedString = format(currentInstant, 'yyyy-MM-dd HH:mm:ss');
//   return currentInstant.toLocaleString('en-US', options);
// }

function formatInstantString(inputInstant: string): string {
  const currentInstant = new Date(inputInstant);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  // console.log(inputInstant)
  // console.log(currentInstant,options)
  // console.log(currentInstant.toLocaleString('en-US', options))

  return currentInstant.toLocaleString('en-US', options);
}

const Profile = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const loading = useAppSelector(state => state.pharmaciens.loading);

  const pharmacien = useAppSelector(state => state.pharmacien.entity);
  const pharmacy = useAppSelector(state => state.pharmaciens.pharmacie);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getEntity(id));
      dispatch(getPharmacyByPharmacistId({ pharmacistId: id }));
    }
  }, [id, dispatch, getEntity, getPharmacyByPharmacistId]);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      // setCompleted(true);
    }
  }, [loading]);

  return (
    <div className="container-fluid">
      <div className="">
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
                    {pharmacien.user?.imageUrl ? (
                      <img src={`/content/images/uploads/${pharmacien.user?.imageUrl}`} className="rounded-circle" alt="userImg" />
                    ) : (
                      <img src={`/content/images/uploads/pharmacist.png`} className="rounded-circle" alt="userImg" />
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
                      <span className="heading">{pharmacien.nom}</span>
                      <span className="description">Nom</span>
                    </div>
                    <div>
                      <span className="heading">{pharmacien.prenom}</span>
                      <span className="description">Prenom</span>
                    </div>
                    <div>
                      <span className="heading">{formatInstantString(pharmacien.user?.createdDate)}</span>
                      {/*<span className="heading">{pharmacien.email}</span>*/}
                      {/*<span className="description">Email</span>*/}
                      <span className="description">Created Date</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h5 className="h3">{`${pharmacien.user?.firstName} ${pharmacien.user?.lastName}`}</h5>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2"></i>
                  {pharmacien.user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-xl-1">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="card">
              <div className="card-header border-0">
                <div className="row">
                  <div className="col-6">
                    <h3 className="mb-0">List of Pharmacies</h3>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>Id</th>
                      <th>Nom</th>
                      <th>Image</th>
                      <th>Adresse</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pharmacy.map((pharmacie, i) => (
                      <tr key={i}>
                        <td className="table-user">
                          <b>{pharmacie.id}</b>
                        </td>
                        <td className="table-actions">
                          <span className="font-weight-bold">{pharmacie.nom}</span>
                        </td>
                        <td>
                          <img src={`data:png;base64,${pharmacie.image}`} style={{ maxHeight: '60px' }} alt="img" />
                        </td>
                        <td>
                          <span className="font-weight-bold">{pharmacie.adresse}</span>
                        </td>

                        <td className="table-actions">
                          <a
                            href={`/pharmacie/${pharmacie.id}`}
                            style={{
                              fontSize: '1.3rem',
                            }}
                            className="table-action"
                            data-toggle="tooltip"
                            data-original-title="Edit Pharmacy"
                          >
                            <FontAwesomeIcon icon={faEye} /> <span className="d-none d-md-inline">View Pharmacy</span>
                            {/* <i className="fas fa-user-edit"></i> */}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
