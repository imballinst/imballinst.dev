import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';

import { GitHubIcon } from '../img/GitHubIcon';
import { peepoTheme } from '../theme';
import { ExternalPeepoLink } from './Links';

// Navbar item.
const NavbarGutter = styled.div`
  height: 4px;
`;

function NavbarItem({
  to,
  children,
  isActive
}: {
  to: string;
  children: ReactNode;
  isActive: boolean;
}) {
  return (
    <div className="navbar-item pb-4 relative">
      <Link className={peepoTheme.navbarLinkVariant('dark')} to={to}>
        {children}
      </Link>
      {isActive && (
        <NavbarGutter className="absolute bottom-0 w-full border-2 border-white" />
      )}
    </div>
  );
}

const NavbarItemIcon = styled(ExternalPeepoLink)`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  fill: #fff;

  &:hover {
    fill: #cbd5e0;
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
    margin-left: ${peepoTheme.spacing(4)};
  }
`;

const paths = [
  { to: '/', text: 'peepohappy' },
  { to: '/blog', text: 'blog' },
  { to: '/about', text: 'about' }
];

function isActive(path: string, currentPath: string) {
  if (path === '/') {
    return path === currentPath;
  }

  return currentPath.indexOf(path) === 0;
}

function Navbar() {
  const pathname = useLocation().pathname;

  return (
    <nav
      className={`bg-teal-900 text-white ${peepoTheme.pageHorizontalSpacing} pt-4 fixed top-0 w-full z-50`}
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="flex flex-row justify-between">
        <NavbarItemSpacer className="flex flex-row">
          {paths.map(path => (
            <NavbarItem isActive={isActive(path.to, pathname)} to={path.to}>
              {path.text}
            </NavbarItem>
          ))}
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
