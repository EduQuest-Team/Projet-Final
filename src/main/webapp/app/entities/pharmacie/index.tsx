import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Pharmacie from './pharmacie';
import PharmacieDetail from './pharmacie-detail';
import PharmacieUpdate from './pharmacie-update';
import PharmacieDeleteDialog from './pharmacie-delete-dialog';
import { PharmacieStatistics } from 'app/entities/pharmacie/pharmacie-statistiques';

const PharmacieRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Pharmacie />} />
    <Route path="new" element={<PharmacieUpdate />} />
    <Route path="statistics" element={<PharmacieStatistics />} />
    <Route path=":id">
      <Route index element={<PharmacieDetail />} />
      <Route path="edit" element={<PharmacieUpdate />} />
      <Route path="delete" element={<PharmacieDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PharmacieRoutes;
