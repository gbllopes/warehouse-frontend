import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TablePageable from '../../components/TablePageable';
import Modal from '../../components/Modal';
import ProductForm from '../../components/ProductForm';

import { connect } from 'react-redux';
import { productList, productDelete, productEdit } from '../../actions/product';
import { Container } from '@material-ui/core';
import { rest } from '../../authentication/tokenConfig';

class ProductList extends React.Component{
    state = { openModal: false, item: null}

    async componentDidMount(){
        await rest('').get('/responsavel/logado').then(response => {
            this.props.productList(response.data.empresa.idEmpresa);
        }); 
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
            callback: (item) => this.setState({ openModal: true, item})
        },
        {
           tittle: 'Excluir',
           icon: 'delete_forever',
           callback: (item,index) => this.props.productDelete(index)
        }
    ]


    renderModal(){
        const { openModal, item } = this.state;
        if(openModal){
           return (
              <Modal title="Editar" open={openModal} onClose={this.closeModal}>
                    <ProductForm initialValues={item}/>
              </Modal> 
           );
           
        }
     }

    render(){
       return (
        <Container fixed >
            <Box boxShadow={3} id="container" pt={3} pb={4}>
                <Container> 
                
                    <Typography variant="h6" gutterBottom>
                    <div>
                        Estoque
                    </div>    
                    </Typography>
                    
                    <Box boxShadow={5}>
                        <TablePageable data={this.props.allProducts} columns={this.colunas} actions={this.actions}/>
                    </Box>

                </Container>
            </Box>
        </Container>    
       ); 
    }
}

const mapStateToProps = (state) =>{
    return { allProducts: Object.values(state.products) };
}
export default connect(mapStateToProps,
    {   productList, 
        productDelete, 
        productEdit 
    })(ProductList);