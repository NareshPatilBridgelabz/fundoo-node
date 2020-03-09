import React, { Component } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import UserProfile from './userProfile'
import ViewListIcon from '@material-ui/icons/ViewList'
import { Card, Tooltip } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SettingIcon from '@material-ui/icons/Settings'
import MenuIconTwoTone from '@material-ui/icons/MenuBookOutlined'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      //   <div className='header-main'>
      //     <div className="header-left">
      //       <MenuIcon />
      //       <img src='https://www.gstatic.com/images/branding/product/1x/keep_48dp.png' />
      //     </div>
      //     <div className="search-box">
      //       <Card id='appbar_card'>
      //         <Tooltip title='search'>
      //           <IconButton>
      //             <SearchIcon />
      //           </IconButton>
      //         </Tooltip>
      //         <InputBase placeholder='Search' fullWidth />
      //       </Card>
      //     </div>
      //     <div>
      //       <IconButton >
      //         <SettingIcon fontSize='small' />
      //       </IconButton>
      //       <IconButton aria-label='delete'>
      //         <SettingIcon fontSize='small' />
      //       </IconButton>
      //     </div>
      //     <div>
      //       <UserProfile />
      //     </div>
      //   </div>
      <div className='appbar_decor'>
        <div className='image_icon'>
          <IconButton>
            <MenuIcon />
          </IconButton>

          <img src='https://www.gstatic.com/images/branding/product/1x/keep_48dp.png' />
        </div>
        <div
          style={{
            width: '60%'
          }}
        >
          <Card id='header_card'>
            <Tooltip title='search'>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <InputBase placeholder='Search' fullWidth />
          </Card>
        </div>
        <div className='final_icon'>
          <IconButton>
            <SettingIcon fontSize='small' />
          </IconButton>
          <IconButton aria-label='delete'>
            <SettingIcon fontSize='small' />
          </IconButton>
          <UserProfile />
        </div>
      </div>
    )
  }
}
