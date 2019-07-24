import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';


/**
 * @version v1.0.0
 *
 * @example
 * must be mandatory attributes of type data and columns
 *
 * <TablePageable data=[] columns=[] actions=[]></TablePageable>
 *
 *
 */

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
        if(this.props.actions && this.props.actions !== undefined){
            this.props.columns.push({tittle: 'Ações'})
            this.setState({actions: {}})
        }
    }

    renderActions = () => {
        return(
            <>
                <IconButton style={{backgroundColor: 'white'}}>
                    <Icon>settings</Icon>
                </IconButton>
            </>
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
                                    })}
                                    {
                                        this.props.actions && this.renderActions()
                                    }
                                </TableRow>
                            )
                        })
                    }
                </>
            )
        }
    }


    render() {
        return (
            <div>
                <Paper>
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={10}
                        page={0}
                        rowsPerPage={5}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={() => ""}
                        onChangeRowsPerPage={() => ""}
                        />
                </Paper>
            </div>
        );
    }
}


export default TablePageable;
