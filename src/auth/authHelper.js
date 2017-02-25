export function getLogin(login){
  var myInit = { method: 'POST',
               headers: {"Content-Type": "application/json"},
               mode: 'cors',
               body: JSON.stringify(login) };
  return fetch(`http://${DBIP}:${DBPORT}/login`, myInit).then(response => response.json())
}