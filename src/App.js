import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'


import Registration from './components/registration'
import Login from './components/login'
import Dashboard from './components/dashboard'
import ForgotPassword from './components/forgotPassword'
import FundooServices from './components/fundooSevices'
import { UserProvider } from './components/userContext.js'
import PrivateRoute from './components/privateRoute'

class App extends React.Component {
  render () {
    return (
      <Router>
        <UserProvider>
        <Switch>
          
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} state={{ prevPath: 'login' }} />
          <PrivateRoute path='/dashboard' component={Dashboard} exact/>
          <PrivateRoute path='/forgotpassword' component={ForgotPassword} />
          <Route path='/fundooServices' component={FundooServices} />
          
        </Switch>
        </UserProvider  >
      </Router>
    )
  }
}

export default App
