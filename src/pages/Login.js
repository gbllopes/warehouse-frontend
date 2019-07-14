import React from 'react';
import SignIn from '../components/SignIn';
import {connect} from 'react-redux';
import { autenticarUsuario } from '../actions/login';

class Login extends React.Component{


    onSubmit = async (formValues) =>{
      this.props.autenticarUsuario(formValues);
    }

    render(){
      console.log("RENDER")
      return (
        <div>
          <SignIn onSubmit={this.onSubmit} />
        </div>
      )
    }
}
const myStateToProps = (state) =>{
  return state;
}
export default connect(myStateToProps, {autenticarUsuario})(Login);
