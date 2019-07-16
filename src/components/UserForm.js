import React from "react";
import { Field, reduxForm } from "redux-form";
import { Container, Box, withStyles, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';

const useStyle = theme => ({
    root: {
        flexGrow: 1
    },
    box: {
        marginLeft: "100px"
    },
    div: {
        width: "80%"
    },
    textField: {
        marginTop: theme.spacing(2),
    }
});
class UserForm extends React.Component {
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
