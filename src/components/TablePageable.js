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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import _ from 'lodash';


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
 * @example
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
    state = {actions: null, anchorEl: null, api: {list: this.props.data}}



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

    renderActions = (item, index) => {
        return(
            <>
                <TableCell>
                    <IconButton style={{backgroundColor: 'white'}} onClick={(event)=> this.setState({anchorEl: event.currentTarget})}>
                        <Icon>settings</Icon>
                    </IconButton>
                    <Paper>
                        <Menu
                            id="simple-menu"
                            keepMounted
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={() => this.setState({anchorEl: null})}
                            >
                           {this.props.actions.map((action, index)=> (
                               <MenuItem onClick={() =>{action.callback(item);this.setState({anchorEl: null})}} key={index}>
                                   {action.icon && action.icon !== undefined && <ListItemIcon><Icon>{action.icon}</Icon></ListItemIcon>}
                                   <ListItemText primary={action.tittle}></ListItemText>
                               </MenuItem>
                           ))}
                        </Menu>
                    </Paper>
                </TableCell>
            </>
        )
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
                                        return <TableCell key={index}></TableCell>
                                    })}
                                    {this.props.actions && this.renderActions(item, index)}
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
