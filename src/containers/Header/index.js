import React, {useMemo, useRef, useEffect} from "react";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {setHeaderHeight, setHeaderColor} from "./actions";
import styled from "styled-components";
import {useMediaQuery, useTheme} from "@material-ui/core";
import NavBar from './NavBar';
import NewsFeed from './NewsFeed';
import LogoBar from './LogoBar';
import Container from "../../components/Container";
import AppBar from "./AppBar";
import Filters from "./Filters";

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  color: ${({color}) => color};
  z-index: 2;
  transition: fill .25s ease;
  background-color: ${({bgColor}) => bgColor};
`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = ({news, categories}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))

    const headerEl = useRef(null);

    const navLinks = [
        {name: 'shop', url: '/shop'},
        {name: 'made to order', url: '/made-to-order'},
        {name: 'collection', url: '/collection'},
        {name: 'about', url: '/about'},
        {name: 'stockists', url: '/stockists'},
    ]
    const dispatch = useDispatch()
    const { authenticated  } = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wishlist)
    const { headerColor, height, open  } = useSelector(state => state.header)

    const cartItems = cart.length;
    const wishListItems = wishlist.length;

    let location = useLocation()
    let query = useQuery()

    const bgColor = () => {
        switch (location.pathname) {
            case '/':
                return 'transparent'
            case '/about':
                return '#000'
            default:
                return '#fff'
        }
    }

    useEffect(() => {
        if(headerEl.current?.offsetHeight && headerEl.current.offsetHeight !== height) {
            dispatch(setHeaderHeight(headerEl.current.offsetHeight))
            if(isMobile) {
                document.documentElement.style.scrollPaddingTop = `${headerEl.current.offsetHeight}px`
            }
        }
        if(location.pathname === '/about') dispatch(setHeaderColor('#fff', '#fff'))
        else if(location.pathname !== '/') dispatch(setHeaderColor('#000', '#000'))
    }, [dispatch, height, isMobile, location.pathname])

    return useMemo(() => (
        <React.Fragment>
            {isMobile ? (
                <React.Fragment>
                    <AppBar
                        ref={headerEl}
                        authenticated={authenticated}
                        open={open}
                        isMobile={isMobile}
                        navLinks={navLinks}
                        cartItems={cartItems}
                        wishlistItems={wishListItems}
                    >
                        {news?.length > 0 && !open && <NewsFeed isMobile={isMobile} currentNews={news} />}
                        {location.pathname === '/shop' && categories && (
                            <Filters isMobile={isMobile} categories={categories} activeCategory={query.get('category') || 'view-all'} />
                        )}
                    </AppBar>
                    <div style={{width: '100%', height: `calc(${height}px`}} />
                </React.Fragment>
            ) : (
                <HeaderWrapper ref={headerEl} color={headerColor} bgColor={bgColor}>
                    <Container>
                        {news?.length > 0 && <NewsFeed isMobile={isMobile} currentNews={news} />}
                        <LogoBar fill={headerColor} height={43} />
                        <NavBar
                            navLinks={navLinks}
                            cartItems={cartItems}
                            wishlistItems={wishListItems}
                            currentPath={location.pathname}
                            authenticated={authenticated}
                        />
                        {location.pathname.startsWith('/shop') && categories && (
                            <Filters isMobile={isMobile} categories={categories} activeCategory={query.get('category') || 'view-all'} />
                        )}
                    </Container>
                </HeaderWrapper>
            )}
        </React.Fragment>

    ), [isMobile, authenticated, open, dispatch, navLinks, cartItems, wishListItems, news, location.pathname, categories, query, height, headerColor])

}

export default Header;