import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NoteDialogBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dialogBoxOpen:true
        }
    }
    handelDialogBox = () => {
        this.setState({dialogBoxOpen:!this.state.dialogBoxOpen})
    }
    render(){
        return (
            <div>
              <Button variant="outlined" color="primary" onClick={this.handelDialogBox}>
                Open form dialog
              </Button>
              <Dialog open={this.state.dialogBoxOpen} onClose={this.handelDialogBox} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handelDialogBox} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handelDialogBox} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
}
export default NoteDialogBox
  
