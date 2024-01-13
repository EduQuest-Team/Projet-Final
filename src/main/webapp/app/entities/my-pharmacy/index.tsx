import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import React from 'react';
import { Route } from 'react-router';
import Pharmacy from './pharmacy';

const PharmacyRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Pharmacy />} />
  </ErrorBoundaryRoutes>
);

export default PharmacyRoutes;
