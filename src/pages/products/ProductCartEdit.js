import React from 'react';
import ProductCartEditForm from '../../components/ProductCartEditForm';
import { connect } from 'react-redux';
import { editFromCart } from '../../actions/product';

class ProductCartEdit extends React.Component{
    
    onSubmitForm = (values, id) =>{
        this.props.editFromCart(values, id);
    }

    render(){
        return (
            <ProductCartEditForm 
                onSubmit={this.onSubmitForm} 
                title="Editar" 
                initialValues={this.props.item} 
                index={this.props.index}
            />
        );
    }
    
}

export default connect(null,{ editFromCart })(ProductCartEdit);