/* eslint-disable require-jsdoc */
import logo from '../../public/assets/logo.png';
import React from 'react';
import './Footer.css'; // Ensure the path is correct

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column large">
          <img src={logo} alt="Team Three Logo" className="footer-logo" />
          <div className="footer-address">
            <p>team three games</p>
            <br></br>
            <p>50 Stone Road East</p>
            <p>Guelph, ON</p>
            <p>Canada</p>
          </div>
        </div>
        <div className="footer-column small">
          <p>Games</p>
          <a href="/matchingGame" className="footer-link">Match the Cards</a>
          <a href="/poolgame" className="footer-link">8 Ball Pool</a>
        </div>
        <div className="footer-column small">

          <p>Contact the Team:</p>
          <a href="mailto:team3.cis4250@gmail.com">team3.cis4250@gmail.com</a>
        </div>
      </div>
      <p className="footer-copy">© {year} Team3. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
