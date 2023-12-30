import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/pharmacie">
                <Translate contentKey="global.menu.entities.pharmacie"/>
            </MenuItem>
      <MenuItem icon="asterisk" to="/garde">
        <Translate contentKey="global.menu.entities.garde" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/pharmacie-garde">
        <Translate contentKey="global.menu.entities.pharmacieGarde" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/pharmacien">
        <Translate contentKey="global.menu.entities.pharmacien" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/zone">
        <Translate contentKey="global.menu.entities.zone" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ville">
        <Translate contentKey="global.menu.entities.ville" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/historique">
        <Translate contentKey="global.menu.entities.historique" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/position">
        <Translate contentKey="global.menu.entities.position" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/map">
        {/*<Translate contentKey="global.menu.entities.map" />*/}Maps
      </MenuItem>
      <MenuItem icon="asterisk" to="pharmacie/statistics">
        {/*<Translate contentKey="global.menu.entities.position" />*/}Statistics
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
