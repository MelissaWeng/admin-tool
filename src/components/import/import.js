import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import styles from './import.styles';
import Navigation from '../navigation/navigation';

class Import extends React.Component {

  render() {

  return (
    <div>
    <Navigation />
      <div className="container">
        
        <div className="contents">
          <div style={{height: '135px', width: '100%', height: '100%'}}>
            
              <List style={{paddingTop: 0}}>
                <ListItem primaryText="Lisää käyttäjiä massana" style={styles.listItem}/>
                <Divider/>
                <ListItem primaryText="Passivoi käyttäjiä massana" style={styles.listItem}/>
                <Divider/>
                <ListItem primaryText="Päivitä organisaatiorakenne" style={styles.listItem}/>
                <Divider/>
              </List>  
            
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default Import;