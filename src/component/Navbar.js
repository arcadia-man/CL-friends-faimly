import React, { useState } from 'react';
import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarToggler, MDBNavbarBrand, MDBCollapse } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useUserContext();

  return (
    <div style={{ backgroundColor: "#f1dff2" }}>
      <MDBNavbar expand='lg' className='bg-transparent'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='m-1'><img src='logo.png' height='30' alt='' loading='lazy' />CaratLane</MDBNavbarBrand>
          <MDBNavbarToggler type='button' data-target='#navbarColor02' aria-controls='navbarColor02' aria-expanded='false' aria-label='Toggle navigation' onClick={() => setOpenNav(!openNav)}>
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              {(user && user.status) && (<MDBNavbarItem className='my-2' style={{pointerEvents: "none",  color:"black"}}><NavLink to="/idontknow" className="nav-link" activeClassName="active"> 👋HI {user.user.toUpperCase()}</NavLink></MDBNavbarItem>)}
              {(<MDBNavbarItem className='my-2' > <NavLink to="/" className="nav-link" activeClassName="active">Product</NavLink></MDBNavbarItem>)}
              {(user && user.status) && (<MDBNavbarItem className='my-2' > <NavLink to="/friend" className="nav-link" activeClassName="active">Friends</NavLink></MDBNavbarItem>)}
              {(user && user.status) && (<MDBNavbarItem className='my-2' > <NavLink to="/wishlist" className="nav-link" activeClassName="active">Wishlist</NavLink></MDBNavbarItem>)}
              {(user && user.status) ? (<MDBNavbarItem className='my-2' > <NavLink to="/logout" className="nav-link" activeClassName="active">Sign Out</NavLink></MDBNavbarItem>) : (<MDBNavbarItem className='my-2' > <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink></MDBNavbarItem>)}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Navbar