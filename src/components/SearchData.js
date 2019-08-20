import React from 'react';
import { Container, Box, TextField, Grid, Button, Icon } from '@material-ui/core';


class SearchData extends React.Component{

    state = { nome: "" };

    limparForm() {
        this.setState({ nome: "" })
        this.props.fetchAll();
    }

    render(){
        return(
            <Box boxShadow={3} p={3}>
                <Container>
                    <Box>
                        <div style={{ margin: '50px' }}>
                            <h2>{this.props.title}</h2>
                            <Grid>
                                <TextField
                                    name="Nome"
                                    label="Nome"
                                    variant="outlined"
                                    value={this.state.nome}
                                    onChange={(event) => this.setState({ nome: event.target.value })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center" >
                                <div className="button">
                                    <Button variant="contained" color="secondary" onClick={() => this.limparForm()}>
                                        <Icon>highlight_off</Icon>
                                        Limpar
                                    </Button>
                                </div>
                                <div className="button">
                                    <Button variant="contained" color="primary" onClick={() => this.props.buscarPorNome(this.state.nome)}>
                                        <Icon>search</Icon>
                                        Pesquisar
                                    </Button>
                                </div>
                            </Grid>
                        </div>
                    </Box>
                </Container>
            </Box>
        )
    }
}


export default SearchData;
