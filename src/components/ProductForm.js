import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import { FormHelperText } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import {rest} from '../authentication/tokenConfig';
import Typography from '@material-ui/core/Typography';

import { TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { Container } from '@material-ui/core';
import '../css/Form.css'


class ProductForm extends React.Component{
    state = { setores : [] };
    componentDidMount(){
        rest("").get("/setor").then(response => {
            this.setState({ setores: response.data});
        })   
    }

    renderSelectInput = ({
        input,
        placeholder,
        label,
        name,
        children,
        meta: {touched, error}
    }) => {
        return (
            <>
              <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
              <Select
                {...input}
                inputProps={{
                    name,
                    id: 'age-native-simple'
                }}
                placeholder={placeholder}
                error={touched && error}
                required
               >
                   {children}
               </Select>    
               <FormControl>
                    { touched && error && <FormHelperText>{error}</FormHelperText>}  
                </FormControl>
            </>    
        );
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

    myFormSubmit = (formValues) =>{
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <Container fixed >
            <Box boxShadow={3} id="container" pt={3}>
                <Container> 
                <Typography variant="h6" gutterBottom>
                    {this.props.title}
                </Typography>
                <form id="formContent" autoComplete="off" noValidate onSubmit={this.props.handleSubmit(this.myFormSubmit)}>
                    <Grid container spacing={3} id="cardContent">      
                        <Grid item xs={12} md={6} >
                            <Field 
                                name="noProduto" 
                                label="Nome" 
                                component={this.renderFieldInput}  
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field 
                                name="fabricante" 
                                label="Fabricante" 
                                component={this.renderFieldInput}  
                            />  
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field 
                                name="qtdeProduto" 
                                label="Qtde em Estoque"  
                                type="number"
                                component={this.renderFieldInput}  
                            />
                        </Grid> 
                        <Grid item xs={12} md={4}>
                            <Field 
                                name="codigoProduto" 
                                label="Cod. Produto"  
                                type="text"
                                component={this.renderFieldInput} 
                            />   
                        </Grid>     
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <Field
                                    name="setor"
                                    label="Setor"
                                    component={this.renderSelectInput}
                                    placeholder="Setor do Produto"
                                >
                                    {this.state.setores.map((setor) =>{
                                        return  <MenuItem key={setor.idSetor} value={setor}>{setor.dsSetor}</MenuItem>
                                    })}
                                </Field>
                            </FormControl>
                        </Grid>                               
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'right'}}>
                        <Button type="submit" variant="contained" color="primary" id="saveButton">
                            {(this.props.action === 'add' ? 'Adicionar' : 'Editar')}
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

const validate = (formValues) =>{
    const errors = {}
    const requiredFields = [
        'noProduto',
        'fabricante',
        'tipo',
        'codigoProduto',
    ]

    requiredFields.forEach(field => {
        if(!formValues[field]){
            errors[field] = 'Campo Obrigatório';
        }
    })

    if(!formValues.setor){
        errors.setor = "Campo Obrigatório";
    }

    if(!formValues.qtde_produto){
        errors.qtde_produto = "Campo Obrigatório"
    }else if (isNaN(Number(formValues.qtde_produto))){
        errors.qtde_produto = "Somente números são aceitos";
    }

    return errors;
}

export default reduxForm({
    form: 'productForm',
    validate
})(ProductForm)