import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { Menu, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { Card, Tooltip } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
import DialpadIcon from '@material-ui/icons/Dialpad';

// import Appbar from './appBar'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import Header from './dashbord/header'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuAnchor: null,
      menuOpen: false,
      sideBarOpen: true,
      sidebarLeft: '-20%'
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
    this.setState({ sideBarOpen: !this.state.sideBarOpen })
    if (this.state.sideBarOpen) this.setState({ sidebarLeft: '0%' })
    else this.setState({ sidebarLeft: '-20%' })
  }
  test = e => {
    console.log(e.currentTarget)
  }

  render () {
    return (
      <div>
       
      </div>
    )
  }
}

export default withRouter(Dashboard)
