export function storeSessionToken(token) {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('sessionToken', token);
  } else {
    console.error('SessionStorage is not available in this environment.');
  }
}

export function getSessionToken() {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem('sessionToken');
  } else {
    console.error('SessionStorage is not available in this environment.');
    return null;
  }
}