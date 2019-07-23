import React from "react";
import UserForm from "../components/UserForm";
import { rest } from "../authentication/tokenConfig";

class UsuarioCadastro extends React.Component {
    state = {empresa: null}

    componentDidMount = async () =>{
        const response = await rest("").get("/responsavel");
        this.setState({empresa: response.data.empresa});
    }
    onSubmit = (form) =>{
        rest("").post("/responsavel", form);
    }

    render() {
        return (
            <div>
                <UserForm onSubmit={this.onSubmit} initialValues={{empresa: this.state.empresa}}/>
            </div>
        );
    }
}

export default UsuarioCadastro;
