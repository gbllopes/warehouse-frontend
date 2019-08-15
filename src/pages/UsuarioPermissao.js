import React from 'react';
import UserPermission from '../components/UserPermission'
import { rest } from '../authentication/tokenConfig';


class PermissaoUsuario extends React.Component{
    state = {responsavel: []}
    componentDidMount = async() => {
        const response = await rest('').get('responsavel')
        this.setState({responsavel: response.data})
    }

    render(){
        return(
            <div>
                <UserPermission data={this.state.responsavel} />
            </div>
        )
    }
}

export default PermissaoUsuario;
