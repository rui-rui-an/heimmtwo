const tokenName = 'mm64Token'
function getToken () {
  return localStorage.getItem(tokenName)
}
function saveToken (token) {
  localStorage.setItem(tokenName, token)
}
function removeToken () {
  localStorage.removeItem(tokenName)
}
export { getToken, saveToken, removeToken }
