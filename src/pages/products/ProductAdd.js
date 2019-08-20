import React from 'react';
import ProductForm from '../../components/ProductForm';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ProductCartEdit from '../products/ProductCartEdit';
import {rest} from '../../authentication/tokenConfig';
import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';
import { productsCurrentAdd, produtcsAdd, cleanProducts, deleteFromCart } from '../../actions/product'
import { Container } from '@material-ui/core';
import Modal from '../../components/Modal';
import TablePageable from '../../components/TablePageable';

import '../../css/Form.css';

class ProductAdd extends React.Component{

   state = { empresa: null , openModal: false, item: null, index:null}
   async componentDidMount(){
      await rest('').get('/responsavel/logado').then(response =>{
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
        {
            tittle: "Setor",
            atributo: "setor.dsSetor"
        }
    ];

    actions = [
        {
            tittle: 'Editar',
            icon: 'create',
            callback: (item, index) => this.setState({ openModal: true, item, index })
        },
        {
           tittle: 'Excluir',
           icon: 'delete_forever',
           callback: (item,index) => this.props.deleteFromCart(index)
        }
    ]


   async onSubmitSuccess(products){
      await this.props.produtcsAdd(products).then(()=>{
         if(this.props.products.status === 200){
            toastr.success("Sucesso","Produto(s) salvo(s) com sucesso");
            this.props.cleanProducts();
         }else{
            toastr.error("Erro ao cadastrar produto(s)");
         }
      })
   }

   renderButtonSubmit(){
      return (
         <Button
            disabled={this.props.productsCart < 1 ? true : false}
            type="submit"
            variant="contained"
            color="primary"
            id="saveButton"
            onClick={()=> this.onSubmitSuccess(this.props.productsCart)}
            >
             Salvar
            <SaveIcon style={{marginLeft: '5px'}}>send</SaveIcon>
         </Button>
      );
   }

   renderProductList = productsCart =>{
         return (
            <TablePageable data={productsCart} columns={this.colunas} actions={this.actions} />
         );
   }
   onSubmitToTable = (values) =>{
      this.props.productsCurrentAdd(values);
   }

   closeModal = (openModal) =>{
      this.setState({ openModal });
   }
   
   renderModal(){
      const { openModal, item, index } = this.state;
      if(openModal){
         return (
            <Modal title="Editar" open={openModal} onClose={this.closeModal}>
               <ProductCartEdit item={item} index={index}/>
            </Modal> 
         );
         
      }
   }

   render(){
      return (
         <>
            <ProductForm title="Cadastro de Produtos" action="add" onSubmit={this.onSubmitToTable} initialValues={{empresa : this.state.empresa}} />
            <Container fixed>
               <Box boxShadow={5}>
                  <Grid>
                     {this.renderProductList(this.props.productsCart)}
                  </Grid>
               </Box>
               {this.renderButtonSubmit()}
               {this.renderModal()}
            </Container>
         </>
      );
   }

}

const mapStateToProps = (state) =>{
   return {
      products: state.products,
      productsCart: state.productsCart
   }
}
export default connect(mapStateToProps,
   {
     productsCurrentAdd,
     produtcsAdd,
     cleanProducts,
     deleteFromCart
   })(ProductAdd);



