import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import LandingHome from 'app/modules/home/LandingHome';
import DashboardHome from 'app/modules/home/DashboardHome';

export const Home = () => {
  const loading = useAppSelector(state => state.authentication.loading);
  const account = useAppSelector(state => state.authentication.account);
  const isAdminOrPharmacien = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN, AUTHORITIES.PHARMACIEN]),
  );
  return (
    <Row>
      {/*<Col md="3" className="pad">*/}
      {/*  <span className="hipster rounded"/>*/}
      {/*</Col>*/}
      {/*<Col md="9">*/}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {isAdminOrPharmacien ? (
            <>
              <Col md="3" className="pad">
                <span className="hipster rounded" />
              </Col>
              <Col md="9">
                <h1 className="display-4 d-flex">
                  <Translate contentKey="home.title">Welcome, </Translate>
                  <span>{`${account.firstName} ${account.lastName}`}</span>
                </h1>
                <DashboardHome />
              </Col>
            </>
          ) : (
            <LandingHome />
          )}
        </>
      )}
      {account?.login ? (
        <div>
          <Alert color="success">
            <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
              You are logged in as user {account.login}.
            </Translate>
          </Alert>
        </div>
      ) : (
        <div>
          {/*<Alert color="warning">*/}
          {/*  <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>*/}

          {/*  <Link to="/login" className="alert-link">*/}
          {/*    <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>*/}
          {/*  </Link>*/}
          {/*  <Translate contentKey="global.messages.info.authenticated.suffix">*/}
          {/*    , you can try the default accounts:*/}
          {/*    <br/>- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)*/}
          {/*    <br/>- User (login=&quot;user&quot; and password=&quot;user&quot;).*/}
          {/*  </Translate>*/}
          {/*</Alert>*/}

          <Alert color="warning">
            <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
            <Link to="/account/register" className="alert-link">
              <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
            </Link>
          </Alert>
        </div>
      )}
      {/*<p>*/}
      {/*  <Translate contentKey="home.question">If you have any question on JHipster:</Translate>*/}
      {/*</p>*/}

      {/*<ul>*/}
      {/*  <li>*/}
      {/*    <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">*/}
      {/*      <Translate contentKey="home.link.homepage">JHipster homepage</Translate>*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">*/}
      {/*      <Translate contentKey="home.link.stackoverflow">JHipster on Stack Overflow</Translate>*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">*/}
      {/*      <Translate contentKey="home.link.bugtracker">JHipster bug tracker</Translate>*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">*/}
      {/*      <Translate contentKey="home.link.chat">JHipster public chat room</Translate>*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">*/}
      {/*      <Translate contentKey="home.link.follow">follow @jhipster on Twitter</Translate>*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {/*<p>*/}
      {/*  <Translate contentKey="home.like">If you like JHipster, do not forget to give us a star on</Translate>{' '}*/}
      {/*  <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">*/}
      {/*    GitHub*/}
      {/*  </a>*/}
      {/*  !*/}
      {/*</p>*/}
      {/*</Col>*/}
    </Row>
  );
};

export default Home;
