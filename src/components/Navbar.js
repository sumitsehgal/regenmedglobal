import React, { useContext, Fragment, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import img1 from '../assets/social-3.png'
import img2 from '../assets/Search.png'
import img3 from '../assets/logo.png'
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItemText,
  useMediaQuery,
  Drawer,
  Hidden,
} from '@mui/material';
import { AuthContext } from '../AuthContext';
import Logo from '../assets/logo.png';

const bounceAnimation = keyframes`
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  80% {
    transform: translateY(-10px);
  }
`;

const NavbarMenu = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const StyledList = styled(List)`
  &.drawerList {
    color: #000;
    display: flex;
    flex-direction: column; /* Stack items vertically */
  }
`;

const NavbarItem = styled(Link)`
  text-decoration: none;
  color: ${props => (props.sidebar ? "#000" : "#fff")};
  margin-left: 16px;
  display: inline-block;
  font-size: 18px;
  font-weight: normal; /* Default font-weight */

  &:hover {
    color: yellow;
    transform: scale(1.2);
  }

  /* Conditional styling for the active page */
  ${props =>
    props.active &&
    css`
      color: yellow;
      font-size: 20px; /* Font size for active item */
      font-weight: bold; /* Font weight for active item */
    `}
`;


const MenuIconWrapper = styled.span`
  display: inline-block;
  width: 24px;
  height: 2px;
  background-color: #fff;
  position: relative;
  transition: background-color 0.3s ease-in-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
  }

  &::before {
    top: -6px;
  }

  &::after {
    top: 6px;
  }

  ${props =>
    props.open &&
    css`
      background-color: transparent;

      &::before {
        transform: rotate(45deg);
        top: 0;
      }

      &::after {
        transform: rotate(-45deg);
        top: 0;
      }
    `}
`;

const LogoImage = styled.img`
  height: 4rem;
  width: 10rem;
  margin-right: 1px;
  margin-left: 1rem;
  cursor: pointer;
  padding: 5px;
`;

const Navbar = () => {
  const { loggedIn, logout, currentUser } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  console.log('current user from navbar', currentUser);

  let currentUserID;
  try {
    const jsonUser = JSON.parse(currentUser);
    currentUserID = jsonUser.userId;
  } catch (error) {
    console.error('Error parsing or accessing user data:', error);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const location = useLocation();

  return (



    
    <AppBar position="fixed">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"><img src={img3} /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/services">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contact">Contact</a>
                </li>
                {/* <li class="nav-item">
                  <a class="nav-link" href="#">FAQ</a>
                </li> */}
              </ul>
              <form class="d-flex" role="search">
                <ul className='right-nav'>
                  {/* <li><a><img className='img-1-width' src={img1} />ENG</a></li>
                  <li><a><img className='img-2-width' src={img2} /></a></li> */}
                  {loggedIn ? (
                    <li class="nav-item">
                      <a class="nav-link" onClick={handleLogout} style={{ color: '#000 !important' }}>Logout</a>
                    </li>
                  ) :(
                  <li><button className='doc-login'> <a class="nav-link" href="/doctorlogin">Doctor Login</a></button></li>
                )}
                </ul>
              </form>
            </div>
          </div>
        </nav>
      {/* <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <LogoImage src={Logo} alt="Regen Global Logo" />
          </Link>
        </div>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIconWrapper open={drawerOpen} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
              classes={{ paper: 'drawerContent' }}
              PaperProps={{ component: 'div', style: { zIndex: 1200 } }}
            >
              <StyledList className="drawerList">
                {loggedIn && (
                  <NavbarItem
                    key="Profile"
                    to={`/profile/${currentUserID}`}
                    className="navbarItem"
                    onClick={toggleDrawer}
                    active={location.pathname === `/profile/${currentUserID}`}
                  >
                    <ListItemText primary="Profile" />
                  </NavbarItem>
                )}
                <NavbarItem
                  key="About"
                  to="/services"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/services'}
                >
                  <ListItemText primary="About" />
                </NavbarItem>
                <NavbarItem
                  key="Contact"
                  to="/contact"
                  sidebar={isMobile}
                  className="navbarItem"
                  onClick={toggleDrawer}
                  active={location.pathname === '/contact'}
                >
                  <ListItemText primary="Contact" />
                </NavbarItem>
                {loggedIn ? (
                  <NavbarItem
                    key="Logout"
                    to="/"
                    sidebar={isMobile}
                    className="navbarItem"
                    onClick={() => {
                      toggleDrawer();
                      handleLogout();
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </NavbarItem>
                ) : (
                  <NavbarItem
                    key="Login"
                    to="/doctorlogin"
                    sidebar={isMobile}
                    className="navbarItem"
                    onClick={toggleDrawer}
                    active={location.pathname === '/doctorlogin'}
                  >
                    <ListItemText primary="Doctor Login" />
                  </NavbarItem>
                )}
              </StyledList>
            </Drawer>
          </>
        ) : (
          <Hidden smDown implementation="css">
            <NavbarMenu>
              {loggedIn && (
                <NavbarItem
                  key="Profile"
                  to={`/profile/${currentUserID}`}
                  className="navbarItem"
                  active={location.pathname === `/profile/${currentUserID}`}
                >
                  <ListItemText primary="Profile" />
                </NavbarItem>
              )}
              <NavbarItem
                key="About"
                to="/services"
                className="navbarItem"
                active={location.pathname === '/services'}
              >
                <ListItemText primary="About" />
              </NavbarItem>
              <NavbarItem
                key="Contact"
                to="/contact"
                className="navbarItem"
                active={location.pathname === '/contact'}
              >
                <ListItemText primary="Contact" />
              </NavbarItem>
              {loggedIn ? (
                <NavbarItem
                  key="Logout"
                  to="/"
                  className="navbarItem"
                  onClick={handleLogout}
                >
                  <ListItemText primary="Logout" />
                </NavbarItem>
              ) : (
                <NavbarItem
                  key="Login"
                  to="/doctorlogin"
                  className="navbarItem"
                >
                  <ListItemText primary="Doctor Login" />
                </NavbarItem>
              )}
            </NavbarMenu>
          </Hidden>
        )}
      </Toolbar> */}
    </AppBar>
  );
};

export default Navbar;
