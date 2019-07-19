import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'

import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { FormHelperText } from "@material-ui/core";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addCompany } from '../actions/company';
import '../css/Form.css';




class EmpresaCadastro extends React.Component{

    onCompanyFormSubmit = (formValues) =>{
        this.props.addCompany(formValues);
    }

    renderFieldInput = ({
        input,
        label,
        placeholder,
        type,
        meta: {touched, error},
        ...custom
    }) => { 
        return (
          <> 
          <TextField 
            label={label}
            required
            fullWidth
            type={type}
            error={error && touched} 
            {...input}
            {...custom} 
            
          /> 
         <FormControl>
            { touched && error && <FormHelperText>{error}</FormHelperText>}  
         </FormControl>
          </>
        );
    }
    render(){
        return (
            <Container fixed >
                <Box boxShadow={3} id="container" pt={3}>
                    <Container> 
                    <Typography variant="h6" gutterBottom>
                        Cadastro de Empresa
                    </Typography>
                    <form id="formContent" autoComplete="off" noValidate onSubmit={this.props.handleSubmit(this.onCompanyFormSubmit)}>
                        <Grid container spacing={3} id="cardContent">      
                            <Grid item xs={12} sm={12} >
                                <Field 
                                    name="razao_social" 
                                    label="Nome/Razão Social" 
                                    component={this.renderFieldInput}   
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={4}>
                                <Field 
                                    name="sigla" 
                                    label="Sigla da Empresa" 
                                    component={this.renderFieldInput} 
                                />    
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field 
                                    name="cnpj" 
                                    label="CNPJ"  
                                    component={this.renderFieldInput} 
                                />
                            </Grid> 
                            <Grid item xs={12} sm={4}>
                                <Field 
                                    name="telefone" 
                                    label="Telefone"  
                                    component={this.renderFieldInput} 
                                />   
                            </Grid>     
                            <Grid item xs={12} sm={3}>
                                <Field 
                                    name="data_fundacao" 
                                    label="Data da Fundação"  
                                    component={this.renderFieldInput} 
                                />  
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Field 
                                    name="email" 
                                    label="Email" 
                                    component={this.renderFieldInput} 
                                />
                            </Grid>                               
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right'}} >
                            <Button type="submit" variant="contained" color="primary" id="saveButton">
                                Salvar
                                <Icon style={{marginLeft: '5px'}}>send</Icon>
                            </Button>
                        </Grid> 
                    </form> 
                </Container>
                </Box> 
            </Container>
        );
    }
}

const validate = formValues =>{
    const errors = [];
    const requiredFields = [
        'razao_social',
        'sigla',
        'cnpj',
        'telefone',
        'data_fundacao',
        'email'
    ]

    requiredFields.forEach(field =>{
        if(!formValues[field]){
            errors[field] = "Campo Obrigatório";
        }
    })


    return errors;
}

export default reduxForm({
    form:'companyForm',
    validate
})(connect(null, { addCompany })(EmpresaCadastro));