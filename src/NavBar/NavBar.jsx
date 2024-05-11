/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {Login} from '../Login/Login.jsx';
import Logo from '../../public/assets/logo.png';
import {Link} from 'react-router-dom';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const triggerHeight = window.innerHeight * 0.1;
      if (offset > triggerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? 'header-scrolled' : ''}>
      {/* links to root */}
      <Link to="/">
        <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <nav>
        <Link className="navlink" to="/about">About Us</Link>
        <Link className="navlink" to="/#game-section">Games</Link>
        <Link className="navlink" to="/leaderboard">Leaderboards</Link>
      </nav>
      {<Login />}
    </header>
  );
};

export default NavBar;
