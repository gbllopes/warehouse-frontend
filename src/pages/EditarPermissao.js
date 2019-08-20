import React from 'react';
import { Container, Grid, TextField, Box, Button } from '@material-ui/core';
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { rest } from '../authentication/tokenConfig';
import SaveIcon from '@material-ui/icons/Save';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FaceIcon from '@material-ui/icons/Face';
import '../css/EditarPermissao.css'
import { toastr } from 'react-redux-toastr';
import history from '../history'
import { connect } from 'react-redux';
import data from '../reducers/data'

class EditarPermissao extends React.Component{

    state = {
        permissao: [],
        permissoesSelecionadas: [],
        responsavel: {},
        nome: '',
        open: false
    }
    input = React.createRef();

    componentDidMount = async () =>{
        const {params} = this.props.match;
        const response = await rest('').get('/permissao');
        const response1 = await rest('').get(`responsavel/${params.id}`);
        this.setState({permissao: response.data})
        this.setState({responsavel: response1.data})
        this.setState({nome: this.state.responsavel.noResponsavel});
    }

    renderChips(){

        return this.state.permissao.map(item => (
                <div className="chip"key={item.idPermissao}>
                    <Chip
                        label={item.dsPermissao}
                        onClick={() => ''}
                        onDelete={() => this.addPermissions(item)}
                        color="primary"
                        deleteIcon={<DoneIcon />}
                        icon={<FaceIcon />}
                        />
                </div>
            )
        )
    }

    addPermissions = (item) =>{
        this.setState({permissoesSelecionadas: [...this.state.permissoesSelecionadas, item]})
        this.setState({permissao: this.state.permissao.filter(i => i.idPermissao !== item.idPermissao)});
    }

    excludePermissions = (item) =>{
        this.setState({permissao: [...this.state.permissao, item]})
        this.setState({permissoesSelecionadas: this.state.permissoesSelecionadas.filter(i => i.idPermissao !== item.idPermissao)});
    }

    onSubmit = () => {
        const responsavel = this.state.responsavel;
        responsavel.usuario.permissaoUsuario = this.state.permissoesSelecionadas;
        rest('').patch('/responsavel', responsavel).then(response => {
            toastr.success("Permissões cadastradas com sucesso");
            history.push("/user/permission")
        });
    }


    cancel = () =>{
        history.push("/user/permission");
    }


    render(){
        return(
            <Container fixed >
                <Box boxShadow={3} p={3}>
                    <Container fixed>
                        <Box boxShadow={3} p={2} >
                            <div className="content">
                                <h2>Selecione as Permissões para o usuario</h2>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nome"
                                            label="Nome"
                                            value={this.state.nome}
                                            variant="outlined"
                                            onChange={(e)=> this.setState({nome: e.target.value})}
                                            disabled
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h3>Permissões selecionadas</h3>
                                        <div className="permissao">
                                                {
                                                    this.state.permissoesSelecionadas.map(item=> (
                                                        <div className="chip" key={item.idPermissao}>
                                                            <Chip
                                                                variant="outlined"
                                                                label={item.dsPermissao}
                                                                onClick={() => ''}
                                                                onDelete={() => this.excludePermissions(item)}
                                                                color="primary"
                                                                icon={<FaceIcon />}
                                                            />
                                                        </div>
                                                        )
                                                    )
                                                }
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h3>Lista de Permissões</h3>
                                        <div className="permissao">
                                            {this.renderChips()}
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" >
                                        <div className="button">
                                            <Button variant="contained" color="secondary" id="button" onClick={this.cancel}>
                                                <HighlightOff />
                                                Cancelar
                                            </Button>
                                        </div>
                                        <div className="button">
                                            <Button variant="contained" color="primary" onClick={this.onSubmit}>
                                                <SaveIcon />
                                                Salvar
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Box>
                    </Container>
                </Box>
            </Container>
        )
    }
}


export default connect((state)=>state,{load: data})(EditarPermissao);
