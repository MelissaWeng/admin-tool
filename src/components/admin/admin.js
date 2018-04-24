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
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Navigation from '../navigation/navigation';
import {Redirect} from 'react-router-dom';
import { browserHistory } from 'react-router';

const chain = [
  <MenuItem key={0} value={"Prisma"} primaryText="Prisma" />,
  <MenuItem key={1} value={"S-Market"} primaryText="S-Market" />,
  <MenuItem key={2} value={"Buffa"} primaryText="Buffa" />
];

const unit = [
  <MenuItem key={0} value={"Lahti"} primaryText="Lahti" />,
  <MenuItem key={1} value={"Riihimäki"} primaryText="Riihimäki" />,
  <MenuItem key={2} value={"Laune"} primaryText="Laune" />
]


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debugText: 'Debug Text shows here',
      changeStatus: false,
      activeValue: 1,
      height: props.height,
      width: props.width,
      contentWidth: props.contentWidth,
      leftContentWidth: props.leftContentWidth,
      inputWidth: props.inputWidth,
      activeText: 'Passivoi käyttäjä',
      active: true,
      avatarImg: require('../../Assets/images/fiilis07-iloinen.png'),
      search: '',
      openPopover: false,
      changableChain: null,
      changableUnit: null,
      openInfo: false,
      invisibleInfo: false,
      openConfirm: false,
      collapseOnChange: false,
      firstName: '',
      lastName: '',
      phone: '',
      chainValue: '',
      unitValue: '',
      checkP: '',
      checkA: '',
      role: '',
      errorTextFirstName: '',
      errorTextLastName: '',
      errorTextChain: '',
      errorTextUnit: '',
      errorTextPhone: '',
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
      id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFURTFOelE0UkVKQ1JVTkNNVEpEUTBaQ05qRkJNVE5CUTBFek5rRkRSRU5FUmtReFJURTBOUSJ9.eyJ1c2VybmFtZSI6IjA0NDc0MTc1NzgiLCJuYW1lIjoiTWVsaXNzYSBXZW5nIiwiZW1haWwiOiJpbnRlcm5hbC5maWlsaXMxQHJvZ2Vyc3R1ZGlvLmZpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJfaWQiOiJhdXRoMHw1YTYxZWU5MzY4NmMwNjI5ZmM5NWFjYTkiLCJjbGllbnRJRCI6IlQwOWZOZmtpVzY2ZGE1WDQ3WDRZdklON1pSMkNsVVFJIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzJiYjQ3N2Y0ZmI2NTRmMzMyNWMzYWU3MjliMjhjOWY3P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXcucG5nIiwibmlja25hbWUiOiIwNDQ3NDE3NTc4IiwiaWRlbnRpdGllcyI6W3sidXNlcl9pZCI6IjVhNjFlZTkzNjg2YzA2MjlmYzk1YWNhOSIsInByb3ZpZGVyIjoiYXV0aDAiLCJjb25uZWN0aW9uIjoiVXNlcm5hbWUtUGFzc3dvcmQtQXV0aGVudGljYXRpb24iLCJpc1NvY2lhbCI6ZmFsc2V9XSwidXBkYXRlZF9hdCI6IjIwMTgtMDQtMThUMTI6MDg6MjMuOTE3WiIsImNyZWF0ZWRfYXQiOiIyMDE4LTAxLTE5VDEzOjExOjQ3LjkwOVoiLCJsYXN0X3Bhc3N3b3JkX3Jlc2V0IjoiMjAxOC0wMy0wMlQwOTo0MDowMi41ODZaIiwiYXBwX21ldGFkYXRhIjp7InVzZXJuYW1lIjoiMDQ0NzQxNzU3OCIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdfSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlzcyI6Imh0dHBzOi8vcm9nZXJzdHVkaW8uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhNjFlZTkzNjg2YzA2MjlmYzk1YWNhOSIsImF1ZCI6IlQwOWZOZmtpVzY2ZGE1WDQ3WDRZdklON1pSMkNsVVFJIiwiaWF0IjoxNTI0MDUzMzAzLCJleHAiOjE1MjY2NDUzMDN9.yIQmOwFUrUZPTF68efJ08vBKCFCKELobN6_3X1Yc5ULp5x4wirMhv2KwOuEkN-06S2schQp1p8CliLHVRsps8q5fqINAwJm4H28GlpA_UVqWrI2Lsc5lwiiZ-Ds61bQ26Pg5_CJO5ubARa6rlotCFg97q1TPDsvWjz8Kp2uQH5Gcu8tqD__DaBnL1AfDlm_75sgfbpYPIAhmix4BzCFU7YfCjo2NStVeKiqmuATEFCy_28jW9pQrN3nbOFaf2QqrqNsN70yKa93v63oWSify4NH2b0MbAZ9EF3CsZocgK41W-p5mL_G0_bypJipgWUXXWIHJ6JKWgQ9onLvsUOQQ8g'
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

  addUser(){
    var phoneno = /^\d{10}$/;
    if (this.state.firstName == ''  || this.state.lastName == '' || !this.state.phone.match(phoneno)|| this.state.chainValue == '' || this.state.unitValue == ''){
      if (this.state.firstName == '' ){
        this.setState({errorTextFirstName: '* required'});
      }
      else{
        this.setState({errorTextFirstName: ''});
      }
      if (this.state.lastName == ''){
        this.setState({errorTextLastName: '* required'});
      }
      else{
        this.setState({errorTextLastName: ''});
      }
      if (!this.state.phone.match(phoneno)){
        this.setState({errorTextPhone: 'invalid phone number'});
      }
      else{
        this.setState({errorTextPhone: ''});
      }
      if(this.state.chainValue == '') {
        this.setState({errorTextChain: '* required'});
      }
      else{
        this.setState({errorTextChain: ''});
      }
      if(this.state.unitValue == '') {
        this.setState({errorTextUnit: '* required'});
      }
      else{
        this.setState({errorTextUnit: ''});
      }
    }
    else{

      if (this.state.checkP == 'on'){
        this.state.role = 'Päättäjä'
      }
      else if (this.state.checkA == 'on'){
        this.state.role = 'ADMIN'
      }
      else{
        this.state.role = 'Käyttäjä'
      } 

      this.setState({debugText: this.state.firstName + ' '+ this.state.lastName + ' '+ this.state.chainValue + ' ' + this.state.unitValue + ' ' + this.state.phone + ' '+this.state.role});
      this.handleRequestClosePopover(); 
      this.handleClickInfo();
      this.clearPopover();
    }
  }

  clearPopover(){
    this.setState({
      firstName: '',
      lastName: '',
      chainValue: '',
      unitValue: '',
      phone: '',
      checkP: '',
      checkA: '',
      role: '',
      errorTextFirstName: '',
      errorTextLastName: '',
      errorTextPhone: '',
      errorTextChain: '',
      errorTextUnit: ''
    })
  }

  editUser(){

  }

  handleActiveChange = (event, index, activeValue) => this.setState({activeValue});

  changeChain = (event, index, changableChain) => this.setState({collapseOnChange: false, changableChain: changableChain});

  changeUnit = (event, index, changableUnit) => this.setState({collapseOnChange:false, changableUnit: changableUnit});
  

  handleAddClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openPopover: true,
      anchorEl: event.currentTarget,
    });
  };

  handleClickInfo = () => {
    this.setState({
      collapseOnChange: true,
      openInfo: true
    });
  };

  handleRequestCloseInfo = () => {
    this.setState({
      openInfo: false,
      invisibleInfo: false
    });
  };

  changeCollape = () => {
    this.setState({collapseOnChange: true, changeStatus: true});
  }

  handleRequestClosePopover = () => {
    this.setState({
      openPopover: false
    });
  };

  handleRequestCloseExpander = () => {
    this.setState({
      collapseOnChange: true
    });
  };

  handleExpandedChange = () => {
    this.setState({
      collapseOnChange: false,
      changableChain: null,
      changableUnit: null
    })
  };

  openConfirmRequest = () => {
    this.setState({openConfirm: true})
  }
  closeConfirm = () => {
    this.setState({openConfirm: false, openPopover: false, invisibleInfo: true});
    this.clearPopover();
  };
  notConfirm = () => {
    this.setState({openConfirm: false})
  }

  activateUser(){
    if (this.state.activeText == 'Passivoi käyttäjä'){
      this.setState({activeText: 'Aktivoi käyttäjä', active: false, avatarImg: require('../../Assets/images/fiilis01-vasynyt.png')});
    }
    else {
      this.setState({activeText: 'Passivoi käyttäjä', active: true, avatarImg: require('../../Assets/images/fiilis07-iloinen.png')});
    }
  }

  checkRoleP(role){
    if (role === 'Päättäjä'){
      return true
    }
    else{
      return false
    }
  }
  checkRoleA(role){
    if (role === 'ADMIN'){
      return true
    }
    else{
      return false
    }
  }

  handleChangePhone = (e) =>{
    var phoneno = /^\d{10}$/;
    if (e.target.value.match(phoneno)){
      this.setState({phone: e.target.value, errorTextPhone: ''});
    }
    else {
      this.setState({errorTextPhone: 'invalid phone number'})
    }
  }

  render() {
    
    if (this.state.loggedIn == false){
      return <Redirect to='/login'/>
    }
    const { classes } = this.props;
    const messageSuccessful = 'Hunajaista! \n Käyttäjätiedot tallennettu.'

    const actions = [
      <RaisedButton 
        label="Jep, haluan!" 
        style={styles.confirmButton}
        buttonStyle={{ borderRadius: 25 }}
        labelColor={'#ffffff'}
        backgroundColor={'#0a8542'}
        onClick={()=>{this.closeConfirm(); this.handleRequestCloseExpander()}}
      />,
      <br />,
      <RaisedButton 
        label="Peruuta" 
        style={styles.confirmButton}
        buttonStyle={{ borderRadius: 25 }}
        labelColor={'#ffffff'}
        backgroundColor={'#c1c1c1'}
        onClick={this.notConfirm}
      />
    ];

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

    /* let data = [
      {firstName: 'Roni', lastName: 'Linko', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 4638 352'},
      {firstName: 'Paplo', lastName:'Pikakassa', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 3028 362'},
      {firstName: 'Liron', lastName:'Makkarat', unit: 'S-Market Lahti', role: 'Käyttäjä', phone: '040 3627 664'},
      {firstName: 'Igna', lastName:'Popo', unit: 'Buffa Riihimäki', role: 'Päättäjä', phone: '040 6273 738'},
      {firstName: 'Jarco J.U', lastName:'Gurtström', unit: 'Buffa Lahti', role: 'Käyttäjä', phone: '040 4766 234'},
      {firstName: 'J.J.', lastName:'Lähtö', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 9274 637'},
      {firstName: 'Jessika', lastName:'Simpsuli', unit: 'Prisma Laune', role: 'ADMIN', phone: '040 2649 293'},
      {firstName: 'Jak', lastName:'Tesh', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 9374 208'},
      {firstName: 'Hshev', lastName:'Abirmi', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '040 8372 298'},
      {firstName: 'Anna', lastName:'Boikat', unit: 'S-Market Lahti', role: 'Käyttäjä', phone: '040 3827 356'},
      {firstName: 'Henne', lastName:'Pirkonen', unit: 'Buffa Riihimäki', role: 'Päättäjä', phone: '040 8263 020'},
      {firstName: 'Sini', lastName:'Kokonen', unit: 'Buffa Lahti', role: 'Käyttäjä', phone: '040 0028 932'},
     
    ]; */
    
    let columns = [{
      Header: 'Nimi \xA0 \u2195',
      accessor: 'name',
      style: {
        verticalAlign: 'middle',
        paddingRight: 50,
        width: 200
      }
    },{
      Header: 'Toimipaikka \xA0 \u2195',
      accessor: 'unit',
      style: {
        verticalAlign: 'middle',
        paddingRight: 50,
        width: 200
      }
    },{
      Header: 'Rooli \xA0 \u2195',
      accessor: 'role',
      Cell: row =>(
        <span style={{
          color: row.value === 'Päättäjä' ? '#6bbd46'
          : row.value === 'ADMIN' ? '#6bbd46'
          : '#525252'
        }}>{row.value}</span>
      ),
      style: {
        verticalAlign: 'middle',
        paddingRight: 50,
        width: 200
      }
    },{
      Header: 'Puhelin  \xA0 \u2195',
      accessor: 'phone',
      style: {
        verticalAlign: 'middle',
        paddingRight: 50,
        width: 200
      }
    },{
      accessor: 'edit',
      expander: true,
      width: 65,
      Expander: ({ isExpanded, ...rest }) =>
        <div>
          {isExpanded
            ? <span><img src={require('../../Assets/images/close.png')} height="20" width="20" /></span>
            : <span><img src={require('../../Assets/images/open.png')} height="20" width="20" /></span>}
        </div>,
      style: {
        cursor: "pointer",
        fontSize: 30,
        paddingTop: 4,
        paddingBottom: 0,
        userSelect: "none"
      }
    }];


    //search function
    if (this.state.search) {
			data = data.filter(row => {
        return row.name.toLowerCase().includes(this.state.search) || 
        row.unit.toLowerCase().includes(this.state.search) || 
        row.role.toLowerCase().includes(this.state.search) || 
        String(row.phone).includes(this.state.search) || 
        row.name.toUpperCase().includes(this.state.search) || 
        row.unit.toUpperCase().includes(this.state.search) || 
        row.role.toUpperCase().includes(this.state.search) ||
        row.name.includes(this.state.search) ||
        row.unit.includes(this.state.search) ||
        row.role.includes(this.state.search)
			})
    }
  
    return (
      <div>
        <Navigation />
        <div className="contents">
          <div style={{height: '135px', width: this.state.contentWidth, paddingTop: 40, display: 'block'}}>
            <div style={{paddingLeft: 76, float: 'left', width: this.state.leftContentWidth}}>
              <DropDownMenu style={{fontSize: 18, width: '250px'}} 
                            value={this.state.activeValue} 
                            onChange={this.handleActiveChange} 
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
                  onClick={this.handleAddClick}
                  zDepth={0} 
                  mini={true}>
                  <ContentAdd />
              </FloatingActionButton>
              <Popover
                style={{marginLeft: 40, marginTop: 50, overflowY: 'visible'}}
                open={this.state.openPopover}
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
                        onChange={e => this.setState({firstName: e.target.value, errorTextFirstName: ''})}
                        errorText={this.state.errorTextFirstName}
                      />
                      <TextField
                        floatingLabelText="Sukunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        onChange={e => this.setState({lastName: e.target.value, errorTextLastName: ''})}
                        errorText={this.state.errorTextLastName}
                      />
                      <br />
                      <SelectField
                        style={styles.formElement}
                        value={this.state.chainValue}
                        onChange={(event, index, chainValue) => this.setState({chainValue: chainValue, errorTextChain: ''})}
                        floatingLabelText="Ketju"
                        floatingLabelFixed={true}
                        hintText="Valitse"
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                        errorText={this.state.errorTextChain}
                      >
                        {chain}
                      </SelectField>
                      <SelectField
                        style={styles.formElement}
                        value={this.state.unitValue}
                        onChange={(event, index, unitValue) => this.setState({unitValue: unitValue, errorTextUnit: ''})}
                        floatingLabelText="Toimipaikka"
                        floatingLabelFixed={true}
                        hintText="Valitse"
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                        errorText={this.state.errorTextUnit}
                      >
                        {unit}
                      </SelectField>
                      <br />
                      <TextField
                        floatingLabelText="Puhelinnumero"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        onChange={this.handleChangePhone}
                        errorText={this.state.errorTextPhone}
                      />
                      <br />
                      <Checkbox
                        label="Päättäjä"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        iconStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        onCheck={e => this.setState({checkP: e.target.value})}
                      />
                      <Checkbox
                        label="Admin"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        onCheck={e => this.setState({checkA: e.target.value})}
                      />
                      <br /><br /><br />
                      <RaisedButton 
                        label="Tallenna" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#0a8542'}
                        onClick={()=>{this.addUser();}}
                      />
                      <RaisedButton 
                        label="Peruuta" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#c1c1c1'}
                        onClick={this.openConfirmRequest}
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
              collapseOnDataChange={this.state.collapseOnChange}
              //collapseOnPageChange={false}
              //collapseOnSortingChange={false}
              onExpandedChange={this.handleExpandedChange}
              SubComponent={rowInfo => {
                return (
                <div style={{width: this.state.contentWidth, height:'100%', display: 'flex', flexWrap: 'wrap', paddingTop: 30, paddingBottom: 50, backgroundColor: '#f9fafa'}}>
                  <div style={{marginLeft: '100px', marginRight: '100px'}}>
                    <div style={{width: '125px', float: 'left'}}>
                      <img src={this.state.avatarImg} width="70" style={{marginLeft: 40, marginTop: 15}} />
                      <br />
                      <RaisedButton 
                        label={this.state.activeText} 
                        labelStyle={styles.secondaryButtonText} 
                        style={styles.secondaryButtonShort}
                        buttonStyle={{ borderRadius: 25, height: 28, lineHeight:'28px'}}
                        labelColor={'#ffffff'} 
                        onClick={()=>{this.activateUser();}}
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
                        onChange={e => this.setState({firstName: e.target.value})}
                      />
                      <TextField
                        floatingLabelText="Sukunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        defaultValue={rowInfo.row.name.split(" ")[1]}
                        onChange={e => this.setState({lastName: e.target.value})}
                      />
                      <br />
                      <SelectField
                        style={styles.formElement}
                        //value={rowInfo.row.unit.split(" ")[0]}
                        value={this.state.changableChain}
                        onChange={this.changeChain}
                        floatingLabelText="Ketju"
                        floatingLabelFixed={true}
                        hintText={rowInfo.row.unit.split(" ")[0]}
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {chain}
                      </SelectField>
                      <SelectField
                        style={styles.formElement}
                        //value={rowInfo.row.unit.split(" ")[1]}
                        value={this.state.changableUnit}
                        onChange={this.changeUnit}
                        floatingLabelText="Toimipaikka"
                        floatingLabelFixed={true}
                        hintText={rowInfo.row.unit.split(" ")[1]}
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {unit}
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
                        defaultChecked={this.checkRoleP(rowInfo.row.role)}
                      />
                      <Checkbox
                        label="Admin"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        defaultChecked={this.checkRoleA(rowInfo.row.role)}
                      />
                      <RaisedButton 
                        label="Lähetä IOS -latauskoodi"
                        labelStyle={styles.secondaryButtonText} 
                        style={styles.secondaryButton}
                        buttonStyle={{ borderRadius: 25, height: 28, lineHeight:'28px'}}
                        labelColor={'#ffffff'}                       
                      />
                      <br /><br /><br />
                      <RaisedButton 
                        label="Tallenna" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#0a8542'}
                        onClick={()=>{this.handleClickInfo(); this.handleRequestCloseExpander()}}
                      />
                      <RaisedButton 
                        label="Peruuta" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#c1c1c1'}
                        onClick={()=>{this.openConfirmRequest()}}
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
            autoHideDuration={2000}
            onRequestClose={this.handleRequestCloseInfo}
            bodyStyle={{ height: 'auto', lineHeight: '28px', textAlign: 'center', padding: 24, whiteSpace: 'pre-line', marginBottom: this.state.height/2}}
          />
          <Snackbar
            open={this.state.invisibleInfo}
            message={'Close the expander'}
            autoHideDuration={100}
            onRequestClose={this.handleRequestCloseInfo}
            bodyStyle={{display: 'none'}}
          />

          <Dialog
            actions={actions}
            modal={true}
            style={{zIndex: 3000}}
            paperClassName='overflow-visible'
            bodyStyle={{paddingTop: 50, textAlign: 'center', backgroundColor: '#525252', color: '#ffffff', fontSize: 20}}
            actionsContainerStyle={{backgroundColor: '#525252', paddingBottom: 50}}
            open={this.state.openConfirm}
          >
            Haluatko varmasti peruuttaa ja sulkea? <br />Menetät tekemäsi muutokset.
          </Dialog>
          


          {/* <div>
          <p>Info: {this.state.debugText}</p>
          </div> */}
        </div>

        
            
      </div>
        
    );
  }
}

export default Admin;
