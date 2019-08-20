import React from 'react';
import ProductCartEditForm from '../../components/ProductCartEditForm';
import { connect } from 'react-redux';
import { editFromCart } from '../../actions/product';

class ProductCartEdit extends React.Component{
    
    state = { product : (this.props.item ? this.props.item : null)}

    onSubmitForm = (values, id) =>{
        this.props.editFromCart(values, id);
        this.setState({ product : values });
    }

    render(){
        return (
            <ProductCartEditForm 
                onSubmit={this.onSubmitForm} 
                title="Editar" 
                initialValues={this.state.product} 
                index={this.props.index}
            />
        );
    }
    
}

export default connect(null,{ editFromCart })(ProductCartEdit);