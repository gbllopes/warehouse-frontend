import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import '../css/Modal.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Modal extends Component{
    state = { open: this.props.open }

    onCloseModal = () =>{
        this.props.onClose(false);
    }    

    render(){
        const { open } = this.state;
       
        return(
            <>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.onCloseModal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" >
                    <IconButton id="closeButton" aria-label="Close" onClick={this.onCloseModal}>
                        <CloseIcon />
                    </IconButton>
                    </DialogTitle>
                    <DialogContent >
                    <DialogContentText id="alert-dialog-slide-description">
                        {this.props.children}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
        
                    </DialogActions>
                </Dialog>
            </>
            );
    }   
}