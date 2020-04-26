import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';

import { GitHubIcon } from '../icons/GitHubIcon';
import { peepoTheme } from '../theme';
import { ExternalPeepoLink } from './Links';
import { TwitterIcon } from '../icons/TwitterIcon';

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
    <div className="navbar-item relative">
      <Link
        className={`${peepoTheme.navbarLinkVariant('dark')} pb-4 pt-4 block`}
        to={to}
      >
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

  fill: ${peepoTheme.colorSets.dark.contrastText.hex};

  &:hover {
    fill: ${peepoTheme.colorSets.dark.contrastTextHover.hex};
  }
`;

function NavbarItemExternal({
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <div className="navbar-item">
      <NavbarItemIcon
        className={`${peepoTheme.navbarLinkVariant(
          'dark'
        )} navbar-item pt-4 pb-4`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </NavbarItemIcon>
    </div>
  );
}

// Navbar.
const NavbarItemSpacer = styled.div`
  & > .navbar-item:not(:first-of-type) {
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

const NavbarContent = styled.div`
  width: ${peepoTheme.maxOptimalWidth};
`;

function Navbar() {
  const pathname = useLocation().pathname;

  return (
    <nav
      className={`bg-teal-900 text-white px-4 ${peepoTheme.pageHorizontalSpacing} fixed top-0 w-full z-50 flex flex-row justify-center`}
      role="navigation"
      aria-label="main-navigation"
    >
      <NavbarContent className="flex flex-row justify-between">
        <NavbarItemSpacer className="flex flex-row">
          {paths.map(path => (
            <NavbarItem
              isActive={isActive(path.to, pathname)}
              to={path.to}
              key={path.to}
            >
              {path.text}
            </NavbarItem>
          ))}
        </NavbarItemSpacer>
        <NavbarItemSpacer className="flex flex-row">
          <NavbarItemExternal href="https://twitter.com/Ajiballinst">
            <TwitterIcon size={24} />
          </NavbarItemExternal>
          <NavbarItemExternal href="https://github.com/Imballinst">
            <GitHubIcon size={24} />
          </NavbarItemExternal>
        </NavbarItemSpacer>
      </NavbarContent>
    </nav>
  );
}

export default Navbar;
