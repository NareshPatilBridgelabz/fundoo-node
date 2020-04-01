import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import {Menu, MenuItem} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {Card, Tooltip} from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ArchiveIcon from '@material-ui/icons/Archive';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaceIcon from '@material-ui/icons/Place';

class Notes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            NoteReminderMenuAnchor: null,
            NoteReminderMenuOpen: false,
            MoreMenuAnchor: null,
            MoreMenuOpen: false,
            // noteData:props.noteData,
            title:props.noteData.title,
            description:props.noteData.description
        }
         
    }
    remiderHandler = (event) => {
        this.setState({
          NoteReminderMenuAnchor: event.currentTarget,
          NoteReminderMenuOpen: !this.state.NoteReminderMenuOpen
        })
      }
      moreMenuHandler = (event) => {
        this.setState({
          MoreMenuAnchor: event.currentTarget,
          MoreMenuOpen: !this.state.MoreMenuOpen
        })
      }
      onChangeTitle = (event)=>{
        this.setState({title:event.currentTarget.value})
      }
      onChangeNote = (event)=>{
        this.setState({note:event.currentTarget.value})
      }

    render(){
        return(
            <div>
              <Card >
                <CardContent>
                  <Typography color="textSecondary">
                    <InputBase placeholder="Title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}/>
                  </Typography>
                  <Typography >
                    <InputBase
                      placeholder="Take a note..."
                      value={this.state.description}
                      onChange={this.onChangeNote}/>
                  </Typography>

                </CardContent>
                <CardActions>
                  <div className="cardActions">
                    <div className="subCard_buttonsLeft">
                      <IconButton onClick={this.remiderHandler}>
                        <AddAlertIcon/>
                      </IconButton>
                      <Menu 
                        className="reminderMenu"
                        style={{
                        top: "50px"
                      }}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                        anchorEl={this.state.NoteReminderMenuAnchor}
                        keepMounted
                        open={this.state.NoteReminderMenuOpen}
                        onClose={this.remiderHandler}>
                        <MenuItem component="h2" >Reminder</MenuItem>
                        <MenuItem>Later today</MenuItem>
                        <MenuItem>Tomorrow</MenuItem>
                        <MenuItem><WatchLaterIcon />Pick date & time</MenuItem>
                      </Menu>
                      <IconButton >
                        <PersonAddIcon/>
                      </IconButton>
                      <IconButton>
                        <ColorLensIcon/>
                      </IconButton>
                      <IconButton>
                        
                          <AddPhotoAlternateIcon />
                        
                      </IconButton>
                      <IconButton>
                        <ArchiveIcon/>
                      </IconButton>

                      <IconButton onClick={this.moreMenuHandler}>
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu className="subNotesMoreMenu"
                        style={{
                        top: "50px"
                      }}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                        anchorEl={this.state.MoreMenuAnchor}
                        keepMounted
                        open={this.state.MoreMenuOpen}
                        onClose={this.moreMenuHandler}>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Add Drawing</MenuItem>
                        <MenuItem>Show checkboxes</MenuItem>
                      </Menu>
                    </div>
                    {/* <div className="card_buttonsRight">
                      <Button>
                        close
                      </Button>
                    </div> */}
                  </div>
                </CardActions>
              </Card>
            </div>
        )
    }
}
export default Notes