import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';

import { GitHubIcon } from '../icons/GitHubIcon';
import { peepoTheme } from '../theme';
import { ExternalPeepoLink } from './Links';
import { PeepoIconButton } from './Button';
import { TwitterIcon } from '../icons/TwitterIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { TextField, TextFieldProps } from './Forms/TextField';
import { Modal } from './Modal';
import { SearchResults } from './SearchResults';

// Navbar item.
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
        className={`${peepoTheme.navbarLinkVariant(isActive)} py-4 px-1 block`}
        to={to}
      >
        {children}
      </Link>
    </div>
  );
}

const NavbarItemIcon = styled(ExternalPeepoLink)`
  display: block;

  fill: ${peepoTheme.colorSets.dark.contrastTextHover.hex};

  &:hover {
    fill: ${peepoTheme.colorSets.dark.contrastText.hex};
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
        className={`${peepoTheme.navbarLinkVariant()} navbar-item pt-4 pb-4`}
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
  & > .navbar-item:not(:first-child) {
    margin-left: ${peepoTheme.spacing(2)};
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

const NavbarContentWrapper = styled.div`
  width: ${peepoTheme.maxOptimalWidth};
`;

function Navbar() {
  const pathname = useLocation().pathname;

  const [focused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  function onChangeQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function onFocus() {
    setIsFocused(true);
  }

  function onBlur() {
    setIsFocused(false);
  }

  return (
    <nav
      className={`${peepoTheme.colorSets.dark.main.twClass} text-white px-4 ${peepoTheme.pageHorizontalSpacing} fixed top-0 w-full z-50 flex flex-row justify-center`}
      role="navigation"
      aria-label="main-navigation"
    >
      <NavbarContentWrapper className="flex flex-row justify-between relative">
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
          <div className="flex py-4">
            <Modal isOpen={focused} onClose={onBlur}>
              <div className="px-24 w-full relative flex flex-col items-center">
                <NavbarSearchWrapper onClose={onBlur}>
                  <AlgoliaTextField
                    focused={focused}
                    onFocus={onFocus}
                    name="algoliaSearch"
                    placeholder="Search peepohappy"
                    className="text-black"
                    onChange={onChangeQuery}
                  />
                  <SearchResults query={query} />
                </NavbarSearchWrapper>
              </div>
            </Modal>
            <PeepoIconButton
              variant="navbar"
              disableBackgroundHover
              onClick={onFocus}
            >
              <SearchIcon size={24} />
            </PeepoIconButton>
          </div>
          <NavbarItemExternal href="https://twitter.com/Ajiballinst">
            <TwitterIcon size={24} />
          </NavbarItemExternal>
          <NavbarItemExternal href="https://github.com/Imballinst">
            <GitHubIcon size={24} />
          </NavbarItemExternal>
        </NavbarItemSpacer>
      </NavbarContentWrapper>
    </nav>
  );
}

export default Navbar;

// Helper components.
function NavbarSearchWrapper({
  onClose,
  children
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const modalContentElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const clickedElement = e.target as Element;

      if (modalContentElement.current !== null) {
        if (!modalContentElement.current.contains(clickedElement)) {
          onClose();
        }
      }
    }

    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <NavbarContentWrapper ref={modalContentElement}>
      {children}
    </NavbarContentWrapper>
  );
}

const NavbarTextField = styled(TextField)`
  margin-top: 5px;
`;

function AlgoliaTextField({
  focused,
  ...props
}: { focused: boolean } & TextFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current !== null && focused) {
        inputRef.current.focus();
      }
    });
  }, [focused]);

  return <NavbarTextField inputRef={inputRef} {...props} />;
}
