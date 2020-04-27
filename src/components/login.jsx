import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, Card, Snackbar, IconButton} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import { login } from '../services/userServices'
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  // root: {   flexGrow: 1 }, paper: {   padding: theme.spacing(2),   textAling:
  // 'center',   color: theme.palette.text.secondary }
}))

class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Email: '',
      Password: '',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType: 'error',
      advanceService: 'ADD TO CART',
      basicService: 'ADD TO CART',
      advanceBGcolor: "gray",
      basicBGcolor: "gray"
    }
    if (this.props.location.data) {
      console.log(this.props.location.data)
      if (this.props.location.data.service === "advance") {
        this.state.advanceService = "Selected"
        this.state.advanceBGcolor = "yellowgreen"
        this.state.basicBGcolor = "gray"
      } else if (this.props.location.data.service === "basic") {
        this.state.basicService = "Selected"
        this.state.basicBGcolor = "yellowgreen"
        this.state.advanceBGcolor = "gray"
      }
    }
  }

  onSubmit = () => {
    const errors = this.validate(this.state)
    // alert('Submitted')
    console.log(errors)
    console.log('PasswordAgain : ' + this.state.Email)
    if (errors.email || this.state.Email === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter propper email-ID.   '})
    } else if (this.state.Password === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter correct password'})
      console.log('password is empty')
    } else {
      let sendData = {
        email: this.state.Email,
        password: this.state.Password
      }

      console.log(JSON.stringify(sendData))
      login(sendData)
        .then(response => {
          if (response.status === 200) {
            this.state.alertMsgType = 'success'
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Login Succesfully.'
            })
            localStorage.setItem('token', response.data.id)
            setTimeout(() => {
              this.props.history.push('/dashboard')
            }, 2000)
          } else {
            this.state.alertMsgType = 'error'
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Enter correct credentials.'
            })
          }
        })
        .catch()
    }
  }

  validate = data => {
    const errors = {}
    if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.Email)) 
      errors.email = 'Invalid email'
    return errors
  }

  onchangeFirstName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({Firstname: event.target.value})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter only alphabets   '})
    }
  }

  onchangeLastName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({Lastname: event.target.value})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter only alphabets.   '})
    }
  }

  onchangeEmail = event => {
    this.setState({Email: event.target.value})
  }


  onchangePassword = event => {
    if (event.target.value.match('^[A-Za-z0-9]*$') != null) {
      // console.log("on click function is working", event.target.value)
      this.setState({Password: event.target.value})
    } else {
      // console.log("on click function is not working", event.target.value)
      this.setState({snackbarOpen: true, snackbarMessage: 'enter correct password'})
    }
  }

  onchangePasswordagain = async event => {
    await this.setState({Passwordagain: event.target.value})
    this.checkPassword()
  }

  checkPassword() {
    if (this.state.Password === this.state.Passwordagain) {
      this.setState({snackbarOpen: true, snackbarMessage: 'done'})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'enter same password'})
    }
  }

  SnackbarClose = e => {
    this.setState({snackbarOpen: false})
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.setState({
      [e.target.name]: e.target.value
    }))
  }
  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false})
  }
  loginPage = () => {
    this
      .props
      .history
      .push('/login')
  }
  render() {
    const classes = {
      useStyles
    }

    return (
      <div className="login_main">

        <Card
          className='login_card'
          style={{
          boxShadow: "5px 10px 12px 1px",
          backgroundColor: "rgb(255, 251, 251)"
        }}>
          <CardContent>
            <Typography className="register_title" variant="h5" color="textSecondary">
              <span style={{color:"red"}}>F</span>
              <span style={{color:"blue"}}>U</span>
              <span style={{color:"green"}}>N</span>
              <span style={{color:"maroon"}}>D</span>
              <span style={{color:"red"}}>O</span>
              <span style={{color:"blue"}}>O</span>
            </Typography>
            <Typography className="register_title" variant="h6" color="textSecondary">
              LOGIN
            </Typography>
            <Typography variant="body2" component="p">
              <form className={classes.root} noValidate autoComplete="off" id="login_form">
              <Snackbar
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center'
                        }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => this.setState({snackbarOpen: false})}
                        message={
                          <span id='message-id'>
                            {' '}
                            {this.state.snackbarMessage}{' '}
                          </span>
                        }
                      >
                        <Alert
                          onClose={this.handleCloseSnackbar}
                          severity={this.state.alertMsgType}
                        >
                          {this.state.snackbarMessage}
                        </Alert>
                      </Snackbar>
                <TextField
                  fullWidth
                  id="input-with-icon-textfield"
                  label="Email"
                  variant="outlined"
                  value={this.state.Email}
                  onChange={this.onchangeEmail}
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon/>
                    </InputAdornment>
                  )
                }}/>
                <TextField
                  fullWidth
                  id="input-with-icon-textfield"
                  label="Password"
                  type='password'
                  variant="outlined"
                  value={this.state.Password}
                  onChange={this.onchangePassword}
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon/>
                    </InputAdornment>
                  )
                }}/>
              </form>
            </Typography>
          </CardContent>

          <div className={this.props.location.data?'login_services':'hide'}>

             
                <div className='cardbox'>
                  <div className='small_services_card front_card '>
                    <Typography >price: $99 per month</Typography>
                    <Typography style={{
                      color: "blue"
                    }}>advance</Typography>
                    <ul className='servicecard_ul'>
                      <li>$99/month</li>
                      <li>
                        Ability to add title, description, images, labels, checklist and colors
                      </li>
                    </ul>
                  </div>
                  <div
                    className='small_services_card back_card'
                    style={{
                    backgroundColor: this.state.advanceBGcolor
                  }}>{this.state.advanceService}</div>
                </div>

                <div className='cardbox'>
                  <div className='small_services_card front_card'>
                    <Typography >price: $49 per month</Typography>
                    <Typography style={{
                      color: "blue"
                    }}>basic</Typography>
                    <ul className='servicecard_ul'>
                      <li>$49/month</li>
                      <li>Ability to add only title and description</li>
                    </ul>
                  </div>
                  <div
                    className='small_services_card back_card'
                    style={{
                    backgroundColor: this.state.basicBGcolor
                  }}>{this.state.basicService}</div>
                </div>
            {/* <div className="header_footer">
              <a href="login">click instead
              </a>
            </div> */}
          </div>
          <div className="login-btn">
          <div className="links_left">
              <div className='fontWeight-600 blueFont cursor' onClick={e => this.props.history.push('/forgotPassword')}>forgot Password.
              </div>
              <div className='fontWeight-600 blueFont cursor' onClick={e => this.props.history.push('/fundooServices')}>create Account.
              </div>
            </div>
          <div className="button_right">
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmit}>Login</Button>
          </CardActions>
          </div>
          </div>  
        </Card>
      </div>
    )
  }
}

export default withRouter(Registration)
