import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
   }

   handleClick(){
    /* var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload={
      "email":this.state.username,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
      .then(function (response) {
        console.log(response);
        if(response.data.code == 200){
        console.log("Login successfull");
        var uploadScreen=[];
        uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
        else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
        }
        })
          .catch(function (error) {
          console.log(error);
      }); */
      this.props.history.push('/')
    }


  render() {

  return (
    
    <div className="container">
      <div className="login-bg"> 
        <div className="login">
          <MuiThemeProvider>

            <img src={require('../../Assets/images/logo.png')} height="70" width="70" style={{display: 'block', marginLeft: 'auto', marginRight:'auto'}} />
            
            <img src={require('../../Assets/images/mun-fiilis.png')} height="30" style={{display: 'block', marginLeft: 'auto', marginRight:'auto', marginTop: 30}} />

            <p style={{color: '#0a8542', textAlign:'center', display: 'block', marginTop: 10}}>ADMIN</p>

            <p style={{color: '#525252', textAlign:'center', display: 'block', marginTop: 20, fontSize: 12, marginBottom:0}}>Kirjaudu sisään:</p>
            
            <TextField
              style={{marginTop: 0, fontSize: 14, fontFamily: 'inherit'}}
              hintText="Puhelinumero e.g. 0401234567"
              floatingLabelText="Käyttäjätunnus"
              underlineFocusStyle={{borderColor: '#0a8542'}}
              floatingLabelFocusStyle={{color: '#0a8542'}}
              onChange = {(event,newValue) => this.setState({username:newValue})}
              />
            <br/>
            <TextField
              style={{fontSize: 14, fontFamily: 'inherit'}}
              type="password"
              hintText="Salasana"
              floatingLabelText="Salasana"
              underlineFocusStyle={{borderColor: '#0a8542'}}
              floatingLabelFocusStyle={{color: '#0a8542'}}
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
            <br/>
            <RaisedButton 
            label="Login" 
            buttonStyle={{ borderRadius: 25 }}
            labelColor={'#ffffff'}
            backgroundColor={'#0a8542'}
            style={{width: 150, borderRadius: 25, fontSize: 13, marginTop: 40}} 
            onClick={() => this.handleClick()}
            />
            
            
          </MuiThemeProvider>
          
          </div>
          <div className="footer">
            <img src={require('../../Assets/images/fiilis-maisema.png')} width="100%" height="100%"/>
          </div>
        </div>
      </div>
        
  );
  }
}

const style = {
  margin: 15,
 };

export default Login;