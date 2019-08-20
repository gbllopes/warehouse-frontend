import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    Container,
    Box, withStyles,
    TextField,
    Select,
    MenuItem,
    Icon,
    FormHelperText } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr'

import {rest} from '../authentication/tokenConfig'

const useStyle = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        flexGrow: 1
    },
    textField: {
        margin: theme.spacing(2,2,2,2),
        width: '80%'
    },
    card: {
        padding:'20px 20px',
        marginBottom: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14)'+
                    '0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;',
    }
});

class UserForm extends React.Component {

    state = {cargo: []}

    componentDidMount(){
        rest("").get("/cargos").then(response => {
            this.setState({cargo: response.data});
        })
    }

    renderInput({
        input,
        label,
        required,
        disabled,
        meta: {error, touched},
        type
        }) {
        return (
            <div>
                <TextField
                    required={required}
                    label={label}
                    {...input}
                    custom
                    error={error && touched}
                    disabled={disabled}
                    fullWidth
                    type={type}
                    >
                </TextField>
                {
                    error && touched && <FormHelperText error>{error}</FormHelperText>
                }
           </div>
        )
    }

    renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
    }) => {
        return (
            <React.Fragment>
                <InputLabel htmlFor='age-native-simple'>{label}</InputLabel>
                <Select
                    label={label}
                    inputProps={{
                        name: label,
                        id: 'age-native-simple',
                    }}
                    error={error && touched}
                    {...input}
                    {...custom}
                    >
                    {children}
                </Select>
                {
                    error && touched &&
                    <FormHelperText error>{error}</FormHelperText>
                }
            </React.Fragment>

        )
    }

    onSubmit = (form) =>{
         rest("").post("/responsavel", form).then(response => {
            this.props.reset();
            toastr.success("Responsavel Cadastrado com sucesso!", "");
         }).catch(error => error);
    }

    render() {
        console.log("INITIAL ", this.props);
        const { classes } = this.props;
        return (
        <div className={classes.div}>
            <form noValidate className={classes.form} onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Container className={classes.root}>
                <Card className={classes.card}>
                    <Container>
                        <h2>Cadastro de Usuario</h2>
                        <Card className={classes.card}>
                            <Box className={classes.box}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="noResponsavel"
                                                label="Nome Completo"
                                                component={this.renderInput}
                                                required={true}
                                                type="text"
                                                />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="usuario.email"
                                                label="Email"
                                                component={this.renderInput}
                                                required={true}
                                                type="text"
                                                fullWidth
                                                />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="dataNascimentoResponsavel"
                                                label="Data de Nascimento"
                                                component={this.renderInput}
                                                required={true}
                                                type="date"
                                                fullWidth
                                                />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="usuario.secret"
                                                label="Senha"
                                                component={this.renderInput}
                                                required={true}
                                                type="password"
                                                />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="usuario.secretConfirm"
                                                label="Confirmar Senha"
                                                component={this.renderInput}
                                                required={true}
                                                type="password"
                                                />
                                            </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="empresa.noRazaoSocial"
                                                label="Empresa"
                                                component={this.renderInput}
                                                required={true}
                                                type="text"
                                                disabled={true}
                                                />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="cargo"
                                                component={this.renderSelectField}
                                                label="Cargo"
                                                >
                                                {this.state.cargo.map(c => (
                                                    <MenuItem value={c} key={c.idCargo}>{c.dsCargo}</MenuItem>
                                                    ))}
                                            </Field>
                                        </FormControl>
                                    </Grid>

                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-end"
                                        >
                                        <Button type="submit"variant="contained" color="primary" >
                                            Enviar
                                            <Icon>send</Icon>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Container>
                </Card>
            </Container>
            </form>
        </div>
    );
  }
}


const validate = values => {
    const requiredFields = [
    'noResponsavel',
    'cargo',
    'dataNascimentoResponsavel'
    ];
    const userFields = [
        'email',
        'secret',
        'secretConfirm'
    ]

    const errors = {};
    errors.usuario = {}
    errors.empresa = {}
    values.usuario = !values.usuario ? {}: values.usuario;
    values.empresa = !values.empresa ? {}: values.empresa;

    requiredFields.forEach( field => {
        if(!values[field]){
            errors[field] = "Campo de preenchimento obrigatório";
        }
    })

    userFields.forEach(field => {
        if(!values.usuario[field]){
            errors.usuario[field] = "Campo de preenchimento obrigatório";
        }
    })

    if(!values.empresa.noRazaoSocial){
        errors.empresa.noRazaoSocial = "Campo de preenchimento obrigatório";
    }

    if(values.usuario.secret && values.usuario.secretConfirm){
        if(values.usuario.secret !== values.usuario.secretConfirm){
            errors.usuario.secretConfirm = "As senhas informadas não coincidem"
        }
    }

    return errors;
}

export default reduxForm({
  form: "userRegister",
  validate,
  enableReinitialize: true
})(connect(null, null)(withStyles(useStyle)(UserForm)));
