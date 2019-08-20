import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import _ from 'lodash';
import MenuActionTable from '../components/MenuActionTable'
import PropTypes from "prop-types";


/**
 * @version v1.0.0
 *
 * @example
 * must be mandatory attributes of type data and columns
 *
 *
 * @function callBack(item,index){
 *  console.log("example");
 * }
 *
 * @example
 *
 * const actions = [
 *  {tittle: "Editar", icon: 'create', callback: callBack},
 *  {tittle: "Excluir" icon: 'delete_forever' callBack : callBack}
 * ];
 *
 * @param {array} data
 * @param {array} columns
 * @param {array} action
 * @param {object} api
 *
 * @example
 * <TablePageable data=[] columns=[] action=[] api={}></TablePageable>
 *
 *
 *
 */

export class TablePageable extends React.Component {


    state = {
        actions: null,
        anchorEl: null,
        api: {list: this.props.data},
        page: 0
    }



    componentDidMount(){
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

    renderBody = () => {
        if(this.props.data.length > 0 ){
            return (
                <>
                    {
                        this.props.data.map((item, index) => {
                            return(
                                <TableRow key={index}>
                                    {this.props.columns.map((columns, index) => {
                                        if(_.get(item, columns.atributo)){
                                            return <TableCell key={index}> {_.get(item, columns.atributo)} </TableCell>
                                        }
                                        return null;
                                    })}
                                    {this.props.actions && <MenuActionTable item={item} index={index} actions={this.props.actions} />}
                                </TableRow>
                            )
                        })
                    }
                </>
            )
        }
    }

    handleChangePage = (event, page) =>{
        console.log(page);
        this.setState({page: page})
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
                        count={this.props.columns.length}
                        page={this.state.page}
                        rowsPerPage={5}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={() => ""}
                        />
                </Paper>
            </div>
        );
    }

}

TablePageable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
}

export default TablePageable;
