import React from "react";
import UserForm from "../components/UserForm";
import { rest } from "../authentication/tokenConfig";

class UsuarioCadastro extends React.Component {
    onSubmit = (form) =>{
        console.log("CHEGOU", form)
        form.empresa = {}
        form.empresa.idEmpresa = 1;
        form.dataNascimentoResponsavel = new Date();
        rest("").post("/responsavel", form);

    }

    render() {
        return (
            <div>
                <UserForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default UsuarioCadastro;
