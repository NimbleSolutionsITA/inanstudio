import React, {useMemo, useRef, useEffect} from "react";
import {useLocation} from "react-router";
import {connect} from "react-redux";
import useWoocommerceData from "../../providers/WoocommerceDataProvider";

import {setHeaderHeight, setHeaderColor, openDrawer} from "./actions";
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
  background-color: ${({pathname}) => pathname === '/' ? 'transparent' : '#fff'};
`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = (props) => {
    useWoocommerceData('products/categories', {})

    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))

    const headerEl = useRef(null);

    const navLinks = [
        {name: 'shop', url: '/shop'},
        {name: 'made to order', url: '/made-to-order'},
        {name: 'collection', url: '/collection'},
        {name: 'about', url: '/about'},
        {name: 'stockist', url: '/stockist'},
    ]
    const cartItems = props.cart.length;
    const wishListItems = props.wishlist.length;

    let location = useLocation()
    let query = useQuery()

    useEffect(() => {
        if(headerEl.current?.offsetHeight && headerEl.current.offsetHeight !== props.headerHeight) {
            props.setHeaderHeight(headerEl.current.offsetHeight)
            if(isMobile) {
                document.documentElement.style.scrollPaddingTop = `${headerEl.current.offsetHeight}px`
            }
        }
        if(location.pathname !== '/') props.setHeaderColor('#000', '#000')
    }, [isMobile, location.pathname, props])

    return useMemo(() => (
        <React.Fragment>
            {isMobile ? (
                <React.Fragment>
                    <AppBar
                        ref={headerEl}
                        authenticated={props.authenticated}
                        open={props.open}
                        openDrawer={props.openDrawer}
                        isMobile={isMobile}
                        navLinks={navLinks}
                        cartItems={cartItems}
                        wishlistItems={wishListItems}
                    >
                        {props.news?.length > 0 && !props.open && <NewsFeed isMobile={isMobile} currentNews={props.news} />}
                        {location.pathname === '/shop' && props.categories && (
                            <Filters isMobile={isMobile} categories={props.categories} activeCategory={query.get('category') || 'view-all'} />
                        )}
                    </AppBar>
                    <div style={{width: '100%', height: `calc(${props.headerHeight}px`}} />
                </React.Fragment>
            ) : (
                <HeaderWrapper ref={headerEl} color={props.headerColor} pathname={location.pathname}>
                    <Container>
                        {props.news?.length > 0 && <NewsFeed isMobile={isMobile} currentNews={props.news} />}
                        <LogoBar fill={props.headerColor} height={43} />
                        <NavBar
                            navLinks={navLinks}
                            cartItems={cartItems}
                            wishlistItems={wishListItems}
                            currentPath={location.pathname}
                            authenticated={props.authenticated}
                        />
                        {location.pathname.startsWith('/shop') && props.categories && (
                            <Filters isMobile={isMobile} categories={props.categories} activeCategory={query.get('category') || 'view-all'} />
                        )}
                    </Container>
                </HeaderWrapper>
            )}
        </React.Fragment>

    ), [isMobile, props.authenticated, props.open, props.openDrawer, props.news, props.categories, props.headerHeight, props.headerColor, navLinks, cartItems, wishListItems, location.pathname, query])

}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    headerColor: state.header.headerColor,
    headerColorMobile: state.header.headerColorMobile,
    news: state.wordpress['news-feed'],
    headerHeight: state.header.height,
    open: state.header.open,
    cart: state.cart,
    wishlist: state.wishlist,
    categories: state.woocommerce['products-categories'],
})

const mapDispatchToProps = {
    setHeaderHeight,
    setHeaderColor,
    openDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);