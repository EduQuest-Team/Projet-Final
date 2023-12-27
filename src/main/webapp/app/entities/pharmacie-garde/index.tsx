import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PharmacieGarde from './pharmacie-garde';
import PharmacieGardeDetail from './pharmacie-garde-detail';
import PharmacieGardeUpdate from './pharmacie-garde-update';
import PharmacieGardeDeleteDialog from './pharmacie-garde-delete-dialog';

const PharmacieGardeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PharmacieGarde />} />
    <Route path="new" element={<PharmacieGardeUpdate />} />
    <Route path=":id">
      <Route index element={<PharmacieGardeDetail />} />
      <Route path="edit" element={<PharmacieGardeUpdate />} />
      <Route path="delete" element={<PharmacieGardeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PharmacieGardeRoutes;
