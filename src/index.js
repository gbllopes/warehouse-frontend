import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';


import App from './app/App';
import reducers from './reducers';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));



ReactDOM.render(
    <Provider store={store}>
        <App />

    </Provider>,
    document.querySelector("#root")
)
