import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'

import * as cnpj from "@fnando/cnpj";
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { FormHelperText } from "@material-ui/core";
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { addCompany } from '../actions/company';
import '../css/Form.css';
import { rest } from '../authentication/tokenConfig';
import {toastr} from 'react-redux-toastr';

class EmpresaCadastro extends React.Component{

    state = { empresaCadastrada: null , cnpjEmpresa: null};


    async componentDidMount(){
        await rest("").get("/responsavel/logado").then(response =>{
            this.setState({empresaCadastrada: response.data[0].empresa});
        });
    }

    onCompanyFormSubmit = (formValues,e) =>{
        formValues.nr_cnpj_empresa = cnpj.strip(formValues.nr_cnpj_empresa);
        this.props.addCompany(formValues);
        toastr.success("Sucesso","Sua empresa foi cadastrada.")
    }

    renderFieldInput = ({
        input,
        label,
        placeholder,
        type,
        value,
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
            value={value}
            error={error && touched}
            {...input}
            {...custom}

          />
         <FormControl>
            { touched && error && <FormHelperText error>{error}</FormHelperText>}
         </FormControl>
          </>
        );
    }

    render(){
        if(this.state.empresaCadastrada){
            return(
                toastr.error('Erro', 'Empresa já está cadastrada')
            );
        } else {
            return (
                <Container fixed >
                    <Box boxShadow={3} id="container" pt={3}>
                        <Container>
                        <Typography variant="h6" gutterBottom>
                            Cadastro de Empresa
                        </Typography>
                        <form id="formContent" autoComplete="off" noValidate onSubmit={this.props.handleSubmit(this.onCompanyFormSubmit)} ref="form">
                            <Grid container spacing={3} id="cardContent">
                                <Grid item xs={12} sm={12} >
                                    <Field
                                        name="no_razao_social"
                                        label="Nome/Razão Social"
                                        component={this.renderFieldInput}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="sigla_empresa"
                                        label="Sigla da Empresa"
                                        component={this.renderFieldInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="nr_cnpj_empresa"
                                        label="CNPJ"
                                        component={this.renderFieldInput}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name="telefone_empresa"
                                        label="Telefone"
                                        component={this.renderFieldInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Field
                                        name="data_fundacao_empresa"
                                        label="Data da Fundação"
                                        type="date"
                                        component={this.renderFieldInput}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Field
                                        name="email_empresa"
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
}

const afterSubmitSuccess = (result, dispatch) => dispatch(reset('companyForm'));

const validate = formValues =>{
    const errors = [];
    const requiredFields = [
        'no_razao_social',
        'sigla_empresa',
        'telefone_empresa',
        'data_fundacao_empresa',
        'nr_cnpj_empresa'
    ];
    requiredFields.forEach(field =>{
        if(!formValues[field]){
            errors[field] = "Campo de preenchimento obrigatório";
        }
    })

    if(!formValues.email_empresa){
        errors.email_empresa = "Campo de preenchimento obrigatório";
    }else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email_empresa)
    ) {
        errors.email_empresa = "Insira um endereço de email válido";
    }

    if(!formValues.nr_cnpj_empresa){
        errors.nr_cnpj_empresa = "Campo de preenchimento obrigatório"
    }else if (!cnpj.isValid(formValues.nr_cnpj_empresa)){
        errors.nr_cnpj_empresa = "Insira um CNPJ válido";
    }

    return errors;

}

export default reduxForm({
    form:'companyForm',
    validate,
    onSubmitSuccess: afterSubmitSuccess
})(connect(null, { addCompany })(EmpresaCadastro));
