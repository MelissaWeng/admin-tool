import React, { Component } from 'react';
import Admin from '../admin/admin'
import Errors from '../errors/errors';
import Import from '../import/import';
import Login from '../login/login';
import {Link} from 'react-router-dom';


class Navigation extends React.Component {
  state = {
    selectedIndex: 0,
  };
  select = (index) => this.setState({selectedIndex: index});

  render() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/"><img src={require('./images/admin.png')} /></Link>
        </li>
        {/* <li>
          <Link to="/import"><img src={require('./images/import.png')} /></Link>
        </li>
        <li>
          <Link to="/errors"><img src={require('./images/error.png')} /></Link>
        </li> */}
        <li>
          <Link to="/login"><img src={require('./images/log-out.png')} /></Link>
        </li>

        {/* <li>
          <a href="#"><img src={require('./images/admin.png')} /></a>
          <a href="../import/import"><img src={require('./images/import.png')} /></a>
          <a href="../errors/errors"><img src={require('./images/error.png')} /></a>
          <a href="../login/login"><img src={require('./images/log-out.png')} /></a>
        </li> */}
      </ul>
    </nav> 

  );
  }
}

export default Navigation;
