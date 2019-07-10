import React from 'react';
import SignIn from '../components/SignIn';


class Login extends React.Component{
    
    
    onSubmit = (formValues) =>{
        console.log(formValues)
    }

    render(){
        return (
            <div>          
                <SignIn onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default Login;