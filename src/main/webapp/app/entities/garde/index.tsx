import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Garde from './garde';
import GardeDetail from './garde-detail';
import GardeUpdate from './garde-update';
import GardeDeleteDialog from './garde-delete-dialog';

const GardeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Garde />} />
    <Route path="new" element={<GardeUpdate />} />
    <Route path=":id">
      <Route index element={<GardeDetail />} />
      <Route path="edit" element={<GardeUpdate />} />
      <Route path="delete" element={<GardeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GardeRoutes;
