import jwt_decode from 'jwt-decode';

export function logout() {
  clearIdToken();
  //clearAccessToken();
  this.props.history.push('/login');
}

/* export function login() {
  fetch(`${constants.apiGetToken}/mule/getToken`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state.authorize)
}).then(response => response.json())
    .then(responseJson => {
      setAccessToken(responseJson.access_token);
      setIdToken(responseJson.id_token);

}).catch(e => console.warn(e))
    .catch(e => console.warn(e))
} */

export function getIdToken() {
  var token = '';
  return token = localStorage.getItem('id_token');
  console.log('Local Storage Get Id Token: '+token);
}

export function getAccessToken() {
  //return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearIdToken() {
  localStorage.removeItem('id_token');
}

function clearAccessToken() {
  //localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Get and store access_token in local storage, maybe not needed
export function setAccessToken(access_token) {
  //localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
}

// Get and store id_token in local storage, id_token is the JWT token
export function setIdToken(token) {
  localStorage.setItem('id_token', token);
  console.log('Local Storage Set Id Token: '+token);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = jwt_decode(encodedToken);
  if (!token.exp) { 
    return null; 
  }
  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  console.log("token expiring date: "+date);
  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
} 
