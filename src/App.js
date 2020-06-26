import React, {useEffect} from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import {connect} from "react-redux"
import {checkLogin} from "./providers/AuthProvider/actions"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import materialTheme from './material-styles'
import useWordpressData from "./providers/WordpressDataProvider"

import Home from './containers/Pages/Home'
import Shop from './containers/Pages/Shop'
import About from './containers/Pages/About'
import Account from './containers/Pages/Account'
import Collection from './containers/Pages/Collection'
import Stockist from './containers/Pages/Stockist'
import GlobalStyle from './global-styles'
import Header from "./containers/Header"
import Footer from "./containers/Footer"
import Error from "./containers/Pages/Error"
import ShoppingBag from "./containers/Pages/ShoppingBag";
import Wishlist from "./containers/Pages/Wishlist";
import Checkout from "./containers/Pages/Checkout";
import useWoocommerceData from "./providers/WoocommerceDataProvider";

function App(props) {
    useWordpressData('news_feed', [])
    useWoocommerceData('data/countries', [])
    useEffect(() => {
        if (!props.user.authenticated && !props.user.authenticating) props.checkLogin();
    }, [props])
    const currentPath = useLocation()

    return (
        <ThemeProvider theme={createMuiTheme(materialTheme)}>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/shop/:slug?" component={Shop} />
                <Route exact path="/about" component={About} />
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/stockist" component={Stockist} />
                <Route exact path="/bag" component={ShoppingBag} />
                <Route exact path="/wishlist" component={Wishlist} />
                <Route exact path="/checkout" component={Checkout} />
                <Route path="/account" component={Account} />
                <Route exact path="/error/:section/:code" component={Error} />
            </Switch>
            {currentPath.pathname !== '/checkout' && <Footer />}
            <GlobalStyle />
        </ThemeProvider>
    )
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = {
    checkLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)