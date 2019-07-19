import React from "react";
import { connect } from "react-redux";
import { load } from "../actions/data";
import history from "../history";
import { Router, Route, Switch } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import Login from "../pages/Login";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import PrivateRoute from "../components/PrivateRoute";
import ProductAdd from "../pages/products/ProductAdd";
import ProductEdit from "../pages/products/ProductEdit";
import UsuarioCadastro from "../pages/UsuarioCadastro";

class App extends React.Component{


  renderLoad(){
    window.setTimeout(() => {
      this.props.load(false);
    }, 2000);

    return (
      <React.Fragment>
          <div style={{ marginTop: "15%", marginLeft: "48%" }}>
            <CircularProgress size={30} />
          </div>
        </React.Fragment>
    );
  }


  render(){
    if(this.props.loading){
       return <div>{this.renderLoad()}</div>
    }
    return (

      <div>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <NavBar>
              <PrivateRoute isAutenticado={this.props.isAutenticado.logado} path='/home' exact component={Home} />
              <PrivateRoute isAutenticado={this.props.isAutenticado.logado} path='/products/add' exact component={ProductAdd} />
              <PrivateRoute isAutenticado={this.props.isAutenticado.logado} path='/products/edit' exact component={ProductEdit} />
              <PrivateRoute isAutenticado={this.props.isAutenticado.logado} path='/user/register' exact component={UsuarioCadastro} />
            </NavBar>
          </Switch>
        </Router>
      </div>
    );
  };

};

const myStateToProps = state => {
  return { loading: state.loaded, isAutenticado:state.isAutenticado}
};
export default connect(
  myStateToProps,
  { load }
)(App);
