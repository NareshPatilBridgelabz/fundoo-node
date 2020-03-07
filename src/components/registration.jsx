import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Container, Card, Snackbar, IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import { register } from '../services/userServices'
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
      Firstname: '',
      Lastname: '',
      Email: '',
      Phone: '',
      Password: '',
      Passwordagain: '',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType:'error'
    }
  }
  
  onSubmit = () => {
    const errors = this.validate(this.state)
    // alert('Submitted')
    console.log(errors)
    console.log('PasswordAgain : ' + this.state.Email)
    if (this.state.Firstname === '') {
      console.log('firstname is empty')
      this.setState({ snackbarOpen: true, snackbarMessage: 'Enter first name' })
    } else if (this.state.Lastname === '') {
      this.setState({ snackbarOpen: true, snackbarMessage: 'Enter last name' })
      console.log('lastname is empty')
    } else if (errors.email || this.state.Email === '') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter propper email-ID.   '
      })
    } else if (this.state.Country === '') {
      this.setState({ snackbarOpen: true, snackbarMessage: 'Enter country ' })
      console.log('lastname is empty')
    } else if (this.state.Password === '') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter correct password'
      })
      console.log('password is empty')
    } else if (this.state.Passwordagain === '') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter same password'
      })
      console.log('requires same password')
    } else {
      let sendData = {
        firstName: this.state.Firstname,
        lastName: this.state.Lastname,
        email: this.state.Email,
        service : 'advance',
        password: this.state.Password,
        phoneNumber: this.state.Phone
      }
      
      console.log(JSON.stringify(sendData));
      register(sendData)
        .then(response => {
            this.state.alertMsgType = 'success'
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Succefully Registered."
            })
            setTimeout(() => {
              this.loginPage();
            }, 2000)
            console.log('RESPONSE :', response);
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
      this.setState({ Firstname: event.target.value })
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter only alphabets   '
      })
    }
  }

  onchangeLastName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({ Lastname: event.target.value })
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter only alphabets.   '
      })
    }
  }

  onchangeEmail = event => {
    this.setState({ Email: event.target.value })
  }

  onchangePhone = event => {
    if (/^[0-9]*$/.test(event.target.value)) {
      this.setState({ Phone: event.target.value })
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter only numbers.   '
      })
    }
  }

  onchangePassword = event => {
    if (event.target.value.match('^[A-Za-z0-9]*$') != null) {
      // console.log("on click function is working", event.target.value)
      this.setState({ Password: event.target.value })
    } else {
      // console.log("on click function is not working", event.target.value)
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'enter correct password'
      })
    }
  }

  onchangePasswordagain = async event => {
    await this.setState({
      Passwordagain: event.target.value
    })
    this.checkPassword()
  }

  checkPassword () {
    if (this.state.Password === this.state.Passwordagain) {
      this.setState({ snackbarOpen: true, snackbarMessage: 'done' })
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'enter same password'
      })
    }
  }

  SnackbarClose = e => {
    this.setState({ snackbarOpen: false })
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.setState({ [e.target.name]: e.target.value }))
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false })
  }
  loginPage = () => {
    this.props.history.push('/login')
  }
  render () {
    const classes = { useStyles }

    return (
      <div className='card_style' style={{
        
        backgroundImage:
          'url(https://previews.123rf.com/images/mazirama/mazirama1408/mazirama140800413/30659837-register-illustration-with-tablet-computer-on-blue-background.jpg)',
        backgroundSize: '100% 100%'
      }}>
        <Container>
          <Row>
            <Col sm={8}>{/* One of three columns */}</Col>
            <Col sm={4}>
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'left-center',
                  flexDirection: 'column',
                  height: '68vh',
                  boxShadow: '0px 0px 10px 2px',
                  marginTop: '100px',
                  paddingBottom: '10px',
                  backgroundImage:
                    'url(https://images.wallpapersden.com/image/download/mix-colour-background_64813_3840x2160.jpg)',
                  backgroundSize: '150% 150%'
                }}
              >
                <div className='mainReg'>
                  <div maxWidth='5px' fixed>
                    <form className='formApi' onSubmit={this.onSubmit}>
                      <h1 className=''> </h1>
                      
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

                      <div style={{ width: '100%' }}>
                        <div className='col s6 Reg-Firstname'>
                          <TextField
                            required={true}
                            error={this.state.err1}
                            id='Firstname'
                            label='Firstname'
                            variant='outlined'
                            size='small'
                            value={this.state.Firstname}
                            onChange={this.onchangeFirstName}
                            className={classes.paper}
                          />
                        </div>
                        <br></br>
                      </div>

                      <div>
                        <TextField
                          required={true}
                          error={this.state.err1}
                          id='Lastname'
                          label='Lastname'
                          variant='outlined'
                          size='small'
                          value={this.state.Lastname}
                          onChange={this.onchangeLastName}
                          className={classes.paper}
                        />
                      </div>
                      <br></br>
                      <div>
                        <TextField
                          required={true}
                          id='Email'
                          label='Email'
                          variant='outlined'
                          size='small'
                          value={this.state.Email}
                          onChange={this.onchangeEmail}
                        />
                      </div>
                      <br></br>

                      <div>
                        <TextField
                          required={true}
                          id='Phone'
                          label='Phone'
                          variant='outlined'
                          size='small'
                          value={this.state.Phone}
                          onChange={this.onchangePhone}
                        />
                      </div>
                      <br></br>

                      <div>
                        {/* <div className="col s6 Reg-Password"> */}
                        <TextField
                          required={true}
                          error={this.state.error}
                          id='Password'
                          label='Password'
                          type='password'
                          variant='outlined'
                          size='small'
                          value={this.state.Password}
                          onChange={this.onchangePassword}
                          className={classes.paper}
                        />
                      </div>
                      <br></br>

                      <div>
                        <div className='col s6 Reg-Passwordagain'>
                          <TextField
                            required={true}
                            error={this.state.error}
                            id='Passwordagain'
                            label='Confirm Password'
                            type='password'
                            variant='outlined'
                            size='small'
                            value={this.state.Passwordagain}
                            onChange={this.onchangePasswordagain}
                            className={classes.paper}
                          />
                        </div>
                      </div>
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
                        <div className='col s6 Reg-button'>
                          <Button
                            variant='outlined'
                            size='medium'
                            color='primary'
                            className={classes.paper}
                            style={{
                              color: 'blue',
                              margin: '10px',
                              marginBottom: '10px'
                            }}
                            onClick={this.loginPage}
                          >
                            login
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Registration)
