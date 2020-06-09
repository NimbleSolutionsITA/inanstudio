import React, {useMemo, useState, useRef, useEffect} from "react";
import {login, logout} from "../../providers/AuthProvider/actions";
import {useLocation} from "react-router";
import {connect} from "react-redux";

import {setHeaderHeight, setHeaderColor, openDrawer} from "./actions";
import styled from "styled-components";
import {useMediaQuery, useTheme} from "@material-ui/core";
import NavBar from './NavBar';
import NewsFeed from './NewsFeed';
import LogoBar from './LogoBar';
import Container from "../../components/Container";
import AppBar from "./AppBar";

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  color: ${({color}) => color};
  z-index: 2;
  transition: fill .25s ease;
  background-color: ${({pathname}) => pathname === '/' ? 'transparent' : '#fff'};
`;

const Header = (props) => {
    const [username, setUsername] = useState( '' )
    const [password, setPassword] = useState( '' )

    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))

    const headerEl = useRef(null);

    const navLinks = [
        {name: 'shop', url: '/shop'},
        {name: 'made to order', url: '/shop'},
        {name: 'collection', url: '/collection'},
        {name: 'about', url: '/about'},
        {name: 'stockist', url: '/stockist'},
    ]
    const cartItems = 3;
    const wishListItems = 10;
    let location = useLocation()
    useEffect(() => {
        if(headerEl.current?.offsetHeight && headerEl.current.offsetHeight !== props.headerHeight) {
            props.setHeaderHeight(headerEl.current.offsetHeight)
            if(isMobile) {
                document.documentElement.style.scrollPaddingTop = `${headerEl.current.offsetHeight}px`
            }
        }
        if(location.pathname !== '/') props.setHeaderColor('#000', '#000')
    }, [isMobile, location.pathname, props])


    function handleLogin( e ) {
        e.preventDefault();
        props.login(username, password);
    }

    function handleLogout() {
        props.logout();
    }
    return useMemo(() => (
        <React.Fragment>
            {isMobile ? (
                <React.Fragment>
                    <AppBar
                        ref={headerEl}
                        open={props.open}
                        openDrawer={props.openDrawer}
                        isMobile={isMobile}
                        navLinks={navLinks}
                        cartItems={cartItems}
                        wishListItems={wishListItems}
                    >
                        {props.news?.length > 0 && !props.open && <NewsFeed isMobile={isMobile} currentNews={props.news} />}
                    </AppBar>
                    <div style={{width: '100%', height: `${props.headerHeight}px`}} />
                </React.Fragment>
            ) : (
                <HeaderWrapper ref={headerEl} color={props.headerColor} pathname={location.pathname}>
                    <Container>
                        {props.news?.length > 0 && <NewsFeed isMobile={isMobile} currentNews={props.news} />}
                        <LogoBar fill={props.headerColor} height={66} />
                        <NavBar
                            navLinks={navLinks}
                            cartItems={cartItems}
                            wishListItems={wishListItems}
                        />
                    </Container>
                </HeaderWrapper>
            )}
        </React.Fragment>

    ), [isMobile, props.open, props.openDrawer, props.news, props.headerHeight, props.headerColor, navLinks, location.pathname])

}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    authenticating: state.user.authenticating,
    headerColor: state.header.headerColor,
    headerColorMobile: state.header.headerColorMobile,
    news: state.wordpress['news-feed'],
    headerHeight: state.header.height,
    open: state.header.open,
})

const mapDispatchToProps = {
    login,
    logout,
    setHeaderHeight,
    setHeaderColor,
    openDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);