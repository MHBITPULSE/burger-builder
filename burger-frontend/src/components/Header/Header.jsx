import React from 'react'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap'
import Logo from '../../assets/logo.png'

const Header = () => {
      return (
            <div className='mb-5'>
                  <Navbar className='bg-rose-500 h-16'>
                        <NavbarBrand href='' className='mr-auto md:ml-5'>
                              <img src={Logo} alt="" width="60px" />
                        </NavbarBrand>
                        <Nav>
                              <NavItem className='md:mr-5'>
                                    <NavLink href='' className='no-underline text-white text-2xl -mt-6'>
                                          Something
                                    </NavLink>
                              </NavItem>
                        </Nav>
                  </Navbar>
            </div>
      )
}

export default Header