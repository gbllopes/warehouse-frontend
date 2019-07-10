import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import googleIcon from '../icons/google-icon.png';
import '../css/SignIn.css';

import { Field, reduxForm } from 'redux-form';
import { FormHelperText, FormControl } from '@material-ui/core';

const renderTextField = (
  { input,
    label, 
    name,
    id,
    type,
    meta: { touched, error, invalid},
    ...custom,
    
  }) => {
    console.log(error)
    return (
      
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type={type}
          id={id}
          name={name}
          label={label}
          {...input}
          {...custom}
          error={touched && invalid}
        />
        <FormControl error>
            {touched && invalid && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        </div>
    )
  }  
        
  
class SignIn extends React.Component{


  onFormSubmit = (formValues) =>{
    this.props.onSubmit(formValues);
  }

  render(){
      return (
          <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                  <Avatar className="avatar">
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}  noValidate>
                    <Field 
                      name="email" 
                      component={renderTextField} 
                      type="text" 
                      id="email"
                      label="Email"
                      />
                    <Field
                      name="password"
                      component={renderTextField}
                      type="password"
                      id="password"
                      label="Password"
                      autoComplete="current-password"
                      />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submit"
                    >
                      Sign In
                    </Button>
                    <Grid container style={{ height: '15px'}}>
                        <div className="lineOr" />
                          <div className="orOption" >OR</div>
                        <div className="lineOr" />
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      className="googleButton"   
                    >
                      <img src={googleIcon} alt="google icon" />
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
                <Box mt={5}>
                </Box>
          </Container>
          </div>
        );
      }   
}  

const validate = (formValues) =>{
  const errors = {}
  if (!formValues.email){
    errors.email = "The email is required";
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)){
    errors.email = "Invalid email address";
  }
  if(!formValues.password){
    errors.password = "The password is required";
  }
  return errors;
}

export default reduxForm({
    form: 'signInForm',
    validate
})(SignIn);
