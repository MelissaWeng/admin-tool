import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SearchBar from 'material-ui-search-bar';
import styles from './admin.styles';
import ReactTable from 'react-table';
import "../../Assets/css/react-table.css";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Navigation from '../navigation/navigation';
import {Redirect} from 'react-router-dom';
import { browserHistory } from 'react-router';

const ketju = [
  <MenuItem key={1} value={1} primaryText="Prisma" />,
  <MenuItem key={2} value={2} primaryText="S-Market" />,
  <MenuItem key={3} value={3} primaryText="Buffa" />
];



class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      height: props.height,
      width: props.width,
      contentWidth: props.contentWidth,
      leftContentWidth: props.leftContentWidth,
      inputWidth: props.inputWidth,
      activeUser: 'Passivoi käyttäjä',
      active: true,
      search: '',
      open: false,
      ketjuValue: null,
      openInfo: false,
      firstName: '',
      lastName: '',
      chain: '',
      unit: '',
      phone: '',
      role: '',
      loggedIn: true,
      authorize: {
        client_id: 'T09fNfkiW66da5X47X4YvIN7ZR2ClUQI',
        user_id: '',
        connection: 'Username-Password-Authentication',
        scope: 'openid profile',
        username: '0447417578',
        password: '12345',
        invalidLoginMsg: ''
      },
      id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFURTFOelE0UkVKQ1JVTkNNVEpEUTBaQ05qRkJNVE5CUTBFek5rRkRSRU5FUmtReFJURTBOUSJ9.eyJ1c2VybmFtZSI6IjA0Njg0NDQxNzkiLCJuYW1lIjoiTHVsemltIEZhemxpamEiLCJlbWFpbCI6ImludGVybmFsLmZpaWxpczNAcm9nZXJzdHVkaW8uZmkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInVzZXJfaWQiOiJhdXRoMHw1YTYxZWU5NDUzMDExMjNlZDFmZTgyMmEiLCJjbGllbnRJRCI6IlQwOWZOZmtpVzY2ZGE1WDQ3WDRZdklON1pSMkNsVVFJIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2ZjZjBjMzlhNWJmZmNjYjhkZTg3ZGZiOGJlOTNkN2I4P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbGYucG5nIiwibmlja25hbWUiOiIwNDY4NDQ0MTc5IiwiaWRlbnRpdGllcyI6W3sidXNlcl9pZCI6IjVhNjFlZTk0NTMwMTEyM2VkMWZlODIyYSIsInByb3ZpZGVyIjoiYXV0aDAiLCJjb25uZWN0aW9uIjoiVXNlcm5hbWUtUGFzc3dvcmQtQXV0aGVudGljYXRpb24iLCJpc1NvY2lhbCI6ZmFsc2V9XSwidXBkYXRlZF9hdCI6IjIwMTgtMDQtMTBUMTM6MzI6MjEuMzM3WiIsImNyZWF0ZWRfYXQiOiIyMDE4LTAxLTE5VDEzOjExOjQ4Ljc0OFoiLCJ1c2VyX21ldGFkYXRhIjp7fSwiYXBwX21ldGFkYXRhIjp7InVzZXJuYW1lIjoiMDQ2ODQ0NDE3OSIsImF1dGhvcml0aWVzIjpbIlJPTEVfTVAiLCJST0xFX1VTRVIiXX0sImF1dGhvcml0aWVzIjpbIlJPTEVfTVAiLCJST0xFX1VTRVIiXSwiaXNzIjoiaHR0cHM6Ly9yb2dlcnN0dWRpby5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWE2MWVlOTQ1MzAxMTIzZWQxZmU4MjJhIiwiYXVkIjoiVDA5Zk5ma2lXNjZkYTVYNDdYNFl2SU43WlIyQ2xVUUkiLCJpYXQiOjE1MjMzNjcxNDEsImV4cCI6MTUyNTk1OTE0MX0.V-n2ko7GlM6mSojr5SGQ-trQ8jXwM8v3MmbXV5Au6Al8aLTznglf3OhoiqiRF-XbnvLjDGHqAd-p5tJ1h4IT7jT1ZO7OPzHwsjJ0Fs6qPboebFbgfqCiahEjOqf4ZZw5lkJNy0mh7ZeyhmMUutSqT-5wO-EtuOXW3qmIzh0sHfvVRa9OXm4u4z9GqI33FO3Uzv3XIp-mooQQO0TO5ew7pThHSIHz-vGpd_xJmCut2mNLojswbSHYGe8Q31T9FLqcAawpDkaAawCv1Sth_124n787WyBTrYoD7xmnsPU6Gon5jxWCrhitErc8AMkcy2V4JkT_AVDivQNv6fZqt4i79w'
    };
  }
  componentWillMount(){
    this.setState({height: window.innerHeight});
    this.setState({width: window.innerWidth});
    this.setState({contentWidth: window.innerWidth-135});
    this.setState({leftContentWidth: window.innerWidth-250});
    this.setState({inputWidth: window.innerWidth-600});
    //this.authorize();
  }

  authorize() {
    fetch(`http://52.232.22.226:8282/mule/getToken`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.authorize)
    }).then(response => response.json())
        .then(responseJson => {
            
            if (!responseJson.hasOwnProperty('id_token')) {
                // this.state.authorize.invalidLoginMsg = 'Käyttäjätunnus tai salasana on väärin.';
                // this.setState(this.state);  
                console.log('Käyttäjätunnus tai salasana on väärin.')                 
            } else{
                //this.phoneAuth(responseJson.id_token);
                //AsyncStorage.multiSet([['access_token', responseJson.access_token], ['id_token', responseJson.id_token]]).catch(e => console.warn(e));
                this.state.id_token = responseJson.id_token;
                console.log(this.state.id_token);
            }
            

    }).catch(e => console.log(e))
        .catch(e => console.log(e))
  }

  getData(){
    
  }

  handleChange = (event, index, value) => this.setState({value});

  handleKetjuChange = (event, index, ketjuValue) => this.setState({ketjuValue});

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClickInfo = () => {
    this.setState({
      openInfo: true,
    });
  };

  handleRequestCloseInfo = () => {
    this.setState({
      openInfo: false,
    });
  };


  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  /* getActiveUser(){
    if (this.state.active){
      return 'Inactivate user'
    }
    else{
      return 'Activate user'
    }
  } */
  activateUser(){
    if (this.state.active){
      this.setState({active: false});
    }
    else {
      this.setState({active: true});
    }
  }

  render() {
    if (this.state.loggedIn == false){
      return <Redirect to='/login'/>
    }
    const { classes } = this.props;
    const messageSuccessful = 'Hunajaista! \n Käyttäjätiedot tallennettu.'

    let data = [
      {name: 'Roni Linko', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 4638 352'},
      {name: 'Paplo Pikakassa', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 3028 362'},
      {name: 'Liron Makkarat', unit: 'S-Market Lahti', role: 'Käyttäjä', phone: '040 3627 664'},
      {name: 'Igna Popo', unit: 'Buffa Riihimäki', role: 'Päättäjä', phone: '040 6273 738'},
      {name: 'Jarco J.U Gurtström', unit: 'Buffa Lahti', role: 'Käyttäjä', phone: '040 4766 234'},
      {name: 'J.J. Lähtö', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 9274 637'},
      {name: 'Jessika Simpsuli', unit: 'Prisma Laune', role: 'ADMIN', phone: '040 2649 293'},
      {name: 'Jak Tesh', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 9374 208'},
      {name: 'Hshev Abirmi', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 8372 298'},
      {name: 'Anna Boikat', unit: 'S-Market Lahti', role: 'Käyttäjä', phone: '040 3827 356'},
      {name: 'Henne Pirkonen', unit: 'Buffa Riihimäki', role: 'Päättäjä', phone: '040 8263 020'},
      {name: 'Sini Kokonen', unit: 'Buffa Lahti', role: 'Käyttäjä', phone: '040 0028 932'},
     
    ];
    
    const columns = [{
      Header: 'Nimi',
      accessor: 'name'
    },{
      Header: 'Toimipaikka',
      accessor: 'unit'
    },{
      Header: 'Rooli',
      accessor: 'role',
      Cell: row =>(
        <span style={{
          color: row.value === 'Päättäjä' ? '#6bbd46'
          : row.value === 'ADMIN' ? '#6bbd46'
          : '#525252'
        }}>{row.value}</span>
      )
    },{
      Header: 'Puhelin',
      accessor: 'phone'
    },{
      expander: true,
      width: 65,
      Expander: ({ isExpanded, ...rest }) =>
        <div>
          {isExpanded
            ? <span>&#x2299;</span>
            : <span>&#x2295;</span>}
        </div>,
      style: {
        cursor: "pointer",
        fontSize: 25,
        userSelect: "none"
      }
    }];



    if (this.state.search) {
			data = data.filter(row => {
				return row.name.toLowerCase().includes(this.state.search) || row.unit.toLowerCase().includes(this.state.search) || row.role.toLowerCase().includes(this.state.search) || String(row.phone).includes(this.state.search) || row.name.toUpperCase().includes(this.state.search) || row.unit.toUpperCase().includes(this.state.search) || row.role.toUpperCase().includes(this.state.search)
			})
    }
  
    return (
      <div>
        <Navigation />
        <div className="contents">
          <div style={{height: '135px', width: this.state.contentWidth, paddingTop: 40, display: 'block'}}>
            <div style={{paddingLeft: 76, float: 'left', width: this.state.leftContentWidth}}>
              <DropDownMenu style={{fontSize: 18, width: '250px'}} 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                            underlineStyle={{display: 'none'}} 
                            selectedMenuItemStyle={{color:'#6bbd46'}}>
                <MenuItem value={1} primaryText="Aktiiviset käyttät" style={{paddingLeft: 0}}/>
                <MenuItem value={2} primaryText="Passivoidut käyttäjät" style={{paddingLeft: 0}}/>
              </DropDownMenu>
              <input className="inputSearch"
                style={{width: this.state.inputWidth}}
                placeholder={"Etsi Käyttäjää, toimipaikkaa tai puhelinnumeroa"}
                value={this.state.search}
                onChange={e => this.setState({search: e.target.value})}
              />
            </div>
            <div style={{paddingTop: 5, marginLeft: '10px', marginRight: '50px', float: 'right', width: 30}}>
              <FloatingActionButton
                  backgroundColor = {'#0A8542'}
                  onClick={this.handleClick} 
                  mini={true}>
                  <ContentAdd />
              </FloatingActionButton>
              <Popover
                style={{marginLeft: 40, marginTop: 50}}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                animation={PopoverAnimationVertical}
              >
                
                <div style={{width: this.state.contentWidth, height:'100%', display: 'flex', flexWrap: 'wrap', marginTop: 30, marginBottom: 50}}>
                  <div style={{marginLeft: '100px', marginRight: '100px'}}>
                    <div style={{width: '135px', float: 'left'}}>
                      <p style={{marginTop: 15, fontSize: 16}}>Lisää uusi käyttäjä</p><br />
                      <img src={require('../../Assets/images/avatar.png')} height="70" width="70" style={{marginLeft: 25}} />
                    </div>
                    <div style={{float: 'right', marginLeft: 115}}>
                      <TextField
                        floatingLabelText="Etunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                      />
                      <TextField
                        floatingLabelText="Sukunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                      />
                      <br />
                      <SelectField
                        style={styles.formElement}
                        value={this.state.ketjuValue}
                        onChange={this.handleKetjuChange}
                        floatingLabelText="Ketju"
                        floatingLabelFixed={true}
                        hintText="Valitse"
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {ketju}
                      </SelectField>
                      <SelectField
                        style={styles.formElement}
                        value={this.state.ketjuValue}
                        onChange={this.handleKetjuChange}
                        floatingLabelText="Toimipaikka"
                        floatingLabelFixed={true}
                        hintText="Valitse"
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {ketju}
                      </SelectField>
                      <br />
                      <TextField
                        floatingLabelText="Puhelinnumero"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                      />
                      <br />
                      <Checkbox
                        label="Päättäjä"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        iconStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                      />
                      <Checkbox
                        label="Admin"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                      />
                      <br /><br /><br />
                      <RaisedButton 
                        label="Tallenna" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#0a8542'}
                        onClick={()=>{this.handleRequestClose(); this.handleClickInfo()}}
                      />
                      <RaisedButton 
                        label="Peruuta" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#cdcdcd'}
                        onClick={this.handleRequestClose}
                      />
                    </div>
                  </div>
                </div>
              </Popover>
            </div>
          </div>

          <div style={{width: '100%'}}>
            <ReactTable
              data={data}
              columns={columns}
              className="-highlight"
              defaultPageSize={20}
              style={{height: this.state.height -135}}
              SubComponent={rowInfo => {
                return (
                <div style={{width: this.state.contentWidth, height:'100%', display: 'flex', flexWrap: 'wrap', paddingTop: 30, paddingBottom: 50, backgroundColor: '#f9fafa'}}>
                  <div style={{marginLeft: '100px', marginRight: '100px'}}>
                    <div style={{width: '125px', float: 'left'}}>
                      <img src={require('../../Assets/images/avatar.png')} height="70" width="70" style={{marginLeft: 40, marginTop: 15}} />
                      <br />
                      <RaisedButton 
                        label={'Passivoi Käyttäjä'} 
                        style={{marginTop: 30, marginRight: 20, width: 160, borderRadius: 25}}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#cdcdcd'}
                        
                        labelStyle={{fontSize: 12, verticalAlign: 'middle'}}
                        />
                        <br />
                    </div>
                    <div style={{float: 'right', marginLeft: 135}}>
                      <TextField
                        floatingLabelText="Etunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        defaultValue={rowInfo.row.name.split(" ")[0]}
                      />
                      <TextField
                        floatingLabelText="Sukunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        defaultValue={rowInfo.row.name.split(" ")[1]}
                      />
                      <br />
                      <SelectField
                        style={styles.formElement}
                        value={this.state.ketjuValue}
                        onChange={this.handleKetjuChange}
                        floatingLabelText="Ketju"
                        floatingLabelFixed={true}
                        hintText="Valitse"
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {ketju}
                      </SelectField>
                      <SelectField
                        style={styles.formElement}
                        value={this.state.ketjuValue}
                        onChange={this.handleKetjuChange}
                        floatingLabelText="Toimipaikka"
                        floatingLabelFixed={true}
                        hintText="Valitse"
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {ketju}
                      </SelectField>
                      <br />
                      <TextField
                        floatingLabelText="Puhelinnumero"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        defaultValue={rowInfo.row.phone}
                      />
                      <br />
                      <Checkbox
                        label="Päättäjä"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        iconStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                      />
                      <Checkbox
                        label="Admin"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                      />
                      <br /><br /><br />
                      <RaisedButton 
                        label="Tallenna" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#0a8542'}
                        onClick={()=>{this.handleRequestClose(); this.handleClickInfo()}}
                      />
                      <RaisedButton 
                        label="Peruuta" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#cdcdcd'}
                        onClick={this.handleRequestClose}
                        />
                    </div>
                  </div>
                </div>
                );
              }}
          
            />
          </div>
          <Snackbar
            open={this.state.openInfo}
            message={messageSuccessful}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestCloseInfo}
            bodyStyle={{ height: 'auto', lineHeight: '28px', textAlign: 'center', padding: 24, whiteSpace: 'pre-line', marginBottom: this.state.height/2}}

          />

        </div>
    
      </div>  
    );
  }
}

export default Admin;
