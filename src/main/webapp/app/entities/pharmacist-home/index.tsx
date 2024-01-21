import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import PharmacistProfile from 'app/entities/pharmacist-home/pharmacist-profile';
import PharmacistHome from 'app/entities/pharmacist-home/pharmacist-home';
import PharmacistPharmacy from 'app/entities/pharmacist-home/pharmacist-pharmacy';
import PharmacistGuard from 'app/entities/pharmacist-home/pharmacist-guard';
import PharmacistHistory from 'app/entities/pharmacist-home/pharmacist-history';
import { useAppSelector } from 'app/config/store';

// export interface IPharmacistProps {
//   userId: string | number;
// }
const PharmacyRoutes = () => (
  // const PharmacyRoutes = (props: IPharmacistProps) => (

  // return (
  <ErrorBoundaryRoutes>
    <Route path=":id">
      <Route index element={<PharmacistHome />} />
      {/* <Route index element={<PharmacistHome userId={props.userId} />} /> */}
      <Route path=":id">
        <Route path="profile" element={<PharmacistProfile />} />
        <Route path="pharmacy" element={<PharmacistPharmacy />} />
        <Route path="guard" element={<PharmacistGuard />} />
        <Route path="history" element={<PharmacistHistory />} />
      </Route>
    </Route>
  </ErrorBoundaryRoutes>
);

export default PharmacyRoutes;
