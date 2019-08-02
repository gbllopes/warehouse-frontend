import React from 'react';
import { Container, Grid, TextField, Box } from '@material-ui/core';
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { rest } from '../authentication/tokenConfig';
import '../css/EditarPermissao.css'

class EditarPermissao extends React.Component{

    state = {permissao: [], permissoesSelecionadas: []}

    componentDidMount = async () =>{
        const response = await rest('').get('/permissao');
        this.setState({permissao: response.data})
    }

    renderChips(){
        return this.state.permissao.map(item => (
            <Chip
                key={item.idPermissao}
                label={item.dsPermissao}
                onClick={() => ''}
                onDelete={() => ''}
                deleteIcon={<DoneIcon />}
            />
        ))
    }
    render(){
        return(
            <Container fixed >
                <Box boxShadow={3} pt={3}>
                    <Container>
                        <Box boxShadow={3} pt={3}>
                            <h2>Selecione as Permissões para o usuario</h2>
                            <Grid container>
                                <Grid item xs={6}>
                                    <h3>Permissões selecionadas</h3>
                                    <TextField name="Nome" label="Nome" />
                                </Grid>
                                <Grid item xs={6}>
                                    <h3>Lista de Permissões</h3>
                                    <div className="permissao">
                                        {this.renderChips()}
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </Container>
        )
    }
}


export default EditarPermissao;
