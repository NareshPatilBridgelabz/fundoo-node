import React from 'react'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { Menu, MenuItem } from "@material-ui/core";
import {getLableList} from '../services/noteServices'
import {addSubNoteLabel} from '../services/noteServices'
import Checkbox from '@material-ui/core/Checkbox';

export default class AddLabelSubNote extends React.Component{
    constructor(props){
        super(props)
        this.state={
            anchorEl:null,
            open:false,
            noteLabelList:props.labelIdList,
            checked:false,
            labelList:[],
            labelIdListChange:props.labelIdListChange,
            noteData:props.noteData,
            noteRefresh:props.noteRefresh
        }
        this.getLables()
    }
    getLables =async () => {
        await getLableList().then(response => this.setState({labelList:response.data.data.details}))
    }
    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
            open: !this.state.open
        });
    }
    handleChange = (label,id) => {
        let filter = []
        let flag = false 
        let indexMain
        if(this.state.noteLabelList.length > 0){
            this.state.noteLabelList.filter((e,index) => {
                if(e.id !== id){
                    return e
                } else {
                    indexMain = index
                    flag = true
                }
            })
            if(flag){
                this.state.noteLabelList.splice(indexMain, 1)
            }else{
                this.state.noteLabelList.push({label:label,id:id})
            }
        } else {
            this.state.noteLabelList.push({label:label,id:id})
        }
        
        // console.log(filter)
        console.log(this.state.noteLabelList)
        this.setState({noteLabelList:this.state.noteLabelList})
        this.setState({noteLabelList:this.state.noteLabelList})
        this.state.labelIdListChange()
    }
    addLabelNote = (label,id) => {
        addSubNoteLabel(id,this.state.noteData.id)
        this.state.noteRefresh()
    }
    render(){
        return(
            <div >
            <MenuItem
            //  aria-describedby={id}
             variant="contained"
             color="grey"
             onClick={this.handleClick}>
                 Add Label
            </MenuItem>
        <Popover className="colorBoxRoot"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
          open={this.state.open}
          keepMounted
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
          
          
        >
            <div className="addLabelOnNote">Add label</div>
          <div >
              
              <div>
                  {this.state.labelList.map(ele => {
                      return(
                        <div className="lablelistSelect">
                            <Checkbox
                                size="small"
                                checked={this.checked}
                                onChange={e => this.addLabelNote(ele.label,ele.id)}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            <div>{ele.label}</div>
                            
                        </div>
                      )
                  })
                      
                  }
              </div>
              
          </div>
        </Popover>
      </div>
        )
    }
}