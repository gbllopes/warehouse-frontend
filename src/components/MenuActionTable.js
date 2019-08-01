import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';


class MenuActionTable extends React.Component{
    state = {anchorEl: null}

    render(){
        return(
            <TableCell>
                <IconButton style={{backgroundColor: 'white'}} onClick={(event)=> this.setState({anchorEl: event.currentTarget})}>
                    <Icon>settings</Icon>
                </IconButton>
                <Paper>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.setState({anchorEl: null})}
                        >
                        {this.props.actions.map((action, index)=> (
                            <MenuItem onClick={() =>{action.callback(this.props.item, this.props.index);this.setState({anchorEl: null})}} key={index}>
                                {action.icon && action.icon !== undefined && <ListItemIcon><Icon>{action.icon}</Icon></ListItemIcon>}
                                <ListItemText primary={action.tittle}></ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </Paper>
            </TableCell>
        )
    }
}

export default MenuActionTable;
