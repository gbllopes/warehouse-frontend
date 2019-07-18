import React from 'react';
import ProductForm from '../../components/ProductForm';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import { productsCurrentAdd } from '../../actions/product'
import { Container } from '@material-ui/core';

class ProductAdd extends React.Component{

   renderProductList = products =>{
      return products.map((product, index) =>{
         return (
            <div key={index}>{product.marca}</div>
         );
      })
   }
   onSubmitToTable = (values) =>{
      this.props.productsCurrentAdd(values);
   }

   render(){
   return (
      <>
         <ProductForm title="Cadastro de Produtos" action="add" onSubmit={this.onSubmitToTable}/>
         <Container fixed>
            <Box boxShadow={5}> 
               <Grid>
                  {this.renderProductList(this.props.products)}
               </Grid>
            </Box>   
         </Container>
      </> 
   );
   }
    
}

const mapStateToProps = (state) =>{
   return {
      products: state.products
   }
}
export default connect(mapStateToProps, { productsCurrentAdd })(ProductAdd);



