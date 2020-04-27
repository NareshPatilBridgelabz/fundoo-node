import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { Container, Card, Snackbar, IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import { forgotPassword } from '../services/userServices'
import { Row, Col } from 'react-grid-system'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAling: 'center',
    color: theme.palette.text.secondary
  }
}))

class Registration extends Component {
  constructor (props) {
    super(props)

    this.state = {
      Email: '',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType:'error'
    }
  }
  
  onSubmit = () => {
    const errors = this.validate(this.state)
    // alert('Submitted')
    console.log(errors)
    if (errors.email || this.state.Email === '') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter propper email-ID.   '
      })
    } else {
      let sendData = {
        email: this.state.Email
      }
      
      console.log(JSON.stringify(sendData));
    //   register(sendData)
    //     .then(response => {
    //         this.state.alertMsgType = 'success'
    //         this.setState({
    //           snackbarOpen: true,
    //           snackbarMessage: "Succefully Registered."
    //         })
    //         setTimeout(() => {
    //           this.loginPage();
    //         }, 2000)
    //         console.log('RESPONSE :', response);
    //     })
    //     .catch()
      forgotPassword(sendData)
        .then(response => {
            this.state.alertMsgType = 'success'
            this.setState({
                snackbarOpen:true,
                snackbarMessage:response.data.message
            })
            setTimeout(() => {
                this.loginPage();
            }, 2000)
        }).catch()
    }
  }

  validate = data => {
    const errors = {}
    if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.Email))
    errors.email = 'Invalid email'
    return errors
  }

  
  onchangeEmail = event => {
    this.setState({ Email: event.target.value })
  }

  SnackbarClose = e => {
    this.setState({ snackbarOpen: false })
  }
//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value })
//     console.log(this.setState({ [e.target.name]: e.target.value }))
//   }
  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false })
  }
  loginPage = () => {
    this.props.history.push('/login')
  }
  render () {
    const classes = { useStyles }

    return (
      <div className='register_card_style'>
                <div className='mainRegForgot'>
                  <div maxWidth='5px' fixed>
                    <form className='formApi' onSubmit={this.onSubmit}>
                    <h1>Forgotpassword </h1>

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

                      <div style={{marginTop: '50px'}}>
                        <TextField
                          required={true}
                          id='email'
                          label='Email'
                          variant='outlined'
                          size='small'
                          value={this.state.Email}
                          onChange={this.onchangeEmail}
                        />
                      </div>
                      <br></br>

                      <div className='row'>
                        <div className='col s6 Reg-button'>
                          <Button
                            variant='outlined'
                            size='medium'
                            color='primary'
                            className={classes.paper}
                            style={{
                              color: 'blue',
                              margin: '10px'
                            }}
                            onClick={this.onSubmit}
                          >
                            Submit
                          </Button>
                        </div>
                         
                      </div>
                    </form>
                    <div className='forgot_cardBottom'>
                        <Link
                          id='forgotPwdLink'
                          component='button'
                          variant='body2'
                          style={{
                            fontWeight:'bold'
                          }}
                          onClick={this.loginPage}
                        >
                          login
                        </Link>
                        
                      </div>
                  </div>
                </div>
      </div>
    )
  }
}

export default Registration
