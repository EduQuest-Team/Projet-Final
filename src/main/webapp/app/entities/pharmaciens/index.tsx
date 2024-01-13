import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import React from 'react';
import { Route } from 'react-router';
import Pharmaciens from './pharmaciens';

const PharmaciensRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Pharmaciens />} />
  </ErrorBoundaryRoutes>
);

export default PharmaciensRoutes;
