import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPharmacyByPharmacistId } from 'app/entities/pharmaciens/pharmaciens.reducer';

import { getEntity } from 'app/entities/pharmacien/pharmacien.reducer';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import { Translate } from 'react-jhipster';

function formatDateString(inputDateString: string): string {
  const dateObject = new Date(inputDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return dateObject.toLocaleString('en-US', options);
}

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

  return currentInstant.toLocaleString('en-US', options);
}

const PharmacistProfile = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const loading = useAppSelector(state => state.pharmaciens.loading);

  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getPharmacyByPharmacistId({ pharmacistId: id }));
  }, []);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  return (
    <div className="container-fluid">
      <div className="order-xl-2">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="card card-profile">
            <img
              src="/content/images/uploads/banner.jpg"
              height="240px"
              width="1080px"
              alt="Image placeholder"
              className="float-center rounded mx-auto d-block"
            />
            {pharmacist ? (
              <>
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
                        <div>
                          <span className="heading">{formatInstantString(pharmacist.user?.createdDate)}</span>
                          {/*<span className="heading">{pharmacist.email}</span>*/}
                          {/*<span className="description">Email</span>*/}
                          <span className="description">Created Date</span>
                        </div>
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
              </>
            ) : (
              !loading && <div className="alert alert-warning">No Pharmacist Profile found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacistProfile;
