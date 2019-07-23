import React from 'react';
import ProductForm from '../../components/ProductForm';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import { productsCurrentAdd } from '../../actions/product'
import { Container } from '@material-ui/core';
import TablePageable from '../../components/TablePageable';

class ProductAdd extends React.Component{

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

    obj = [
        {
            nome: "Sabao pra pele",
            fabricante: "GO",
            qtdeEmEstoque: "20",
            codProduto: "303232",
            setor: "5646",
            ex: "",
            ex2: ""
        },
        {
            nome: "Sabao pra pele",
            fabricante: "GO",
            qtdeEmEstoque: "20",
            codProduto: "303232",
            setor: "5646",
            ex: "",
            ex2: ""
        }
    ];

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
       console.log(this.props.products)
   return (
      <>
         <ProductForm title="Cadastro de Produtos" action="add" onSubmit={this.onSubmitToTable}/>
         <Container fixed>
            <Box boxShadow={5}>
               <Grid>
                  {this.renderProductList(this.props.products)}
                   <TablePageable data={this.props.products} columns={this.colunas} />
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



