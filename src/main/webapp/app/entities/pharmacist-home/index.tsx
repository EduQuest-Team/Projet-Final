import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import React from 'react';
import { Route } from 'react-router';
import PharmacistProfile from 'app/entities/pharmacist-home/pharmacist-profile';
import PharmacistHome from 'app/entities/pharmacist-home/pharmacist-home';
import PharmacistPharmacy from 'app/entities/pharmacist-home/pharmacist-pharmacy';
import PharmacistGuard from 'app/entities/pharmacist-home/pharmacist-guard';
import PharmacistHistory from 'app/entities/pharmacist-home/pharmacist-history';

const PharmacyRoutes = () => (
  // const account = useAppSelector(state => state.authentication.account);
  // const uId = account.id;

  // return (
  <ErrorBoundaryRoutes>
    <Route index element={<PharmacistHome />} />
    <Route path=":id">
      <Route path="profile" element={<PharmacistProfile />} />
      <Route path="pharmacy" element={<PharmacistPharmacy />} />
      <Route path="guard" element={<PharmacistGuard />} />
      <Route path="history" element={<PharmacistHistory />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PharmacyRoutes;
