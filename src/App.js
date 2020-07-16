import React, {useMemo} from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import materialTheme from './material-styles'
import useWordpressData from "./providers/WordpressDataProvider"
import useData from "./providers/WoocommerceDataProvider/useData";

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
import MadeToOrder from "./containers/Pages/MadeToOrder";
import CustomerService from "./containers/Pages/CustomerService";
import LegalArea from "./containers/Pages/LegalArea";

function App() {
    useData()
    const newsFeed = useWordpressData('news_feed', [])
    const currentPath = useLocation()

    return (useMemo(() => (
        <ThemeProvider theme={createMuiTheme(materialTheme)}>
            <Header news={newsFeed}  />
            <div style={{minHeight: '100vh', backgroundColor: currentPath.pathname === '/about' && '#000'}}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/shop/:slug?" component={Shop} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/made-to-order" component={MadeToOrder} />
                    <Route exact path="/collection/:slug?" component={Collection} />
                    <Route exact path="/stockists" component={Stockists} />
                    <Route exact path="/bag" component={ShoppingBag} />
                    <Route exact path="/wishlist" component={Wishlist} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route path="/account" component={Account} />
                    <Route path="/customer-service" component={CustomerService} />
                    <Route path="/legal-area" component={LegalArea} />
                    <Route exact path="/error/:section/:code" component={Error} />
                </Switch>
            </div>
            {currentPath.pathname !== '/checkout' && <Footer />}
            <GlobalStyle />
        </ThemeProvider>
    ),[currentPath.pathname, newsFeed]))
}

export default App