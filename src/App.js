import React, {useEffect} from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {checkLogin} from "./providers/AuthProvider/actions"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import materialTheme from './material-styles'
import useWordpressData from "./providers/WordpressDataProvider"

import Home from './containers/Pages/Home'
import Shop from './containers/Pages/Shop'
import About from './containers/Pages/About'
import Account from './containers/Pages/Account'
import Collection from './containers/Pages/Collection'
import Stockists from './containers/Pages/Stockists'
import GlobalStyle from './global-styles'
import Header from "./containers/Header"
import Footer from "./containers/Footer"
import Error from "./containers/Pages/Error"
import ShoppingBag from "./containers/Pages/ShoppingBag";
import Wishlist from "./containers/Pages/Wishlist";
import Checkout from "./containers/Pages/Checkout";
import useWoocommerceData from "./providers/WoocommerceDataProvider";
import MadeToOrder from "./containers/Pages/MadeToOrder";
import CustomerService from "./containers/Pages/CustomerService";
import LegalArea from "./containers/Pages/LegalArea";

function App(props) {
    const newsFeed = useWordpressData('news_feed', [])
    const categories = useWoocommerceData('products/categories')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (!user.authenticated && !user.authenticating) dispatch(checkLogin());
    }, [dispatch, props, user.authenticated, user.authenticating])
    const currentPath = useLocation()

    return (
        <ThemeProvider theme={createMuiTheme(materialTheme)}>
            <Header categories={categories} news={newsFeed}  />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/shop/:slug?" component={() => <Shop categories={categories} />} />
                <Route exact path="/about" component={About} />
                <Route exact path="/made-to-order" component={MadeToOrder} />
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/stockists" component={Stockists} />
                <Route exact path="/bag" component={ShoppingBag} />
                <Route exact path="/wishlist" component={Wishlist} />
                <Route exact path="/checkout" component={Checkout} />
                <Route path="/account" component={Account} />
                <Route path="/customer-service" component={CustomerService} />
                <Route path="/legal-area" component={LegalArea} />
                <Route exact path="/error/:section/:code" component={Error} />
            </Switch>
            {currentPath.pathname !== '/checkout' && <Footer />}
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default App