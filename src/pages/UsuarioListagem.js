import React from 'react';
import UserList from "../components/UserList";
import { rest } from '../authentication/tokenConfig';
import SearchData from '../components/SearchData';
import { Container } from '@material-ui/core';


class UsuarioListagem extends React.Component{
    state = {responsavel: []}
    componentDidMount = async() => {
        this.fetchResponsavel();
    }

    buscarPorNome = async (nome) => {
        const response = await rest('').get(`responsavel/buscar-nome/${nome}`);
        this.setState({responsavel: response.data});
    }

    fetchResponsavel = async () => {
        const response = await rest('').get('responsavel')
        this.setState({responsavel: response.data})
    }


    render(){
        return (
            <div>
                <Container fixed>
                    <SearchData
                        buscarPorNome={this.buscarPorNome}
                        fetchAll={this.fetchResponsavel}
                        title="Filtrar Responsavel"
                        />
                    <UserList data={this.state.responsavel} />
                </Container>
            </div>
        );
    }
}

export default UsuarioListagem;
