import './header.scss';
import { translate } from 'react-jhipster';

import React, { useState, useEffect } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse, NavLink, NavItem } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { isRTL } from 'app/config/translation';
import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { NavDropdown } from 'react-bootstrap';
import MenuItem from 'app/shared/layout/menus/menu-item';
import EntitiesMenuItems from 'app/entities/menu';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons'; // Assuming you want to use the map-marker icon

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => document.querySelector('html').setAttribute('dir', isRTL(Storage.session.get('locale')) ? 'rtl' : 'ltr'));

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
    document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="" title="ribbon">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  const isUser = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.USER]));
  return (
    <div id="app-header">
      {/* {renderDevRibbon()} */}
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            <Home />
            {/*{props.isAuthenticated && <EntitiesMenu />}*/}
            {!props.isAuthenticated && <Maps />}
            {isUser && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
            <About />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
const Maps = () => (
  <NavItem>
    <NavLink tag={Link} to="/map" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faMap} className="me-2" />
      <span>Map</span>
    </NavLink>
  </NavItem>
);
const About = () => (
  <NavItem>
    <NavLink tag={Link} to="/about" className="d-flex align-items-center">
      <FontAwesomeIcon icon="book" />
      <span>About</span>
    </NavLink>
  </NavItem>
);

export default Header;
