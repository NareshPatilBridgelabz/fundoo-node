import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Menu, MenuItem } from '@material-ui/core'

export default class UserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      AlertMsg: 'hi',
      menuAnchor: null,
      menuOpen: false
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
  render () {
    return (
        <React.Fragment>
      <div>
        <Button
          id='123'
          variant="contained"
          color="primary"
          onClick={this.handleClick}
          size="small"
        >
          Profile
        </Button>
        
      </div>
      <Menu 
      id='profile-menu'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      
      anchorEl={this.state.menuAnchor}
      keepMounted
      open={this.state.menuOpen}
      onClose={this.handleClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
    </React.Fragment>
    )
  }
}
