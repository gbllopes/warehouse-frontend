import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


export class TablePageable extends React.Component {

    componentDidMount(){
        console.log(this.props)
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
                                    })}
                                </TableRow>
                            )
                        })
                    }
                </>
            )
        }
    }

    verifyActions = () => {
        if(this.props.actions !== null){
            this.props.columns.push({tittle: 'Ações'})
        }
    }

    render() {

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
