import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';
import ProductForm from '../components/ProductForm';

const styles = theme => ({
    content: {    
      marginTop: '20px',
      height: '500px'   
    },
    title: {
      height: '28px',
      lineHeight: '30px',
      fontSize: '15px'
    },
  });

const ProductAdd = (props) =>{
    const {classes} = props;
    return (
        <Container fixed>
            <Grid position="static" color="default" border={1}>
                <Box boxShadow={3} className={classes.content}>
                    <h2 style={{ marginLeft: '28px' }}>Cadastro de Produtos</h2>
                    <Container> 
                        <ProductForm />
                    </Container>
                </Box> 
            </Grid>
        </Container>
    );
}

export default withStyles(styles)(ProductAdd);



