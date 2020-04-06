import React from "react";
import { Button } from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import AddIcon from "@material-ui/icons/Add";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputBase from "@material-ui/core/InputBase";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton'
import {addNotelable} from '../services/noteServices'
import {getLableList} from '../services/noteServices'
import {deleteNotelable} from '../services/noteServices'
import {updateNoteLabel} from '../services/noteServices'
import EditIcon from '@material-ui/icons/Edit';

export default class LabaleSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        open:false,
        userID:props.userId,
        lables:[],
        enterLable:''
    }
    this.getLables()
  }
  handleClickOpen = () => {
    this.setState({open:!this.state.open})
  }
  onChangeLable = (e,index) => {
    this.state.lables[index].label=e.target.value
    this.setState({lables:this.state.lables})
    console.log(this.state.lables)
  }
  editNotelabel = (labelId,index) =>{
    let editdata = {label:this.state.lables[index].label}
    updateNoteLabel(labelId,editdata)
    this.getLables()
    this.getLables()
  }
  addLable = () => {
    let userId = JSON.parse(localStorage.getItem('userDetails')).userId
    addNotelable(this.state.enterLable)
    this.setState({enterLable:''})
    this.getLables()
    this.getLables()
  }
  getLables =async () => {
    await getLableList().then(response => this.setState({lables:response.data.data.details}))
  }
  deleteLable = (labelId) => {
    deleteNotelable(labelId)
    this.getLables()
    this.getLables()
  } 

  render() {
    return (
      <div className="lableContainer">
        <div className="lableHeader">
          <div>LABLE</div>
          <Button onClick={this.handleClickOpen}>Edit</Button>
        </div>
        <div className="lableList">

            {this.state.lables.map(ele => {
                return(<div className="lable">
                    <LabelIcon />
                    {ele.label}
                </div>)
            })}
          
          
        </div>
        <div className="lableFooter">
          <AddIcon />
            <Button size="small" variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Add
            </Button>
        </div>
        <Dialog
          id="simple-dialog-lable"
          onClose={this.handleClickOpen}
          aria-labelledby="simple-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="diloadBoxTitleLable" >Edit Lable</DialogTitle>
          <List>
              
              <div className="addLableHead">
                <AddIcon />
                <InputBase
                  placeholder="enter lable..."
                  value={this.state.enterLable}
                  onChange={e => {this.setState({enterLable:e.target.value})}}
                  inputProps={{ "aria-label": "naked" }}
                />
                <IconButton size="small" onClick={this.addLable}>
                  <CheckCircleIcon fontSize="small"/>
                </IconButton>
                
              </div>
              {this.state.lables.map((ele,index) => {
                return(
                  <div className="editLablelist">
                    <LabelIcon />
                    <InputBase value={ele.label} onChange={e => this.onChangeLable(e,index)} inputProps={{ "aria-label": "naked" }} />
                    <IconButton onClick={e => this.editNotelabel(ele.id,index)} size="small"  >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small"  onClick={e => this.deleteLable(ele.id)}>
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </div>
                )
              })}
              <div className="editLableFooter">
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                  Done
                </Button>
              </div>
          </List>
        </Dialog>
      </div>
    );
  }
}
