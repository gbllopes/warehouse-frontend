import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TablePageable from '../../components/TablePageable';
import Modal from '../../components/Modal';
import ProductEdit from '../../pages/products/ProductEdit';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { productList, productDelete, productEdit } from '../../actions/product';
import { Container, Grid } from '@material-ui/core';
import { rest } from '../../authentication/tokenConfig';
import { TextField } from '@material-ui/core';
import { Field, reduxForm, reset } from 'redux-form';

import '../../css/Lista.css';


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
           callback: (item) => {
                this.props.productDelete(item.idProduto)
           }

        }
    ]

    closeModal = (openModal) =>{
        this.setState({ openModal });
    }

    renderModal(){
        const { openModal, item } = this.state;
        if(openModal){
           return (
              <Modal title="Editar" open={openModal} onClose={this.closeModal}>
                    <ProductEdit product={item}/>
              </Modal>
           );

        }
     }

     renderFieldInput = ({
        input,
        placeholder,
        label,
        type,
        ...custom
    }) => { 
        return (
          <> 
          <TextField 
            required
            placeholder="Buscar Produto..." 
            {...input}
            {...custom} 
            
          /> 
          </>
        );
    }   


    onSubmitSearch = (form) =>{
        console.log(form.search);
    }

    render(){
       return (
        <Container fixed >
            <Box boxShadow={3} id="container" pt={3} pb={4}>
                <Container>
                    <Typography variant="h6" gutterBottom>
                    <Grid container>
                        <Grid item xs={9} sm={9}>
                            Estoque
                        </Grid>
                        <Grid item xs={3} sm={3}>
                        <form onSubmit={this.props.handleSubmit(this.onSubmitSearch)} noValidate autoComplete="off">
                            <div id="search" >
                                <Field 
                                name="search"
                                style={{ paddingLeft: "65px"}}
                                fullWidth
                                component={this.renderFieldInput}  
                                />
                                <Button id="icon" type="submit">
                                    <SearchIcon />
                                </Button>
                            </div>   
                        </form>                                        
                        </Grid>
                    </Grid>
                    
                    </Typography>

                    <Box boxShadow={5}>
                        <TablePageable data={this.props.allProducts} columns={this.colunas} actions={this.actions}/>
                        {this.renderModal()}
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

const afterSubmitSuccess = (result, dispatch) => (dispatch(reset('searchForm')));


export default reduxForm({
    form:"searchForm",
    onSubmitSuccess: afterSubmitSuccess,
    enableReinitialize :true
})(connect(mapStateToProps,
    {
        productList,
        productDelete,
        productEdit
    })(ProductList));
