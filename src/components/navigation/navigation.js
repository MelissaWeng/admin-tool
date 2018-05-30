import React from 'react';
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
          <Link to="/"><img src={require('./images/admin.png')} alt="admin"/></Link>
        </li>
        {/* <li>
          <Link to="/import"><img src={require('./images/import.png') alt="import"} /></Link>
        </li>
        <li>
          <Link to="/errors"><img src={require('./images/error.png') alt="error"} /></Link>
        </li> */}
        <li>
          <Link to="/login"><img src={require('./images/log-out.png')} alt="logout"/></Link>
        </li>
      </ul>
    </nav> 

  );
  }
}

export default Navigation;
