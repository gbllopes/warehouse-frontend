import React from 'react';
import { Container, Box, TextField, Grid } from '@material-ui/core';
import TablePageable from './TablePageable';
import '../css/UserPermission.css';
import history from '../history';

class UserPermission extends React.Component{

    colunas = [
        {
            tittle: "Nome",
            atributo: "noResponsavel"
        },
        {
            tittle: "Email",
            atributo: "usuario.email"
        },
        {
            tittle: "Data de Nascimento",
            atributo: "dataNascimentoResponsavel"
        }
    ]

    actions= [
        {
            tittle: 'Gerenciar Permissões',
            icon: 'https',
            callback: (item,index)=> history.push(`/user/permission/edit/${item.idResponsavel}`)
        },
        {
            tittle: 'Editar Usuario',
            icon: 'create',
            callback: ()=> console.log("chamando action Editar")
        }
    ]

    render(){
        return(
            <div>
                <Container fixed >
                    <Box boxShadow={3} pt={3}>
                        <Container>
                            <Box boxShadow={3} pt={3}>
                                <Grid>
                                    <TextField name="Nome" label="Nome"/>
                                </Grid>
                            </Box>
                        </Container>
                    </Box>

                <div className="table">
                    <TablePageable columns={this.colunas} data={this.props.data} actions={this.actions} />
                </div>
                </Container>
            </div>
        )
    }
}

export default UserPermission;
