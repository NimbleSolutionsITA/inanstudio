import React from "react";
import {Divider} from "@material-ui/core";
import Link from "../../components/Link";
import styled from "styled-components";

const NavWrapper = styled.div`
  width: 100%;
  height: 20px;
  line-height: 18px;
  border-top: 1pt solid;
  border-bottom: 1pt solid;
`;

const NavTools = styled.div`
  float: right;
  & span {
    padding-left: 20px;
  }
`;

const Blink = styled.span`
  animation:blinkingText .75s;
  @keyframes blinkingText{
    0%{ color: transparent; }
    33%{ color: #000; }
    66%{ color: transparent; }
    100%{ color: #000; }
}
`;

const NavBar = ({navLinks, cartItems, wishlistItems, currentPath, authenticated}) => {

    return (
        <React.Fragment>
            {currentPath === '/checkout' ? <Divider /> :
                <NavWrapper>
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            color="inherit"
                            style={{marginRight: '20px'}}
                            to={link.url}
                            isActive={currentPath.startsWith(link.url)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <NavTools>
                        <Link
                            color="inherit"
                            style={{marginRight: '20px'}}
                            to={authenticated ? '/account' : '/account/login'}
                            isActive={currentPath.startsWith('/account')}
                        >
                            {authenticated ? 'ACCOUNT' : 'LOGIN'}
                        </Link>

                        <Link
                            color="inherit"
                            style={{marginRight: '20px'}}
                            to="/wishlist"
                            isActive={currentPath === '/wishlist'}
                        >
                            <Blink key={wishlistItems}>WISHLIST ({wishlistItems && `${wishlistItems}`})</Blink>
                        </Link>
                        <Link
                            color="inherit"
                            to="/bag"
                            isActive={currentPath === '/bag'}
                        >
                            <Blink key={cartItems}>BAG ({cartItems && `${cartItems}`})</Blink>
                        </Link>
                    </NavTools>
                </NavWrapper>
            }
        </React.Fragment>
    )
}

export default NavBar;