import React from 'react';
import SignIn from '../components/SignIn';
import {connect} from 'react-redux';

import { autenticarUsuario } from '../actions/login';
import history from '../history'

class Login extends React.Component{


    onSubmit = async (formValues) =>{
      await this.props.autenticarUsuario(formValues);
      if(this.props.isAutenticado.logado){
        history.push("/")
      }
    }

    render(){
      return (
        <div>
          <SignIn info={this.props} onSubmit={this.onSubmit} />
        </div>
      )
    }
}
const myStateToProps = (state) =>{
  return state;
}
export default connect(myStateToProps, {autenticarUsuario})(Login);
