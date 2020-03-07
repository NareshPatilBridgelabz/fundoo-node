import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import Registration from './components/registration'
import Login from './components/login'
import Dashboard from './components/home'
import Test from './components/test'
import ForgotPassword from './components/forgotPassword'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/home' component={Dashboard} />
          <Route path='/test' component={Test} />
          <Route path='/forgotpassword' component={ForgotPassword} />
        </Switch>
      </Router>
    )
  }
}

export default App
