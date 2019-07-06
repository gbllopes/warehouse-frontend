import React from 'react';
import {connect} from 'react-redux';
import {load} from '../actions/data';
import history from '../history';
import {Router, Route, Switch} from 'react-router-dom';

import CircularProgress from "@material-ui/core/CircularProgress";

import Login from '../pages/Login'
import Home from '../pages/Home'

const App = (props) => {
    window.setTimeout(() => {
        props.load(false);
    }, 4000);

    const q = () => {
        
        if(props.loaded){
            return (
                <div style={{marginTop: "15%", marginLeft: "45%"}}>
                    <CircularProgress size={100} />
                </div>
            )
        }
       
       return(
            <div>
                Working...
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </Router>
            </div>
        )
    }

    return (
        <div>
            {q()}
        </div>
    )
}

const myStateToProps = state => {
    return state;
}
export default connect(myStateToProps, {load})(App);