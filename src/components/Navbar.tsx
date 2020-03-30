import React, { useState } from 'react';
import { Link } from 'gatsby';
import github from '../img/github-icon.svg';
import logo from '../img/logo.svg';
import { GitHubIcon } from '../img/GitHubIcon';

function Navbar() {
  const [state, setState] = useState({
    active: false,
    navBarActiveClass: ''
  });

  function toggleHamburger() {
    // toggle the active boolean in the state
    setState(oldState => ({
      active: !oldState.active,
      navBarActiveClass: !oldState.active
        ? 'is-active'
        : oldState.navBarActiveClass
    }));
  }

  return (
    <nav
      className="bg-teal-900 text-white px-8"
      role="navigation"
      aria-label="main-navigation"
    >
      <div id="navMenu" className={`navbar-menu ${state.navBarActiveClass}`}>
        <div className="flex flex-row justify-between">
          <div className="flex">
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
          </div>
          <div>
            <a
              className="navbar-item"
              href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon">
                <GitHubIcon fill="#fff" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
