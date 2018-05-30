import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
import constants from '../constants';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
//import persianUtils from 'material-ui-persian-date-picker-utils';
import auth, { getIdToken, isLoggedIn, logout } from '../../auth';
import jwt_decode from 'jwt-decode';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fi', 'fi-FI'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fi');
  require('intl/locale-data/jsonp/fi-FI');
}


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
      openInfo: false,
      invisibleInfo: false,
      openSendSMSSuccessful: false,
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
      endDate: null,
      authId: '',
      pChecked: false,
      aChecked: false,
      tChecked: false,
      chainChanged: false,
      unitChanged: false,
      roleChanged: false,
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
        username: '0405701088',
        password: '12345',
        invalidLoginMsg: ''
      },
      id_token: '',
      searchUser: {
        header: {
          messageId: 'id',
          offset: '0',
          limit: '500',
          sortDirection: 'DESC'
        },
        searchKeys: '',
        searchBy: '',
        userStatus: 'enabled'
      },
      user: {
        header: {
          messageId: '755b77c0-37e4-11e8-8508-f01faf608bf8',
          authId: '4c6a7a7a-fd1e-11e7-8c37-18e01dec49a8'
        },
        authId: '',
        firstName: '',
        lastName: '',
        userName: '',
        divisionId: '',
        role: '',
        userStatus: 'enabled'
      },
      allDivision: [{}],
      allUsers:[{}],
      tableData: [{}],
      isAllUsers: false,
      isAllDivisions: false,
      allChains: [{}],
      allUnits: [{}],
      divisionInfo: [{}]
    };
  }
  componentWillMount(){
    if (!isLoggedIn()) {
      //console.log("is logged in? " + isLoggedIn());
      this.props.history.push('/login');
    }
    //console.log("is logged in? " + isLoggedIn);
    this.state.id_token = getIdToken();
    this.setState({id_token: getIdToken()});
    //console.log("current id token: "+getIdToken());
    console.log("this state id token: "+this.state.id_token);
    
    this.getDivision();
    this.getUsers();
    this.checkMuleStatus();
    this.setState({height: window.innerHeight});
    this.setState({width: window.innerWidth});
    this.setState({contentWidth: window.innerWidth-135});
    this.setState({leftContentWidth: window.innerWidth-250});
    this.setState({inputWidth: window.innerWidth-600});
  }

  //api calls
  getDivision(){
    fetch(`${constants.muleUrl}/backend/admin/getDivisions`, {
      method: 'GET',
      //mode: 'no-cors',
      headers: {
        //'Access-Control-Request-Method': 'GET',
        //'Access-Control-Request-Headers': 'Accept, Content-Type',
        //'Origin':'http://127.0.0.1:3000/',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.id_token}`,
      }
    }).then(response => response.json())
        .then(responseJson => {
          //this.setState({debugText: responseJson.name})  
          let divisionInfo = [];

          this.setState({allDivision: responseJson, isAllDivisions: true});
          if (this.state.isAllDivisions){
            this.state.allDivision.map(({divisionId, name}, i) => {
              let divisionItem = {};
              divisionItem.divisionId = divisionId;
              divisionItem.name = name;
              divisionItem.chain = name.split(" ")[0];
              divisionItem.unit = name.split(" ").slice(1).join(" ");
              divisionInfo.push(divisionItem);
              this.state.allChains.push(divisionItem.chain);
              this.state.allUnits.push(divisionItem.unit);
            });
          }
          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          this.setState({allChains: this.state.allChains.filter(onlyUnique).slice(1).sort()});
          this.setState({allUnits: this.state.allUnits.filter(onlyUnique).slice(1).sort()});
          this.setState({divisionInfo: divisionInfo})
          console.log(this.state.divisionInfo);
          console.log(this.state.allChains);
          console.log(this.state.allUnits);

          /* chain = allChains.map(item => {
            <MenuItem key={item.key} value={item.value} primaryText={item.value} />
          })
          console.log(chain); */
          

    }).catch(e => console.log(e))
        .catch(e => console.log(e))
  }

  getUsers(){
    this.setState({tableData: [{}]})
    fetch(`${constants.muleUrl}/backend/admin/searchUser`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.id_token}`
      },
      body: JSON.stringify(this.state.searchUser)
    }).then(response => response.json())
        .then(responseJson => {
          this.setState({allUsers: responseJson.matches, isAllUsers: true});
          if (this.state.isAllUsers) {
            this.state.allUsers.map(({userId, firstName, lastName, divisionName, role},i) => {
                let userItem = {};
                userItem.name = firstName + ' ' + lastName;
                userItem.firstName = firstName;
                userItem.lastName = lastName;
                userItem.unit = divisionName;
                userItem.role = role;
                userItem.phone = userId;
                this.state.tableData.push(userItem);
                
            });
            this.state.tableData.shift();
            this.setState({search: ''});
          }
          console.log(this.state.tableData); 
          //return this.state.tableData;
           

    }).catch(e => console.log(e))
        .catch(e => console.log(e))
  }
  
  addUserAPI(){
    var divisionName = this.state.chainValue + ' ' + this.state.unitValue;
    var divisionId = this.getDivisionId(divisionName);
    var phone = this.state.phone;
      
    console.log("divisionId " + divisionId);
    
    if (divisionId !== null){
      fetch(`${constants.adminUrl}/admin/addUser`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.state.id_token}`,
        },
        body: JSON.stringify({
          header: {
            messageId: '755b77c0-37e4-11e8-8508-f01faf608bf8'
          },
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.phone,
          divisionId: divisionId,
          role: this.state.role,
          userStatus: 'enabled'
        })
      }).then(response => response.json())
          .then(responseJson => {
            console.log(responseJson.password);
            this.sendNewUserSMS(phone, responseJson.password);
            this.handleRequestClosePopover(); 
            this.handleClickInfo();
            this.clearPopover();
            this.getUsers();
      }).catch(e => console.log(e))
          .catch(e => console.log(e))

    }
  }


  getAuthId(username){
    console.log('Get Auth Id by Phone: ' + username)
    fetch(`${constants.muleUrl}/backend/admin/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.state.id_token}`,
      },
    }).then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.authUsername);
          this.state.authId = responseJson.authUsername;
          this.updateUserAPI();
          this.clearPopover();
    }).catch(e => console.log(e))
        .catch(e => console.log(e))
  }

  updateUserAPI(){
    console.log('To UpdateUserAPI: authId: '+this.state.authId + ';firstName: '+this.state.firstName+'; lastName: '+this.state.lastName+'; userName:'+this.state.phone+ '; divisionId: '+this.state.divisionId+ ';role: '+this.state.role);
    fetch(`${constants.adminUrl}/admin/updateUser`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.id_token}`,
      },
      body: JSON.stringify({
        "header":{"messageId":"755b77c0-37e4-11e8-8508-f01faf608bf8"},
        "authId":this.state.authId,
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "userName":this.state.phone,
        "divisionId":this.state.divisionId,
        "role":this.state.role,
        "userStatus":"enabled"
        })
    }).then(response => {
      if (response.status === 200){
        console.log("succeed in updating the user");
        this.handleClickInfo(); 
        this.handleRequestCloseExpander();
        this.getUsers();
        //console.log("phoneNumber: "+phone+" name: "+name+" unit: "+unit);
        //this.setState({openSendSMSSuccessful: true});
      }
    }).catch(e => console.log(e))
  }

  sendNewUserSMS(phone, password){
    fetch(`${constants.adminUrl}/admin/sendInvites`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.id_token}`,
      },
      body: JSON.stringify({
        'message': 'Sun työfiiliksellä on väliä! Lataa Mun Fiilis -mobiilisovellus Playstoresta, jos sinulla on Android -puhelin. Jos sinulla on iPhone käytä linkkiä <link>. Käyttäjätunnus on oma puhelinnumerosi ja salasanasi on <password>. Kehitetään yhdessä parempi työpaikka!',
        'recipients':[
          { 'phoneNumber': phone,
            'password': password,
          }
        ]
      })
    }).then(response => {
        if (response.status === 200){
          console.log("succeed in sending sms to " + phone + ' with password: '+password);
          //console.log("phoneNumber: "+phone+" name: "+name+" unit: "+unit);
          //this.setState({openSendSMSSuccessful: true});
        }
    }).catch(e => console.log(e))
  } 

  sendIOSLink(phone, name, unit){

    fetch(`${constants.adminUrl}/admin/sendInvites`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.id_token}`,
      },
      body: JSON.stringify({
        'message': 'Hei <name>, lataa mobiilisovellus Playstoresta tai käytä linkkiä <link>. Kehitetään yhdessä <adjective> työpaikka!',
        'recipients':[
          { 'phoneNumber':phone,
            'name':name,
            'adjective':unit
          }
        ]
      })
    }).then(response => {
        if (response.status === 200){
          //console.log("succeed in sending sms");
          //console.log("phoneNumber: "+phone+" name: "+name+" unit: "+unit);
          this.setState({openSendSMSSuccessful: true});
        }
    }).catch(e => console.log(e))
        
  }


  checkMuleStatus(){
    fetch(`${constants.muleUrl}/mule/statusCheck`)
    .then(response =>  {
        //console.log('-Mule Status-', responseJson)
        console.log('-Mule Status-', response)
      }).catch(e => console.log(e))
  } 

  getDivisionId(name){
    var index = '';
    var id = '';
    index = this.state.divisionInfo.findIndex(function(item, i){      
      return item.name === name;
    }); 
    console.log("index of division: ", index);
    if (index !== -1){
      id = this.state.divisionInfo[index].divisionId;
      return id;
    }
    else{
      this.setState({errorTextChain: 'Invalid Chain. Please check again.', errorTextUnit: 'Invalid Unit. Please check again.'});
      return null; 
    }
  }

  //handle value changes
  updateCheckP(event, isChecked, value){
    this.setState({pChecked: isChecked, roleChanged: true});
  }

  updateCheckA(event, isChecked, value){
    this.setState({aChecked: isChecked, roleChanged: true});
  }

  updateCheckT(event, isChecked, value){
    this.setState({tChecked: isChecked, roleChanged: true})
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
  checkRoleT(role){
    if (role === 'Tilapäinen'){
      return true
    }
    else{
      return false
    }
  }

  addUser(){
    console.log("end date: " + this.state.endDate);
    var phoneno = /^\d{10}$/;
    if (this.state.firstName === ''  || this.state.lastName === '' || !this.state.phone.match(phoneno)|| this.state.chainValue === '' || this.state.unitValue === ''){
      if (this.state.firstName === '' ){
        this.setState({errorTextFirstName: '* required'});
      }
      else{
        this.setState({errorTextFirstName: ''});
      }
      if (this.state.lastName === ''){
        this.setState({errorTextLastName: '* required'});
      }
      else{
        this.setState({errorTextLastName: ''});
      }
      if (this.state.phone.match(phoneno)){
        this.setState({errorTextPhone: ''});
      }
      else{
        this.setState({errorTextPhone: 'invalid phone number'});
      }
      if(this.state.chainValue === '') {
        this.setState({errorTextChain: '* required'});
      }
      else{
        this.setState({errorTextChain: ''});
      }
      if(this.state.unitValue === '') {
        this.setState({errorTextUnit: '* required'});
      }
      else{
        this.setState({errorTextUnit: ''});
      }
    }
    else{
      if (this.state.pChecked){
        //this.setState({role: 'Manager'})
        this.state.role = 'ROLE_MP'
      }
      else if (this.state.aChecked){
        //this.setState({role: 'ADMIN'})
        this.state.role = 'ROLE_ADMIN'
      }
      else if (this.state.tChecked){
        //this.setState({role: 'Temporary Worker'})
        this.state.role = 'ROLE_TEMPORARY'
      }
      else {
        //this.setState({role: 'User'})
        this.state.role = 'ROLE_USER'
      }

      this.addUserAPI();

      //console.log("this state role: "+this.state.role);
      //this.setState({debugText: this.state.firstName + ' '+ this.state.lastName + ' '+ this.state.chainValue + ' ' + this.state.unitValue + ' ' + this.state.phone + ' '+this.state.role});
      console.log(this.state.firstName + ' '+ this.state.lastName + ' '+ this.state.chainValue + ' ' + this.state.unitValue + ' ' + this.state.phone + ' '+this.state.role);
      
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
      aChecked: false,
      pChecked: false,
      chainChanged: false,
      unitChanged: false,
      role: '',
      errorTextFirstName: '',
      errorTextLastName: '',
      errorTextPhone: '',
      errorTextChain: '',
      errorTextUnit: ''
    })
  }

  editUser(originalPhone, originalChain, originalUnit){
    let newDivision = '';
    
    if (this.state.roleChanged){
      if (this.state.pChecked){
        //this.setState({role: 'ROLE_MP'})
        this.state.role = 'ROLE_MP'
      }
      else if (this.state.aChecked){
        //this.setState({role: 'ROLE_ADMIN'})
        this.state.role = 'ROLE_ADMIN'
      }
      else if (this.state.tChecked){
        //this.setState({role: 'ROLE_EXTRA'})
        this.state.role = 'ROLE_EXTRA' 
      }
      else{
        //this.setState({role: 'ROLE_USER'})
        this.state.role = 'ROLE_USER'
      }
    }
    if (this.state.chainChanged && this.state.unitChanged){
      newDivision = this.state.chainValue + ' '+ this.state.unitValue;
      this.state.divisionId = this.getDivisionId(newDivision);
    }
    else if (this.state.chainChanged === true && this.state.unitChanged === false){
      newDivision = this.state.chainValue + ' '+originalUnit;
      this.state.divisionId = this.getDivisionId(newDivision);
    }
    else if (this.state.chainChanged === false && this.state.unitChanged === true){
      newDivision = originalChain + ' '+this.state.unitValue;
      this.state.divisionId = this.getDivisionId(newDivision);
    }
    else if (this.state.chainChanged === false && this.state.unitChanged === false){
      newDivision = originalChain + ' '+ originalUnit;
      this.state.divisionId = this.getDivisionId(newDivision);
    }
    if (this.state.phone === ''){
      this.state.phone = originalPhone;
    }
    //this.setState({debugText: this.state.firstName + ' '+ this.state.lastName + ' '+ this.state.chainValue + ' ' + this.state.unitValue + ' ' + this.state.phone + ' '+this.state.role});
    console.log('edit user: '+this.state.firstName + ' '+ this.state.lastName + ' '+ newDivision + ' ' + this.state.divisionId + ' ' + this.state.phone + ' '+this.state.role + ' role changed: '+this.state.roleChanged);
    this.getAuthId(originalPhone);
    
  }

  handleActiveChange = (event, index, activeValue) => {

    this.setState({activeValue: activeValue, tableData: [{}]});
    if (activeValue === 1){
      this.state.searchUser.userStatus = 'active'; 
      this.getUsers(); 
    }
    else if (activeValue === 2){
      this.state.searchUser.userStatus = 'inactive';
      this.getUsers();
    }
    console.log('User Status:' + this.state.searchUser.userStatus);
    //this.getUsers();
  }

  changeChain = (event, index, chainValue) => this.setState({collapseOnChange: false, chainValue: chainValue, chainChanged: true});

  changeUnit = (event, index, unitValue) => this.setState({collapseOnChange:false, unitValue: unitValue, unitChanged: true});
  
  //handle clicks
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
    if (this.state.activeText === 'Passivoi käyttäjä'){
      this.setState({activeText: 'Aktivoi käyttäjä', active: false, avatarImg: require('../../Assets/images/fiilis01-vasynyt.png')});
    }
    else {
      this.setState({activeText: 'Passivoi käyttäjä', active: true, avatarImg: require('../../Assets/images/fiilis07-iloinen.png')});
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

  closeSendSMSSuccessful = () => {
    this.setState({openSendSMSSuccessful: false})
  }

  render() {
    
    if (this.state.loggedIn === false){
      return <Redirect to='/login'/>
    }
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

/*     let data = [
      {name: 'Roni Linko', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '0404638352'},
      {name: 'Paplo Pikakassa', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '0403028362'},
      {name: 'Liron Makkarat', unit: 'S-Market Lahti', role: 'Käyttäjä', phone: '0403627664'},
      {name: 'Igna Popo', unit: 'Buffa Riihimäki', role: 'Päättäjä', phone: '0406273738'},
      {name: 'Jarco J.U Gurtström', unit: 'Buffa Lahti', role: 'Käyttäjä', phone: '0404766234'},
      {name: 'J.J. Lähtö', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '0409274637'},
      {name: 'Jessika Simpsuli', unit: 'Prisma Laune', role: 'ADMIN', phone: '0402649293'},
      {name: 'Jak Tesh', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '0409374208'},
      {name: 'Hshev Abirmi', unit: 'Prisma Laune', role: 'Käyttäjä', phone: '0408372298'},
      {name: 'Anna Boikat', unit: 'S-Market Lahti', role: 'Käyttäjä', phone: '0403827356'},
      {name: 'Henne Pirkonen', unit: 'Buffa Riihimäki', role: 'Päättäjä', phone: '0408263020'},
      {name: 'Sini Kokonen', unit: 'Buffa Lahti', role: 'Käyttäjä', phone: '0400028932'},
    ]; */

    let data = this.state.tableData;
    
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
            ? <span><img src={require('../../Assets/images/close.png')} height="20" width="20" alt="close"/></span>
            : <span><img src={require('../../Assets/images/open.png')} height="20" width="20" alt="open"/></span>}
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
        return String(row.name).toLowerCase().includes(this.state.search) || 
        String(row.unit).toLowerCase().includes(this.state.search) || 
        String(row.role).toLowerCase().includes(this.state.search) || 
        String(row.phone).includes(this.state.search) || 
        String(row.name).toUpperCase().includes(this.state.search) || 
        String(row.unit).toUpperCase().includes(this.state.search) || 
        String(row.role).toUpperCase().includes(this.state.search) ||
        String(row.name).includes(this.state.search) ||
        String(row.unit).includes(this.state.search) ||
        String(row.role).includes(this.state.search)
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
                      <img src={require('../../Assets/images/avatar.png')} height="70" width="70" style={{marginLeft: 25}} alt="avatar"/>
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
                        {this.state.allChains.map((chain, index)=>
                          <MenuItem key={index} value={chain} primaryText={chain} />
                        )}
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
                        {this.state.allUnits.map((unit, index)=>
                          <MenuItem key={index} value={unit} primaryText={unit} />
                        )}
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
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        onCheck={this.updateCheckP.bind(this)}
                      />
                      <Checkbox
                        label="Admin"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        onCheck={this.updateCheckA.bind(this)}
                      />
                      <Checkbox
                        label="Tilapäinen työntekijä"
                        style={styles.checkboxLong}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        onCheck={this.updateCheckT.bind(this)}
                      />
                      <div style={{display: this.state.tChecked ? 'flex':'none', float: 'right', paddingRight: 40}}>
                        <DatePicker 
                          hintText="Päättymispäivä"
                          okLabel="OK"
                          cancelLabel="Peruuta"
                          DateTimeFormat={DateTimeFormat}
                          mode="landscape" 
                          style={{paddingTop: 5}}
                          dialogContainerStyle={{zIndex: 4000, color: '#0a8542'}}
                          textFieldStyle={{width: 110}}
                          locale="fi"
                          onChange={(event, date) => this.setState({endDate: date.toISOString()})}
                        />
                      </div>
                      <br />
                      
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
                      <img src={this.state.avatarImg} width="70" style={{marginLeft: 40, marginTop: 15}} alt="avatar"/>
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
                        defaultValue={rowInfo.row.name.split(" ").slice(0,-1).join(" ")}
                        onChange={e => this.setState({firstName: e.target.value})}
                      />
                      <TextField
                        floatingLabelText="Sukunimi"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        defaultValue={rowInfo.row.name.split(" ")[rowInfo.row.name.split(" ").length-1]}
                        onChange={e => this.setState({lastName: e.target.value})}
                      />
                      <br />
                      <SelectField
                        style={styles.formElement}
                        //value={rowInfo.row.unit.split(" ")[0]}
                        value={this.state.chainValue}
                        onChange={this.changeChain}
                        floatingLabelText="Ketju"
                        floatingLabelFixed={true}
                        hintText={rowInfo.row.unit.split(" ")[0]}
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {this.state.allChains.map((chain, index)=>
                          <MenuItem key={index} value={chain} primaryText={chain} />
                        )}
                      </SelectField>
                      <SelectField
                        style={styles.formElement}
                        //value={rowInfo.row.unit.split(" ")[1]}
                        value={this.state.unitValue}
                        onChange={this.changeUnit}
                        floatingLabelText="Toimipaikka"
                        floatingLabelFixed={true}
                        hintText={rowInfo.row.unit.split(" ")[1]}
                        selectedMenuItemStyle={{color: '#6bbd46'}}
                      >
                        {this.state.allUnits.map((unit, index)=>
                          <MenuItem key={index} value={unit} primaryText={unit} />
                        )}
                      </SelectField>
                      <br />
                      <TextField
                        floatingLabelText="Puhelinnumero"
                        floatingLabelFixed={true}
                        style={styles.formElement}
                        underlineFocusStyle={{borderColor: '#0a8542'}}
                        floatingLabelFocusStyle={{color: '#0a8542'}}
                        defaultValue={rowInfo.row.phone}
                        onChange={e => this.setState({phone: e.target.value})}
                      />
                      <br />
                      <Checkbox
                        label="Päättäjä"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        defaultChecked={this.checkRoleP(rowInfo.row.role)}
                        onCheck={this.updateCheckP.bind(this)}                        
                      />
                      <Checkbox
                        label="Admin"
                        style={styles.checkbox}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        defaultChecked={this.checkRoleA(rowInfo.row.role)}
                        onCheck={this.updateCheckA.bind(this)}
                      />
                       <Checkbox
                        label="Tilapäinen työntekijä"
                        style={styles.checkboxLong}
                        labelStyle={{color: '#525252'}}
                        inputStyle={{color: '#525252'}}
                        iconStyle={{fill: '#525252'}}
                        defaultChecked={this.checkRoleT(rowInfo.row.role)}
                        onCheck={this.updateCheckT.bind(this)}
                      />
                      <RaisedButton 
                        label="Lähetä IOS -latauskoodi"
                        labelStyle={styles.secondaryButtonText} 
                        style={styles.secondaryButton}
                        buttonStyle={{ borderRadius: 25, height: 28, lineHeight:'28px'}}
                        labelColor={'#ffffff'}
                        onClick={()=>{this.sendIOSLink(rowInfo.row.phone, rowInfo.row.name.split(" ").slice(0,-1).join(" "), rowInfo.row.unit)}}                       
                      />
                      <br /><br /><br />
                      <RaisedButton 
                        label="Tallenna" 
                        style={styles.button}
                        buttonStyle={{ borderRadius: 25 }}
                        labelColor={'#ffffff'}
                        backgroundColor={'#0a8542'}
                        onClick={()=>{this.editUser(rowInfo.row.phone, rowInfo.row.unit.split(" ")[0], rowInfo.row.unit.split(" ")[1]); }}
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
            open={this.state.openSendSMSSuccessful}
            message={'A text message is sent to the user phone number!'}
            autoHideDuration={2000}
            onRequestClose={this.closeSendSMSSuccessful}
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
