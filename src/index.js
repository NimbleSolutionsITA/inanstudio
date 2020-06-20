import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import configureStore from "./configureStore";
import history from './history';
import ScrollToTop from "./components/ScrollToTop";

const initialState = {};
const store = configureStore(initialState, history);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop />
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
if (module.hot) { module.hot.accept(App);}