import React from 'react'
import { Nav, NavItem, Navbar, NavbarBrand } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { selectToken, signOut } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
      const dispatch = useDispatch()
      const token = useSelector(selectToken);
      let links = null;
      if (token === null) {
            links = <Nav>
                  <NavItem className='md:mr-5'>
                        <NavLink exact to='/' className='no-underline text-white text-2xl -mt-6'>
                              Burger Builder
                        </NavLink>
                  </NavItem>
                  <NavItem className='md:mr-5'>
                        <NavLink exact to='/order' className='no-underline text-white text-2xl -mt-6'>
                              Orders
                        </NavLink>
                  </NavItem>
                  <NavItem className='md:mr-5'>
                        <NavLink exact to='/login' className='no-underline text-white text-2xl -mt-6'>
                              Login
                        </NavLink>
                  </NavItem>
            </Nav>
      } else {
            links = <Nav>
                  <NavItem className='md:mr-5'>
                        <NavLink exact to='/' className='no-underline text-white text-2xl -mt-6'>
                              Burger Builder
                        </NavLink>
                  </NavItem>
                  <NavItem className='md:mr-5'>
                        <NavLink exact to='/order' className='no-underline text-white text-2xl -mt-6' >
                              Orders
                        </NavLink>
                  </NavItem>
                  <NavItem className='md:mr-5'>
                        <NavLink exact to='/login' className='no-underline text-white text-2xl -mt-6' onClick={() => dispatch(signOut())}>
                              Logout
                        </NavLink>
                  </NavItem>
            </Nav>

      }
      return (
            <div className='items-center'>
                  <Navbar className='bg-rose-500'>
                        <NavbarBrand href='' className='mr-auto md:ml-5'>
                              <img src={Logo} alt="" width="60px" />
                        </NavbarBrand>
                        {links}
                  </Navbar>
            </div>
      )
}

export default Header