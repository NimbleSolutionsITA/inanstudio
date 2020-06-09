import React from "react";
import Link from "../../components/Link";
import styled from "styled-components";

const NavWrapper = styled.div`
  width: 100%;
  height: 18pt;
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

const NavBar = ({navLinks, cartItems, wishListItems}) => {

    return (
        <NavWrapper>
            {navLinks.map(link => (
                <Link
                    key={link.name}
                    color="inherit"
                    style={{marginRight: '20px'}}
                    to={link.url}
                >
                    {link.name}
                </Link>
            ))}
            <NavTools>
                <span>LOGIN</span>
                <span>WISHLIST {wishListItems && `(${wishListItems})`}</span>
                <span>BAG {cartItems && `(${cartItems})`}</span>
            </NavTools>
        </NavWrapper>
    )
}

export default NavBar;