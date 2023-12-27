import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Pharmacien from './pharmacien';
import PharmacienDetail from './pharmacien-detail';
import PharmacienUpdate from './pharmacien-update';
import PharmacienDeleteDialog from './pharmacien-delete-dialog';

const PharmacienRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Pharmacien />} />
    <Route path="new" element={<PharmacienUpdate />} />
    <Route path=":id">
      <Route index element={<PharmacienDetail />} />
      <Route path="edit" element={<PharmacienUpdate />} />
      <Route path="delete" element={<PharmacienDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PharmacienRoutes;
