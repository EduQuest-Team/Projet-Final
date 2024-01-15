import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import React from 'react';
import { Route } from 'react-router';
import Pharmacy from './pharmacy';
import { useAppSelector } from 'app/config/store';
import PharmacieDetail from 'app/entities/pharmacie/pharmacie-detail';
import PharmacieUpdate from 'app/entities/pharmacie/pharmacie-update';
import PharmacieDeleteDialog from 'app/entities/pharmacie/pharmacie-delete-dialog';

const PharmacyRoutes = () => (
  // const account = useAppSelector(state => state.authentication.account);
  // const uId = account.id;

  // return (
  <ErrorBoundaryRoutes>
    <Route path=":id">
      <Route index element={<Pharmacy />} />
      <Route path="pharmacy" element={<Pharmacy />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PharmacyRoutes;
