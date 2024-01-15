import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Pharmacie from './pharmacie';
import Garde from './garde';
import PharmacieGarde from './pharmacie-garde';
import Pharmacien from './pharmacien';
import Zone from './zone';
import Ville from './ville';
import Historique from './historique';
import Pharmaciens from './pharmaciens';
import Profile from 'app/modules/profile';
import PharmacistHome from './pharmacist-home';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="pharmacie/*" element={<Pharmacie/>}/>
        <Route path="garde/*" element={<Garde />} />
        <Route path="pharmacie-garde/*" element={<PharmacieGarde />} />
        <Route path="pharmacien/*" element={<Pharmacien />} />
        <Route path="zone/*" element={<Zone />} />
        <Route path="ville/*" element={<Ville />} />
        <Route path="historique/*" element={<Historique />} />
        <Route path="pharmaciens/*" element={<Pharmaciens />} />
        <Route path="pharmacist/*" element={<PharmacistHome />} />
        <Route path="profile/*" element={<Profile />} />

        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
