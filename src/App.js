import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import {
  Login,
  Main,
  Create
} from './component'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/main' component={Main} />
          <Route path='/create' component={Create} />
        </div>
      </Router>
    );
  }
}

export default App;
