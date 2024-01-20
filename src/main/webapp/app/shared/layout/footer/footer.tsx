import './footer.scss';

import React from 'react';
import { Col, Row } from 'reactstrap';
// import { LucideIcon } from 'lucide-react';
import 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faInstagram, faLinkedin, faTwitter);

// import { CopyrightIcon, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
// declare const CopyrightIcon: LucideIcon;
// declare const Facebook: LucideIcon;
// declare const Instagram: LucideIcon;
// declare const Linkedin: LucideIcon;
// declare const Twitter: LucideIcon;

// declare const CopyrightIcon;
// declare const Facebook;
// declare const Instagram;
// declare const Linkedin;
// declare const Twitter;

const Footer = () => {
  // const navigate = useNavigate();
  return (
    <div className="footer page-content text-light">
      <Row>
        <Col>
          <div className="w-full h-full px-5 flex-box flex-col scroll-smooth text-center">
            <Col>
              <h5>PharmaAI</h5>
              <p>App for Managing Pharmacies Locations</p>
            </Col>
            <Col>
              <h5>Contact:</h5>
              <address>
                <p>Email: pharmai@ai.com</p>
                <p>Phone: +0123456789</p>
              </address>
            </Col>
          </div>
          <div className="w-full flex-box pt-5 justify-around flex-col md:flex-row flex-end">
            <div className=" success text-base font-normal flex-box">
              {/* <CopyrightIcon /> */}
              <FontAwesomeIcon icon={faCopyright} />
              <span>2024 - All Rights Reserved By AKHMIM Abdelilah & ERRAHIMI Oussama</span> &nbsp;
              <div className="py-3">
                <div className="flex-box text-white">
                  <div className="border cursor-pointer p-2 m-1 rounded-circle ">
                    {/* <Facebook size={24} strokeWidth={2} /> */}
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>
                  <div className="border cursor-pointer p-2 m-1 rounded-circle">
                    {/* <Instagram size={24} strokeWidth={2} /> */}
                    <FontAwesomeIcon icon={faInstagram} />
                  </div>
                  <div className="border cursor-pointer p-2 m-1 rounded-circle">
                    {/* <Linkedin size={24} strokeWidth={2} /> */}
                    <FontAwesomeIcon icon={faLinkedin} />
                  </div>
                  <div className="border cursor-pointer p-2 m-1 rounded-circle">
                    {/* <Twitter size={24} strokeWidth={2} /> */}
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Footer;
