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
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';


const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    submitButton: {
        margin: '10px 0'
    },
    cardInsert:{
        padding:'20px 20px',
        margin: '2px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14)'+
                    '0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width:'10px'
    },
    container: {    
         marginBottom: '20px'  
      },
      title: {
        height: '28px',
        lineHeight: '30px',
        fontSize: '15px'
      },
});

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
            placeholder={placeholder}
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
        const { classes } = this.props;
        return (
            <Container fixed >
            <Box boxShadow={3} className={classes.container} pt={3}>
                <Container> 
                <Typography variant="h6" gutterBottom>
                    {this.props.title}
                </Typography>
                <form className={classes.form} autoComplete="off" noValidate onSubmit={this.props.handleSubmit(this.myFormSubmit)}>
                    <Grid container spacing={3} className={classes.cardInsert}>      
                        <Grid item xs={12} md={4} >
                            <Field 
                                name="marca" 
                                label="Marca" 
                                component={this.renderFieldInput} 
                                placeholder="Marca do Produto"  
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field 
                                name="fabricante" 
                                label="Fabricante" 
                                component={this.renderFieldInput} 
                                placeholder="Fabricante" 
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field 
                                name="tipo" 
                                label="Tipo de Produto" 
                                component={this.renderFieldInput} 
                                placeholder="Tipo de Produto" 
                            />    
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field 
                                name="qtde_produto" 
                                label="Qtde em Estoque"  
                                type="number"
                                component={this.renderFieldInput} 
                                placeholder="Qtde em estoque" 
                            />
                        </Grid> 
                        <Grid item xs={12} md={4}>
                            <Field 
                                name="cod_produto" 
                                label="Cod. Produto"  
                                type="text"
                                component={this.renderFieldInput} 
                                placeholder="Código do Produto" 
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
                    <Grid xs={12} style={{ textAlign: 'right'}}>
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
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
        'marca',
        'fabricante',
        'tipo',
        'cod_produto',
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
})(withStyles(styles)(ProductForm))