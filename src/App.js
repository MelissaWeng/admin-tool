import React, { Component } from 'react';
import './Assets/css/default.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import Admin from './components/admin/admin';
import Errors from './components/errors/errors';
import Import from './components/import/import';
import Login from './components/login/login';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily: "'Lato', sans-serif"
}
);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  

  render() {
      return (
        
        <Router>
          
          <div>
            <MuiThemeProvider muiTheme={muiTheme}>
              <div className="container">
                  <Route exact path='/' component={Admin} />
                  <Route exact path='/import' component={Import} />
                  <Route exact path='/errors' component={Errors} />
                  <Route exact path='/login' component={Login} />
              </div>
            </MuiThemeProvider>
            
          </div>
        </Router>
      );
    }
}

export default App;
