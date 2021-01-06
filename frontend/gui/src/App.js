import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Signup from './Signup'
import UserExperiences from './UserExperiences'

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      user: {
        username: '',
        id: '',
        token: ''
      }
    }

    this.setUserState = (user) => {
      this.setState({
        user: user
      })
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <Main loggedUser={this.state.user} onLogout={this.setUserState}/>
          </Route>
          <Route path='/login' exact={true}>
            <Login onLogin={this.setUserState}/>
          </Route>
          <Route path='/signup' exact={true}>
            <Signup />
          </Route>
          <Route path='/experiences' exact={true}>
            <UserExperiences user={this.state.user} onLogout={this.setUserState}/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
