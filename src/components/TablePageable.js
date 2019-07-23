import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


export class TablePageable extends React.Component {
    state = {actions: null}
    componentDidMount(){
        console.log("PROPS", this.props);
        this.verifyActions();
    }

    renderHeader = () => {
        return this.props.columns.map((dados, index) => {
            return (
                <TableCell key={index}>
                    <span>{dados.tittle}</span>
                </TableCell>
            );
        });
    }

    verifyActions = () => {
        if(this.props.actions !== null){
            this.props.columns.push({tittle: 'Ações'})
            this.setState({actions: {}})
        }
    }

    renderActions = () => {
        return(
            <div></div>
        )
    }

    renderBody = () => {
        if(this.props.data.length > 0 ){
            return (
                <>
                    {
                        this.props.data.map((dados, index) => {
                            return(
                                <TableRow key={index}>
                                    {this.props.columns.map((columns, index) => {
                                        if(dados[columns.atributo]){
                                            return <TableCell key={index + 0}> {dados[columns.atributo]} </TableCell>
                                        }
                                        return "";
                                    })}

                                </TableRow>
                            )
                        })
                    }
                </>
            )
        }
    }


    render() {
        console.log("RENDER", this.props.columns);
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.renderHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderBody()}
                    </TableBody >
                </Table>
            </div>
        );
    }
}


export default TablePageable;
