import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import auth, { setIdToken, logout, clearIdToken } from '../../auth';
import constants from '../constants';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      errorText: ''
    }
   }
   componentWillMount(){
    
      fetch(`${constants.muleUrl}/mule/statusCheck`)
      .then(response =>  {
          //console.log('-Mule Status-', responseJson)
          console.log('-Mule Status-', response)
        }).catch(e => console.log(e))
    
    clearIdToken();
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

      fetch(`${constants.muleUrl}/mule/getToken`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: 'T09fNfkiW66da5X47X4YvIN7ZR2ClUQI',
          user_id: '',
          connection: 'Username-Password-Authentication',
          scope: 'openid profile',
          username: this.state.username,
          password: this.state.password
      })
        }).then(response => response.json())
            .then(responseJson => {
                
                if (!responseJson.hasOwnProperty('id_token')) {
                    //this.state.authorize.invalidLoginMsg = 'Käyttäjätunnus tai salasana on väärin.';
                    //this.setState(this.state);
                    this.setState({errorText: 'Käyttäjätunnus tai salasana on väärin.'})               
                } else{
                    console.log(responseJson.id_token);
                    setIdToken(responseJson.id_token);
                    //this.phoneAuth(responseJson.id_token);
                    //AsyncStorage.multiSet([['access_token', responseJson.access_token], ['id_token', responseJson.id_token]]).catch(e => console.warn(e));
                    this.props.history.push('/');
                }

        }).catch(e => console.warn(e))
            .catch(e => console.warn(e))

      
    }


  render() {

  return (
    
    <div className="container">
      <div className="login-bg"> 
        <div className="login">
          <MuiThemeProvider>

            <img src={require('../../Assets/images/logo.png')} height="70" width="70" style={{display: 'block', marginLeft: 'auto', marginRight:'auto'}} alt="logo"/>
            
            <img src={require('../../Assets/images/mun-fiilis.png')} height="30" style={{display: 'block', marginLeft: 'auto', marginRight:'auto', marginTop: 30}} alt="mun fiilis"/>

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
            <p style={{fontSize: 14, color: "red", marginBottom:0}}>{this.state.errorText}</p>
            
            <RaisedButton 
            label="Login" 
            buttonStyle={{ borderRadius: 25 }}
            labelColor={'#ffffff'}
            backgroundColor={'#0a8542'}
            style={{width: 150, borderRadius: 25, fontSize: 13, marginTop: 40, zIndex: 3000}} 
            onClick={() => this.handleClick()}
            />
            
            
          </MuiThemeProvider>
          
          </div>
          <div className="footer">
            <img src={require('../../Assets/images/fiilis-maisema.png')} width="100%" height="100%" alt="footer"/>
          </div>
        </div>
      </div>
        
  );
  }
}

export default Login;