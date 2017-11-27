import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Navbar from '../../components/Navbar';
import Nav from '../../components/Nav';
import FormControl from '../../components/FormGroup';
import FormGroup from '../../components/FormControl';
import Button from '../../components/Button';

const NAV_LINKS = {
  'about': {
    link: '/about.html',
    title: 'About Us',
  },
  'animal': {
    link: '/animals.html',
    title: 'Animals',
  },
  'threat': {
    link: '/threats.html',
    title: 'Threats',
  },
  'habitat': {
    link: '/habitats.html',
    title: 'Habitats',
  },
  'country': {
    link: '/countries.html',
    title: 'Countries',
  },
};

// We don't want to include react-router-bootstrap as a dependency here, so we
// need to fudge our own `<NavItem>` substitutes, and hide unknown props from
// them.

function Wrapper({ children }) {
  return children;
}

const propTypes = {
  activePage: PropTypes.string,
};

function NavMain({ activePage }) {
  return (
    <Navbar
      staticTop
      componentClass="header"
      className="bs-docs-nav"
      role="banner"
    >
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Planet Animal</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse className="bs-navbar-collapse">
        <Navbar.Form pullRight>
          <FormGroup>
          </FormGroup>
          <Button type="submit">Search</Button>
        </Navbar.Form>

        <Nav role="navigation" id="top">
          {Object.entries(NAV_LINKS).map(([linkName, { link, title }]) => (
            <Wrapper key={linkName}>
              <li className={linkName === activePage ? 'active' : null}>
                <Link to={link}>
                  {title}
                </Link>
              </li>
            </Wrapper>
          ))}
          <Wrapper>
            <li>
              <a
                href="https://github.com/gvikei/idb"
                target="_blank">
                GitHub
              </a>
            </li>
          </Wrapper>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
