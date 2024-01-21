import './home.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppSelector } from 'app/config/store';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import LandingHome from 'app/modules/home/LandingHome';
import DashboardHome from 'app/modules/home/DashboardHome';
import PharmacistHome from 'app/entities/pharmacist-home';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
  const loading = useAppSelector(state => state.authentication.loading);
  const account = useAppSelector(state => state.authentication.account);
  // const isAdminOrPharmacien = useAppSelector(state =>
  //   hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN, AUTHORITIES.PHARMACIEN]),
  // );
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isPharmacien = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.PHARMACIEN]));
  const isUser = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.USER]));

  // const [userId, setUserId] = useState(account.id);
  // const handleSyncList = () => {
  //   console.log(account.id);
  // };
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
          {isUser ? (
            <>
              {isAdmin && (
                <>
                  <Col md="3" className="pad">
                    <span className="hipster rounded" />
                  </Col>
                  <Col md="9" className="flex-column">
                    <h1 className="display-2 flex-box d-flex text-center my-4 mb-3">
                      <Translate contentKey="home.title">Welcome, </Translate>&nbsp;
                    </h1>
                    <h1 className="display-5 d-flex flex-box text-center">
                      <span>{` ${account.firstName}`} !</span>
                    </h1>
                    <DashboardHome />
                  </Col>
                </>
              )}
              {isPharmacien && (
                <>
                  <Col md="3" className="pad">
                    <span className="pharmacist rounded" />
                  </Col>
                  <Col md="9" className="flex-column">
                    <h1 className="display-2 flex-box d-flex text-center my-4 mb-3">
                      <Translate contentKey="home.title">Welcome, </Translate>&nbsp;
                    </h1>
                    <h1 className="display-5 d-flex flex-box text-center">
                      <span>{` ${account.firstName}`} !</span>
                    </h1>
                    <Link to={`/pharmacist/${account.id}`} className="alert-link">
                      <Button className="flex-box" color="info" disabled={loading}>
                        <FontAwesomeIcon icon={faClipboard} spin={loading} /> Get Started
                      </Button>
                    </Link>
                    {/* {account.id && <PharmacistHome />} */}
                    {/* <PharmacistHome userId={userId} /> */}
                  </Col>
                </>
              )}
            </>
          ) : (
            <LandingHome />
          )}
          {account?.login ? (
            <div>
              {/*<Alert color="success">*/}
              {/*  <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>*/}
              {/*    You are logged in as user {account.login}.*/}
              {/*  </Translate>*/}
              {/*</Alert>*/}
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

              {/*<Alert color="warning">*/}
              {/*  <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;*/}
              {/*  <Link to="/account/register" className="alert-link">*/}
              {/*    <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>*/}
              {/*  </Link>*/}
              {/*</Alert>*/}
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
        </>
      )}
    </Row>
  );
};

export default Home;
