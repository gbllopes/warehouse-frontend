import React from 'react';
import ProductForm from '../../components/ProductForm';
import { productEdit } from '../../actions/product';
import { connect } from 'react-redux';

class ProductEdit extends React.Component{

    state = { product : (this.props.product ? this.props.product: null)}

    onFormEditSubmit = (product) =>{
        this.props.productEdit(product); 
        this.setState({ product }) 
    }


    render(){
        return (
        
            <ProductForm 
                title="Edição de Produto" 
                action="edit" 
                initialValues={this.state.product}
                onSubmit={this.onFormEditSubmit}
            />
        );
    } 

}

export default connect(null, { productEdit })(ProductEdit);