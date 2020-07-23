import React, {useMemo, useRef, useEffect, useCallback} from "react";
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
import PageTitle from "./PageTitle";
import {checkLogin} from "../../providers/AuthProvider/actions";

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  color: ${({color}) => color};
  z-index: 2;
  transition: fill .25s ease;
  background-color: ${({bgColor}) => bgColor};
`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))

    const headerEl = useRef(null);

    const categories = useSelector(state => state.woocommerce['products-categories'])

    const navLinks = [
        {name: 'shop', url: '/shop'},
        {name: 'collection', url: '/collection'},
        {name: 'made to order', url: '/made-to-order'},
        {name: 'about', url: '/about'},
        // {name: 'stockists', url: '/stockists'},
    ]
    const dispatch = useDispatch()
    const { authenticated  } = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wishlist)
    const { headerColor, height, open, sizeGuideOpen  } = useSelector(state => state.header)

    const cartItems = cart.length;
    const wishListItems = wishlist.length;

    let location = useLocation()
    let query = useQuery()

    const bgColor = useCallback(() => {
        switch (location.pathname) {
            case '/':
                return 'transparent'
            case '/about':
                return '#000'
            default:
                return '#fff'
        }
    },[location.pathname])

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user.authenticated && !user.authenticating) dispatch(checkLogin());
        if(headerEl.current?.offsetHeight && headerEl.current.offsetHeight !== height) {
            dispatch(setHeaderHeight(headerEl.current.offsetHeight))
            if(isMobile) {
                document.documentElement.style.scrollPaddingTop = `${headerEl.current.offsetHeight}px`
            }
        }
        if(location.pathname === '/about') dispatch(setHeaderColor('#fff', '#fff'))
        else if(location.pathname !== '/') dispatch(setHeaderColor('#000', '#000'))
    }, [dispatch, height, isMobile, location.pathname, user.authenticated, user.authenticating])

    const cPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

    const pageTitle = useCallback(() => {
        if (location.pathname.startsWith('/account')) return ['account', null]
        if (location.pathname.startsWith('/made-to-order')) return ['made to order', null]
        if (location.pathname.startsWith('/about')) return ['about', null]
        if (location.pathname.startsWith('/stockists')) return ['stockists', null]
        if (location.pathname.startsWith('/bag')) return ['shopping bag', cartItems]
        if (location.pathname.startsWith('/wishlist')) return ['wishlist', wishListItems]
        if (location.pathname.startsWith('/customer-service')) return ['customer service', null]
        if (location.pathname.startsWith('/legal-area')) return ['legal area', null]
        if (location.pathname.startsWith('/checkout')) return ['checkout', null]
        return [];
    },[cartItems, location.pathname, wishListItems])

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
                        {!open && !sizeGuideOpen && <NewsFeed />}
                        {!open && !sizeGuideOpen && location.pathname.startsWith('/shop') && (
                            <div style={{width: '100%', height: '25px'}}>
                                {categories && <Filters isMobile={isMobile} categories={categories} activeCategory={query.get('category') || 'view-all'} />}
                            </div>
                        )}
                        {!open && !sizeGuideOpen && location.pathname.startsWith('/collection') &&  (
                            <div style={{width: '100%', height: '25px'}}>
                                {categories && <Filters isCollection isMobile={isMobile} categories={categories.filter(ct => ct.slug !== 'view-all')} activeCategory={cPath === 'collection' ? categories.filter(ct => ct.slug !== 'view-all')[0].slug : cPath} />}
                            </div>
                        )}
                        {!open && !sizeGuideOpen && pageTitle()[0] && <PageTitle title={pageTitle()[0]} amount={pageTitle()[1]} />}
                    </AppBar>
                    <div style={{width: '100%', height: `calc(${height}px`}} />
                </React.Fragment>
            ) : (
                <HeaderWrapper ref={headerEl} color={headerColor} bgColor={bgColor}>
                    <Container>
                        <NewsFeed />
                        <LogoBar fill={headerColor} height={43} />
                        {!sizeGuideOpen && (
                            <React.Fragment>
                                <NavBar
                                    navLinks={navLinks}
                                    cartItems={cartItems}
                                    wishlistItems={wishListItems}
                                    currentPath={location.pathname}
                                    authenticated={authenticated}
                                />
                                {location.pathname.startsWith('/shop') && (
                                    <div style={{width: '100%', height: '19px'}}>
                                        {categories && <Filters isMobile={isMobile} categories={categories} activeCategory={query.get('category') || 'view-all'} />}
                                    </div>
                                )}
                                {location.pathname.startsWith('/collection') && (
                                    <div style={{width: '100%', height: '19px'}}>
                                        {categories && <Filters isCollection isMobile={isMobile} categories={categories.filter(ct => ct.slug !== 'view-all')} activeCategory={cPath === 'collection' ? categories.filter(ct => ct.slug !== 'view-all')[0].slug : cPath} />}
                                    </div>
                                )}
                                {!open && pageTitle()[0] && <PageTitle title={pageTitle()[0]} amount={pageTitle()[1]} />}
                            </React.Fragment>
                        )}
                    </Container>
                </HeaderWrapper>
            )}
        </React.Fragment>

    ), [isMobile, authenticated, open, navLinks, cartItems, wishListItems, sizeGuideOpen, location.pathname, categories, query, cPath, pageTitle, height, headerColor, bgColor])

}

export default Header;