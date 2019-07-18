import React from "react";
import UserForm from "../components/UserForm";
import { rest } from "../authentication/tokenConfig";

class UsuarioCadastro extends React.Component {
    onSubmit = (form) =>{
        console.log("CHEGOU", form)
        form.responsavel.empresa = {}
        form.responsavel.empresa.idEmpresa = 1;
        rest("").post("/usuario", form);

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
