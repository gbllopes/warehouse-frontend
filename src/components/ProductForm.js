import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import {rest} from '../authentication/tokenConfig';

import { TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';


const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(0,1,5,5),
        width: 300,
    },
    cardInsert:{
        padding:'20px 20px',
        marginBottom: '10px',
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
               >
                   {children}
               </Select>    
               
            </>    
        );
    }


    renderFieldInput = ({
        input,
        label,
        placeholder,
        className,
        type,
    }) => {
        return (
          <TextField 
            label={label}
            required
            type={type}
            placeholder={placeholder}
            className={className}
            {...input}   
          />
          
        );
    }

    myFormSubmit = (formValues) =>{
        this.props.onSubmit(formValues);
    }

    render(){
        const { classes } = this.props;
        return (
            <Container fixed>
            <Box boxShadow={3} className={classes.container}>
                <h2 style={{ marginLeft: '28px' }}>{this.props.title}</h2>
                <Container> 
                    <Grid container>
                        <form className={classes.form} autoComplete="off" noValidate onSubmit={this.props.handleSubmit(this.myFormSubmit)}>
                            <Grid item className={classes.cardInsert} xs={12} >                
                                    <Field 
                                        name="marca" 
                                        label="Marca" 
                                        component={this.renderFieldInput} 
                                        placeholder="Marca do Produto" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="fabricante" 
                                        label="Fabricante" 
                                        component={this.renderFieldInput} 
                                        placeholder="Fabricante" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="tipo" 
                                        label="Tipo de Produto" 
                                        component={this.renderFieldInput} 
                                        placeholder="Tipo de Produto" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="qtde_produto" 
                                        label="Qtde em Estoque"  
                                        type="number"
                                        component={this.renderFieldInput} 
                                        placeholder="Qtde em estoque" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="cod_produto" 
                                        label="Cod. Produto"  
                                        type="text"
                                        component={this.renderFieldInput} 
                                        placeholder="Código do Produto" 
                                        className={classes.textField}
                                    />
                                    <FormControl className={classes.textField}>
                                        <Field
                                            name="setor"
                                            label="Setor"
                                            component={this.renderSelectInput}
                                            placeholder="Setor do Produto"
                                            className={classes.selectEmpty}
                                        >
                                            {this.state.setores.map((setor) =>{
                                                return  <MenuItem key={setor.idSetor} value={setor}>{setor.dsSetor}</MenuItem>
                                            })}
                                        </Field>
                                    </FormControl>
                                    
                            </Grid>
                            <Box>
                                <Button type="submit" variant="contained" color="primary" >
                                    {(this.props.action === 'add' ? 'Adicionar' : 'Editar')}
                                    <Icon style={{marginLeft: '5px'}}>send</Icon>
                                </Button>
                                <Button variant="contained" color="secondary" style={{margin: '10px'}}>
                                        Sair
                                        <CloseIcon/>
                                </Button>
                            </Box>    
                        </form>       
                </Grid>
               </Container>
            </Box> 
            </Container>
        );
    }    

}

export default reduxForm({
    form: 'productForm'
})(withStyles(styles)(ProductForm))