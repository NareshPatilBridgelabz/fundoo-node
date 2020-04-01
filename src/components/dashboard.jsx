import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import {Menu, MenuItem} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import {Card, Tooltip} from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
import DialpadIcon from '@material-ui/icons/Dialpad';
import userLogo from '../assets/svg/Avatar.svg';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaceIcon from '@material-ui/icons/Place';
import Note from './notes'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import {getUserNote} from '../services/noteServices'
import {setUserNote} from '../services/noteServices'
import {deleteUserNote} from '../services/noteServices'
// import Appbar from './appBar'
import AcUnitIcon from '@material-ui/icons/AcUnit'
// import Header from './dashbord/header'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuAnchor: null,
      menuOpen: false,
      sideBarOpen: false,
      sidebarLeft: '0%',
      mainContainer: '80%',
      reminderMenuAnchor: null,
      reminderMenuOpen: false,
      MoreMenuAnchor: null,
      MoreMenuOpen: false,
      noteCardBackDisplay: "none",
      title: '',
      description: '',
      allNotes: [],
      displayReminder: "",
      displayDatePick: "none",
      timing: [
        {
          value: 'morning8:00AM',
          label: 'morning     8:00 AM'
        }, {
          value: 'afternoon1:00PM',
          label: 'afternoon   1:00 PM'
        }, {
          value: 'evening4:00PM',
          label: 'evening     4:00 PM'
        }, {
          value: 'night8:00PM',
          label: 'night       8:00 PM'
        }
      ],
      time: ""
    }

    this.userNoteRefresh()
    deleteUserNote().then(response => {
      console.log(response)
    })

  }
  userNoteRefresh = () => {
    getUserNote().then(response => {
      if(response.data.data.data){
        this.setState({allNotes:response.data.data.data})
      }
    })
  }
  
  handleClick = event => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen
    })
  }
  handleClose = event => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen
    })
  }
  sidebarActive = () => {
    this.setState({
      sideBarOpen: !this.state.sideBarOpen
    })
    if (this.state.sideBarOpen) {
      this.setState({sidebarLeft: '0%'})
      this.setState({mainContainer: '80%'})
    } else {
      this.setState({sidebarLeft: '-20%'})
      this.setState({mainContainer: '100%'})
    }
  }
  test = e => {
    console.log(e.currentTarget)
  }
  handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userDetails')
    this
      .props
      .history
      .push('/login')
  }
  searchBarHandel = () => {
    alert("click");
  }
  remiderHandler = (event) => {
    this.setState({
      reminderMenuAnchor: event.currentTarget,
      reminderMenuOpen: !this.state.reminderMenuOpen
    })
  }
  moreMenuHandler = (event) => {
    this.setState({
      MoreMenuAnchor: event.currentTarget,
      MoreMenuOpen: !this.state.MoreMenuOpen
    })
  }
  addNote = (event) => {
    if(this.state.title != "" || this.state.description != ""){
      
      
      const form_data = new FormData();
      form_data.append('title', this.state.title);
      form_data.append('description', this.state.description);

      setUserNote(form_data).then(response => {
        console.log(response)
      })
      this.userNoteRefresh()
      this.setState({title:""})
      this.setState({description:""})
    }
  }
  onChangeTitle = (event) => {
    this.setState({title: event.currentTarget.value})
  }
  onChangeNote = (event) => {
    this.setState({description: event.currentTarget.value})
  }
  onFocusTitle = () => {
    // alert("sdsdsd");
    this.setState({
      noteCardBackDisplay: this.state.noteCardBackDisplay === ""
        ? "none"
        : ""
    })
  }
  onClickCheckList = () => {}
  clickPickDate = () => {
    this.setState({
      displayReminder: this.state.displayReminder === ""
        ? "none"
        : ""
    })
    this.setState({
      displayDatePick: this.state.displayDatePick === ""
        ? "none"
        : ""
    })
  }
  handleChangeTime = (event) => {
    console.log(event.currentTarget, event.currentTarget.value);
    console.log(event.currentTarget.dataset.value)
    this.setState({time: event.currentTarget.dataset.value})
  }

  render() {
    // let allObj = this   .state   .allNotes   .map(allnote => {     if
    // (allnote.isArchived === false && allnote.isDeleted === false &&
    // allnote.isPined === false) {       return (<Note         />)     }     return
    // null   })
    return (
      <div>
        <div className='headerbar'>
          <div className='header_left'>
            <IconButton onClick={this.sidebarActive}>
              <MenuIcon/>
            </IconButton>
            <img src='https://www.gstatic.com/images/branding/product/1x/keep_48dp.png'/>
          </div>
          <div className='searchBox'>
            <Card id='searchbar'>
              <Tooltip title='search'>
                <IconButton>
                  <SearchIcon/>
                </IconButton>
              </Tooltip>
              <InputBase placeholder='Search' fullWidth/>
            </Card>
          </div>
          <div className="buttonBundle1">
            <IconButton className="searchButton2" onClick={this.searchBarHandel}>
              <SearchIcon/>
            </IconButton>
            <IconButton>
              <RefreshIcon/>
            </IconButton>
            <IconButton className="hideIcon">
              <ListAltIcon/>
            </IconButton>
            <IconButton>
              <SettingsIcon/>
            </IconButton>
          </div>
          <div className='header_userProfile'>
            <IconButton className="hideIcon">
              <DialpadIcon/>
            </IconButton>
            <IconButton // variant='contained'
              // color='primary'
              size='small'>
              <img src={userLogo} onClick={this.handleClick} id="profile_logo"/>
            </IconButton>
          </div>
          <Menu
            id='profile-menu'
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
            anchorEl={this.state.menuAnchor}
            keepMounted
            open={this.state.menuOpen}
            onClose={this.handleClose}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="dashboard_body">
          <div
            className='sidebar'
            style={{
            left: this.state.sidebarLeft
          }}>
            <div class='sidebar_component' onClick={this.test}>
              <WbIncandescentIcon/>
              Notes
            </div>
            <div class='sidebar_component' onClick={this.test}>
              <NotificationsNoneIcon/>
              Reminder
            </div>
            <Divider/>
            <div class='sidebar_component' onClick={this.test}>
              <EditIcon/>
              Edit Lable
            </div>
            <div class='sidebar_component' onClick={this.test}>
              <ArchiveIcon/>
              Archive
            </div>
          </div>

          <div
            className="dashboard_container"
            style={{
            width: this.state.mainContainer
          }}>
            <div className="cardRow">
              <Card >
                <CardContent>
                  <Typography color="textSecondary">
                    <InputBase
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      onClick={this.onFocusTitle}/>
                    <CheckBoxIcon id="checkList" onClick={this.onClickCheckList}/>
                  </Typography>
                  <Typography
                    style={{
                    display: this.state.noteCardBackDisplay
                  }}>
                    <InputBase
                      placeholder="Take a note..."
                      value={this.state.description}
                      onChange={this.onChangeNote}/>
                    <div className="listItem"></div>
                  </Typography>

                </CardContent>
                <CardActions
                  style={{
                  display: this.state.noteCardBackDisplay
                }}>
                  <div className="cardActions">
                    <div className="card_buttonsLeft">
                      <IconButton onClick={this.remiderHandler}>
                        <AddAlertIcon/>
                      </IconButton>
                      <Menu
                        className="reminderMenu"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                        anchorEl={this.state.reminderMenuAnchor}
                        keepMounted
                        open={this.state.reminderMenuOpen}
                        onClose={this.remiderHandler}>

                        <div
                          style={{
                          display: this.state.displayReminder
                        }}>
                          <MenuItem component="h2">Reminder</MenuItem>
                          <MenuItem>Later today</MenuItem>
                          <MenuItem>Tomorrow</MenuItem>
                          <MenuItem onClick={this.clickPickDate}><WatchLaterIcon fontSize=" 0.90rem"/>Pick date & time</MenuItem>

                        </div>
                        <div
                          id="datePickBox"
                          style={{
                          display: this.state.displayDatePick
                        }}>

                          <Typography onClick={this.clickPickDate}><ArrowBackIcon/>Pick Date & Time</Typography>
                          <TextField
                            id="date"
                            type="date"
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                            shrink: true
                          }}/>
                          <TextField
                            id="standard-select-currency"
                            select
                            label="Time"
                            value={this.state.time}
                            onChange={this.handleChangeTime}
                            helperText="Please select your time">
                            {this
                              .state
                              .timing
                              .map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                          </TextField>
                        </div>
                      </Menu>
                      <IconButton>
                        <PersonAddIcon/>
                      </IconButton>
                      <IconButton>
                        <ColorLensIcon/>
                      </IconButton>
                      <IconButton>

                        <AddPhotoAlternateIcon/>

                      </IconButton>
                      <IconButton>
                        <ArchiveIcon/>
                      </IconButton>

                      <IconButton onClick={this.moreMenuHandler}>
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu
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

                        <MenuItem>Add Lable</MenuItem>
                        <MenuItem>Add Drawing</MenuItem>
                        <MenuItem>Show checkboxes</MenuItem>
                      </Menu>
                    </div>
                    <div className="card_buttonsRight">
                      <Button onClick={this.addNote}>
                        close
                      </Button>
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
            <div className="notes">
              {this
                .state
                .allNotes
                .map(objNote => {
                  return (< Note noteData={objNote}/>)
                })}
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard)
