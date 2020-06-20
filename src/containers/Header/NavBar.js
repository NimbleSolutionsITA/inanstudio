import React from "react";
import Link from "../../components/Link";
import styled from "styled-components";

const NavWrapper = styled.div`
  width: 100%;
  height: 20px;
  border-top: 1pt solid;
  border-bottom: 1pt solid;
  text-transform: uppercase;
`;

const NavTools = styled.div`
  float: right;
  & span {
    padding-left: 20px;
  }
`;

const NavBar = ({navLinks, cartItems, wishlistItems, currentPath, authenticated}) => {

    return (
        <NavWrapper>
            {navLinks.map(link => (
                <Link
                    key={link.name}
                    color="inherit"
                    style={{marginRight: '20px'}}
                    to={link.url}
                    active={currentPath.startsWith(link.url)}
                >
                    {link.name}
                </Link>
            ))}
            <NavTools>
                <Link
                    color="inherit"
                    style={{marginRight: '20px'}}
                    to={authenticated ? '/account' : '/account/login'}
                    active={currentPath.startsWith('/account')}
                >
                    {authenticated ? 'ACCOUNT' : 'LOGIN'}
                </Link>

                <Link
                    color="inherit"
                    style={{marginRight: '20px'}}
                    to="/wishlist"
                    active={currentPath === '/wishlist'}
                >
                    WISHLIST ({wishlistItems && `${wishlistItems}`})
                </Link>
                <Link
                    color="inherit"
                    style={{marginRight: '20px'}}
                    to="/bag"
                    active={currentPath === '/bag'}
                >
                    BAG ({cartItems && `${cartItems}`})
                </Link>
            </NavTools>
        </NavWrapper>
    )
}

export default NavBar;