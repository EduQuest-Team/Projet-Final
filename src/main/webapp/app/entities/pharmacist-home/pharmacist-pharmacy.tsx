import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPharmacyByPharmacistId } from 'app/entities/pharmaciens/pharmaciens.reducer';

// import { getEntity } from 'app/entities/pharmacien/pharmacien.reducer';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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

const PharmacistPharmacy = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const loading = useAppSelector(state => state.pharmaciens.loading);

  // const pharmacist = useAppSelector(state => state.pharmacist.entity);
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);
  // const pharmacy = useAppSelector(state => state.pharmacists.pharmacie);
  const pharmacie = useAppSelector(state => state.pharmaciens.pharmacie);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getPharmacyByPharmacistId({ pharmacistId: id }));
  }, []);

  return (
    <div className="container-fluid">
      <div className=""></div>
      <div className="order-xl-1">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="card">
            <div className="card-header border-0">
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0">My Pharmacy</h3>
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
                    <th>View</th>
                  </tr>
                </thead>
                {pharmacist ? (
                  <tbody>
                    {pharmacie.map((pharmacy, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td className="table-user">
                          <b>{pharmacy.id}</b>
                        </td>
                        <td className="table-actions">
                          <span className="font-weight-bold">{pharmacy.nom}</span>
                        </td>
                        <td>
                          <img src={`data:png;base64,${pharmacy.image}`} style={{ maxHeight: '60px' }} alt="img" />
                        </td>
                        <td>
                          <span className="font-weight-bold">{pharmacy.adresse}</span>
                        </td>

                        <td className="table-actions">
                          <a
                            href={`/pharmacie/${pharmacy.id}`}
                            style={{
                              fontSize: '1.3rem',
                            }}
                            className="table-action"
                            data-toggle="tooltip"
                            data-original-title="Edit Pharmacy"
                          >
                            <FontAwesomeIcon icon={faEye} /> <span className="d-none d-md-inline">View Pharmacy</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  !loading && <div className="alert alert-warning">No Pharmacy Profile found</div>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacistPharmacy;
