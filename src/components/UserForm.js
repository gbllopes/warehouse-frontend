import React from "react";
import { Field, reduxForm } from "redux-form";
import { Container, Box, withStyles, TextField, Select } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import {rest} from '../authentication/tokenConfig'

const useStyle = theme => ({
    root: {
        flexGrow: 1
    },
    box: {
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "10%"
    },
    div: {
        width: "80%"
    },
    textField: {
        marginTop: theme.spacing(2),
        width: "80%"
    }
});
class UserForm extends React.Component {
    componentDidMount(){
        rest("").post("/cargos").then(response => {
            this.cargo = response.data;
        })
    }
    renderInput(campo) {
        console.log(campo);
        return (
            <TextField
                required={campo.required}
                label={campo.label}
                {...campo.input}
                {...campo}
            />)
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
            <FormControl error={touched && error}>
                <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                    <Select
                        native
                        {...input}
                        {...custom}
                        inputProps={{
                        name: 'age',
                        id: 'age-native-simple'
                        }}
                    >
                    {children}
                </Select>
            </FormControl>
        )
    }
    render() {
        const { classes } = this.props;
        return (
        <div className={classes.div}>
            <form noValidate>
            <Container className={classes.root}>
                <Card>
                <h2>Cadastro de Usuario</h2>
                <Container>
                    <Card>
                        <Box className={classes.box}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Field
                                        name="username"
                                        label="Email"
                                        component={this.renderInput}
                                        required={true}
                                        type="text"
                                        className={classes.textField}
                                        fullWidth
                                        />
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
                                <Grid item xs={6}>
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
                                <Field
                                    classes={classes}
                                    name="responsavel.cargo"
                                    component={this.renderSelectField}
                                    label="Cargo"
                                    >
                                        <option value="" />
                                        <option value={'ff0000'}>Red</option>
                                        <option value={'00ff00'}>Green</option>
                                        <option value={'0000ff'}>Blue</option>
                                    </Field>
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

export default reduxForm({
  form: "userRegister"
})(withStyles(useStyle)(UserForm));
