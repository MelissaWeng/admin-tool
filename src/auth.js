export function logout() {
  clearIdToken();
  clearAccessToken();
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
  //return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  //return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  //localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  //localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Get and store access_token in local storage, maybe not needed
export function setAccessToken(access_token) {
  //localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
}

// Get and store id_token in local storage, id_token is the JWT token
export function setIdToken(id_token) {
  //localStorage.setItem(ID_TOKEN_KEY, id_token);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { 
    return null; 
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
