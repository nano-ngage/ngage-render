export function getLogin(login){
  console.log(login);
  var myHeaders = new Headers();

  var myInit = { method: 'POST',
               headers: {"Content-Type": "application/json"},
               mode: 'cors',
               body: JSON.stringify(login) };
  return fetch('http://localhost:5000/login', myInit).then(response => response.json())
}