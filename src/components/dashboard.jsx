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
      MoreMenuOpen: false
    }
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

  render() {
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
                    <InputBase placeholder="Title"/>
                  </Typography>
                  <Typography >
                    <InputBase
                      placeholder="Take a note..."
                      inputProps={{
                      'aria-label': 'naked'
                    }}/>
                  </Typography>

                </CardContent>
                <CardActions>
                  <div className="cardActions">
                    <div className="card_buttonsLeft">
                      <IconButton onClick={this.remiderHandler}>
                        <SettingsIcon/>
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
                        anchorEl={this.state.reminderMenuAnchor}
                        keepMounted
                        open={this.state.reminderMenuOpen}
                        onClose={this.remiderHandler}>
                        <MenuItem>Reminder</MenuItem>
                        <MenuItem>Pick date & time</MenuItem>
                        <MenuItem>Pick place
                        </MenuItem>
                      </Menu>
                      <IconButton>
                        <PersonAddIcon/>
                      </IconButton>
                      <IconButton>
                        <ColorLensIcon/>
                      </IconButton>
                      <IconButton>
                        <input
                          id="imageUpload"
                          style={{
                          display: 'none'
                        }}
                          type="file"
                          onClick={alert("click")}
                          />
                          <AddPhotoAlternateIcon onClick={(e) => this.imageUpload.click() }/>
                        
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
                      <Button>
                        close
                      </Button>
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard)
