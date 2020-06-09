import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from "react-redux";
import {checkLogin} from "./providers/AuthProvider/actions";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import materialTheme from './material-styles';
import useWordpressData from "./providers/WordpressDataProvider";

import Home from './containers/Pages/Home';
import Shop from './containers/Pages/Shop';
import About from './containers/Pages/About';
import Collection from './containers/Pages/Collection';
import Stockist from './containers/Pages/Stockist';
import GlobalStyle from './global-styles';
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Error from "./containers/Pages/Error";

function App(props) {
    useEffect(() => {
        if (!props.authenticated && !props.authenticating) props.checkLogin();
    }, [props]);

    useWordpressData('news_feed', []);

    return (
        <ThemeProvider theme={createMuiTheme(materialTheme)}>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/shop/:slug?" component={Shop} />
                <Route exact path="/about" component={About} />
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/stockist" component={Stockist} />
                <Route exact path="/error/:section/:code" component={Error} />
            </Switch>
            <Footer />
            <GlobalStyle />
        </ThemeProvider>
    );
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    authenticating: state.user.authenticating,
})

const mapDispatchToProps = {
    checkLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);