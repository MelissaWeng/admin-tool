import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHeader, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui/Table';
//import DropDownMenu from 'material-ui/DropDownMenu';
//import MenuItem from 'material-ui/MenuItem';
//import SearchBar from 'material-ui-search-bar';
import styles from './errors.styles';
import Navigation from '../navigation/navigation';

let id = 0;
function createData(name, unit, role, phone) {
  id += 1;
  return { id, name, unit, role, phone};
}

const data = [
  createData('Roni Linko', 'Prisma Laune', 'Käyttäjä', '040 3028 352'),
  createData('Paplo Pikakassa', 'Prisma Laune', 'Käyttäjä', '040 3028 352'),
  createData('Liron Makkarat', 'S-Market Lahti', 'Käyttäjä', '040 3028 352'),
  createData('Igna Popo', 'Buffa Riihimäki', 'Päättäjä', '040 3028 352'),
  createData('Jarco J.U Gurtström', 'Buffa Lahti', 'Käyttäjä', '040 3028 352'),
  createData('J.J. Lähtö', 'Prisma Laune', 'Käyttäjä', '040 3028 352'),
  createData('Jessika Simpsuli', 'Prisma Laune', 'ADMIN', '040 3028 352'),
  createData('Roni Linko', 'Prisma Laune', 'Käyttäjä', '040 3028 352'),
  createData('Paplo Pikakassa', 'Prisma Laune', 'Käyttäjä', '040 3028 352'),
  createData('Liron Makkarat', 'S-Market Lahti', 'Käyttäjä', '040 3028 352'),
  createData('Igna Popo', 'Buffa Riihimäki', 'Päättäjä', '040 3028 352'),
  createData('Jarco J.U Gurtström', 'Buffa Lahti', 'Käyttäjä', '040 3028 352'),
 
];

class Errors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      height: props.height
    };
  }
  componentWillMount(){
    this.setState({height: window.innerHeight});
  }


  handleChange = (event, index, value) => this.setState({value});

  render() {

  return (
    <div>
    <Navigation />
      <div className="contents">
        <div style={{height: '135px', width: '100%', paddingTop: 40}}>
          {/* <div style={{ paddingLeft: 76, width: '100%'}}>
            <DropDownMenu style={{float: 'left', paddingLeft: 0, fontSize: 20}} 
                          value={this.state.value} 
                          onChange={this.handleChange} 
                          underlineStyle={{display: 'none'}} 
                          selectedMenuItemStyle={{color:'#ffa900'}}>
              <MenuItem value={1} primaryText="Aktiiviset käyttät" style={{paddingLeft: 0}}/>
              <MenuItem value={2} primaryText="Passivoidut käyttäjät" style={{paddingLeft: 0}}/>
            </DropDownMenu>
          </div> */}
        {/*  <div style={{width: '100%'}}>
            <SearchBar
              onChange={() => console.log('onChange')}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={styles.ingress}
              hintText={'Etsi Käyttäjää, toimipaikkaa tai puhelinnumeroa'}
            />
          </div> */}
        </div>
        <div style={{width: '100%'}}>
          <Table fixedHeader={true} width={'100%'}>
            <TableHeader style={{backgroundColor: '#F9FAFA', width: '100%'}} displaySelectAll={false} adjustForCheckbox= {false}>
              <TableRow>
                <TableHeaderColumn style={styles.table_header_name} >Nimi</TableHeaderColumn>
                <TableHeaderColumn style={styles.table_header_unit}>Toimipaikka</TableHeaderColumn>
                <TableHeaderColumn style={styles.table_header_role}>Rooli</TableHeaderColumn>
                <TableHeaderColumn style={styles.table_header_phone}>Puhelin</TableHeaderColumn>
                {/* <TableHeaderColumn style={styles.table_header_add}> <img src={require('./images/add.png')}/></TableHeaderColumn> */}
              
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {data.map(n => {
                return (
                  <TableRow key={n.id} style={{width: '100%'}}>
                    <TableRowColumn style={styles.table_contents_name}>{n.name}</TableRowColumn>
                    <TableRowColumn style={styles.table_contents_unit}>{n.unit}</TableRowColumn>
                    <TableRowColumn style={styles.table_contents_role}>{n.role}</TableRowColumn>
                    <TableRowColumn style={styles.table_contents_phone}>{n.phone}</TableRowColumn>
                    {/* <TableRowColumn style={styles.table_contents_add}></TableRowColumn> */}
                  </TableRow>
                );
              })}
            </TableBody>
          
          </Table>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <p className="link">LATAA LISÄÄ </p>
        </div>

      </div>
    </div>
      
    );
  }
}

export default Errors;