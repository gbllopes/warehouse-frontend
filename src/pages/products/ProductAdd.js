import React from 'react';
import ProductForm from '../../components/ProductForm';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {rest} from '../../authentication/tokenConfig';
import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';
import { productsCurrentAdd, produtcsAdd, cleanProducts } from '../../actions/product'
import { Container } from '@material-ui/core';
import TablePageable from '../../components/TablePageable';
import '../../css/Form.css';

class ProductAdd extends React.Component{

   state = { empresa: null}
   async componentDidMount(){
      await rest('').get('/responsavel').then(response =>{
         this.setState({ empresa : response.data.empresa})
      })
   }  

    colunas = [
        {
            tittle: "Nome",
            atributo: "noProduto"
        },
        {
            tittle: "Fabricante",
            atributo: "fabricante"
        },
        {
            tittle: "Qtde em Estoque",
            atributo: "qtdeProduto"
        },
        {
            tittle: "Cod. Produto",
            atributo: "codigoProduto"
        },
    ];

   onSubmitSuccess(products){
      this.props.produtcsAdd(products)
      toastr.success("Sucesso","Produto(s) salvo(s) com sucesso");
      this.props.cleanProducts();
   }

   renderButtonSubmit(){
      return (
         <Button 
            disabled={this.props.products < 1 ? true : false} 
            type="submit" 
            variant="contained" 
            color="primary" 
            id="saveButton"
            onClick={()=> this.onSubmitSuccess(this.props.products)}
            >
             Salvar
            <SaveIcon style={{marginLeft: '5px'}}>send</SaveIcon>
         </Button>
      );
   }
   
   renderProductList = products =>{
         return (
            <TablePageable data={products} columns={this.colunas} actions={[]} />
         );
   }
   onSubmitToTable = (values) =>{
      this.props.productsCurrentAdd(values);
   }

   render(){
      console.log(this.props.products)
   return (
      <>
         <ProductForm title="Cadastro de Produtos" action="add" onSubmit={this.onSubmitToTable} initialValues={{empresa : this.state.empresa}} />
         <Container fixed>
            <Box boxShadow={5}>
               <Grid>
                  {this.renderProductList(this.props.products)}
                   
               </Grid>
            </Box>
            {this.renderButtonSubmit()}
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
export default connect(mapStateToProps, 
   { 
     productsCurrentAdd,
     produtcsAdd,
     cleanProducts
   })(ProductAdd);



