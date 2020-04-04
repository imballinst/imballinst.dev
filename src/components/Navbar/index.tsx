import React, { useState, ReactNode } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { GitHubIcon } from '../../img/GitHubIcon';
import { peepoTheme } from '../../theme';

// Navbar item.
function NavbarItem({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      className={`navbar-item font-bold ${peepoTheme.palette.dark.contrastText} hover:${peepoTheme.palette.dark.contrastTextAlt}`}
      to={to}
    >
      {children}
    </Link>
  );
}

const NavbarItemIcon = styled.a`
  display: block;
  width: 1.5rem;
  height: 1.5rem;

  & > svg {
    fill: #fff;

    &:hover {
      fill: #cbd5e0;
    }
  }
`;

function NavbarItemExternal({
  children,
  ...props
}: {
  href: string;
  target: string;
  rel: string;
  children: ReactNode;
}) {
  return (
    <NavbarItemIcon className="navbar-item" {...props}>
      {children}
    </NavbarItemIcon>
  );
}

// Navbar.
const NavbarItemSpacer = styled.div`
  & > .navbar-item:not(:first-child) {
    margin-left: ${peepoTheme.spacing(8)};
  }
`;

function Navbar() {
  return (
    <nav
      className="bg-teal-900 text-white px-8 py-4 fixed top-0 w-full z-50"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="flex flex-row justify-between">
        <NavbarItemSpacer>
          <NavbarItem to="/">peepohappy</NavbarItem>
          <NavbarItem to="/blog">blog</NavbarItem>
          <NavbarItem to="/about">about</NavbarItem>
        </NavbarItemSpacer>
        <NavbarItemSpacer>
          <NavbarItemExternal
            href="https://github.com/Imballinst"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </NavbarItemExternal>
        </NavbarItemSpacer>
      </div>
    </nav>
  );
}

export default Navbar;
