import React from 'react';
import { TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

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
        marginBottom: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14)'+
                    '0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;',
    },
    cardImage:{
        marginLeft: theme.spacing(1),
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14)'+
                    '0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;',
    }
});

class ProductForm extends React.Component{
    
    
    renderField = ({
        input,
        label,
        placeholder,
        className,
        type,
    }) =>{
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

    render(){
        const { classes } = this.props;
        return (
           <React.Fragment>
               <Grid container>
                <form className={classes.form} autoComplete="off" noValidate>
                   <Grid item className={classes.cardInsert} xs={12} >                
                        <Field 
                            name="marca" 
                            label="Marca" 
                            component={this.renderField} 
                            placeholder="Marca do Produto" 
                            className={classes.textField}
                        />
                        <Field 
                            name="fabricante" 
                            label="Fabricante" 
                            component={this.renderField} 
                            placeholder="Fabricante" 
                            className={classes.textField}
                        />
                        <Field 
                            name="tipo" 
                            label="Tipo de Produto" 
                            component={this.renderField} 
                            placeholder="Tipo de Produto" 
                            className={classes.textField}
                        />
                        <Field 
                            name="qtde_produto" 
                            label="Qtde em Estoque"  
                            type="number"
                            component={this.renderField} 
                            placeholder="Qtde em estoque" 
                            className={classes.textField}
                        />
                        <Field 
                            name="cod_produto" 
                            label="Cod. Produto"  
                            type="text"
                            component={this.renderField} 
                            placeholder="Código do Produto" 
                            className={classes.textField}
                        />

                   </Grid>
                </form>       
               </Grid>
           </React.Fragment> 
        );
    }    

}


export default reduxForm({
    form: 'productForm',
})(withStyles(styles)(ProductForm))