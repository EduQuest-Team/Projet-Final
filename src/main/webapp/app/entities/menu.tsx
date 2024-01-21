import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';
import { useAppSelector } from 'app/config/store';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import {
  faCity,
  faZap,
  faRoad,
  faMedkit,
  faPersonMilitaryPointing,
  faUserNurse,
  faFilter,
  faClockRotateLeft,
  faHospital,
  faEdit,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons'; // Assuming you want to use the map-marker icon

const EntitiesMenu = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isPharmacien = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.PHARMACIEN]));
  const isUser = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.USER]));
  const isAnonymous = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ANONYMOUS]));
  const pharmacist = useAppSelector(state => state.pharmaciens.pharmacist);
  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      {/* prettier-ignore */}
      {isUser ? (
        <>
          {isAdmin && (
            <>
              <MenuItem icon={faCity} to="/ville">
                <Translate contentKey="global.menu.entities.ville" />
              </MenuItem>
              <MenuItem icon={faRoad} to="/zone">
                <Translate contentKey="global.menu.entities.zone" />
              </MenuItem>
              <MenuItem icon={faPersonMilitaryPointing} to="/garde">
                <Translate contentKey="global.menu.entities.garde" />
              </MenuItem>
              <MenuItem icon={faMedkit} to="/pharmacie">
                <Translate contentKey="global.menu.entities.pharmacie" />
              </MenuItem>
              <MenuItem icon={faUserNurse} to="/pharmacien">
                <Translate contentKey="global.menu.entities.pharmacien" />
              </MenuItem>
              <MenuItem icon={faFilter} to="/pharmaciens">
                Filtrage Pharmaciens
              </MenuItem>
              <MenuItem icon={faClockRotateLeft} to="/pharmacie-garde">
                <Translate contentKey="global.menu.entities.historique" />
              </MenuItem>
            </>
          )}
          {isPharmacien && (
            <>
              {!pharmacist ? (
                <MenuItem icon={faClipboard} to={`/pharmacist/${account.id}`}>
                  Get Started
                </MenuItem>
              ) : (
                <>
                  {!pharmacist.pharmacie ? (
                    <MenuItem icon={faEdit} to={`/pharmacie/new`}>
                      Create Pharmacy
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem icon={faUserNurse} to={`/pharmacist/${account.id}/${pharmacist.id}/profile`}>
                        View Profile
                      </MenuItem>

                      <MenuItem icon={faMedkit} to={`/pharmacist/${account.id}/${pharmacist.id}/pharmacy`}>
                        View Pharmacy
                      </MenuItem>
                      <MenuItem icon={faHospital} to={`/pharmacist/${account.id}/${pharmacist.id}/guard`}>
                        Mention a Guard
                      </MenuItem>
                      <MenuItem icon={faClockRotateLeft} to={`/pharmacist/${account.id}/${pharmacist.id}/history`}>
                        History of Guard
                      </MenuItem>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {isAnonymous && (
            <MenuItem icon="asterisk" to="/position">
              <Translate contentKey="global.menu.entities.position" />
            </MenuItem>
          )}
        </>
      ) : (
        <>
          <MenuItem icon="asterisk" to="/position">
            <Translate contentKey="global.menu.entities.position" />
          </MenuItem>
          <MenuItem icon="asterisk" to="/map">
            {/*<Translate contentKey="global.menu.entities.map" />*/}Maps
          </MenuItem>
          <MenuItem icon="asterisk" to="/about">
            About
          </MenuItem>
        </>
      )}

      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
