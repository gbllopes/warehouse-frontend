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

    renderInput(campo) {
        console.log(campo);
        return (
            <div>
                <TextField
                    required={campo.required}
                    label={campo.label}
                    {...campo.input}
                    {...campo}
                    error={campo.meta.error && campo.meta.touched}
                    >
                </TextField>
                {
                    campo.meta.error && campo.meta.touched &&
                    <FormHelperText error>{campo.meta.error}</FormHelperText>
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
      console.log(custom)
        return (
            <React.Fragment>
                <InputLabel htmlFor='age-native-simple'>{label}</InputLabel>
                <Select
                    {...input}
                    {...custom}
                    inputProps={{
                        name: label,
                        id: 'age-native-simple',
                    }}
                    label={label}
                    >
                    {children}
                </Select>
            </React.Fragment>

        )
    }

    render() {
        console.log(this.props);
        const { classes } = this.props;
        return (
        <div className={classes.div}>
            <form noValidate className={classes.form} onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
            <Container className={classes.root}>
                <Card className={classes.card}>
                    <Container>
                        <h2>Cadastro de Usuario</h2>
                        <Card className={classes.card}>
                            <Box className={classes.box}>
                                <Grid container>
                                    <Grid item xs={12}>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            name="secret"
                                            label="Senha"
                                            component={this.renderInput}
                                            required={true}
                                            className={classes.textField}
                                            type="password"
                                            />
                                        </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            name="secretConfirm"
                                            label="Confirmar Senha"
                                            component={this.renderInput}
                                            required={true}
                                            className={classes.textField}
                                            type="password"
                                            />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="responsavel.nome"
                                            label="Nome Completo"
                                            component={this.renderInput}
                                            required={true}
                                            className={classes.textField}
                                            type="text"
                                            />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            name="responsavel.empresa"
                                            label="Empresa"
                                            component={this.renderInput}
                                            required={true}
                                            className={classes.textField}
                                            type="text"
                                            />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className={classes.textField}>
                                            <Field
                                                name="responsavel.cargo.idCargo"
                                                component={this.renderSelectField}
                                                label="Cargo"
                                                >
                                                {this.state.cargo.map(c => (
                                                    <MenuItem value={c.idCargo} key={c.idCargo}>{c.dsCargo}</MenuItem>
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
    const errors = {}
    if(!values["email"]){
        errors.email = "Campo de preenchimento obrigatório"
    }
    return errors;
}

export default reduxForm({
  form: "userRegister",
  validate
})(withStyles(useStyle)(UserForm));
