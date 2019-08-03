import React from 'react';
import { Container, Box, TextField, Grid, Button, Icon } from '@material-ui/core';
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
                                <div style={{margin: '50px'}}>
                                    <h2>Filtrar Responsaveis</h2>
                                    <Grid>
                                        <TextField name="Nome" label="Nome" variant="outlined" fullWidth/>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" >
                                        <div className="button">
                                            <Button variant="contained" color="primary">
                                                <Icon>search</Icon>
                                                Pesquisar
                                            </Button>
                                        </div>
                                    </Grid>
                                </div>
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
