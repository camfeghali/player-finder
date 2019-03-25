document.addEventListener("DOMContentLoaded", () => {

  console.log("HEY Camille and Dolma are in the DOM!!!!!")
  const username = document.querySelector('#name')
  const passwordField = document.querySelector('#password')
  const submitButton = document.querySelector('#submit-button')
  const bodyDiv = document.querySelector("body")
  const joinBtn = document.querySelector(".join-btn")
  const createBtn = document.querySelector(".create-btn")

  const USER_URL = 'http://localhost:3000/users'

  submitButton.addEventListener('click', validate)


  function validate(e) {
    e.preventDefault();
    fetch (USER_URL)
    .then (res => res.json())
    .then (users => validateAndFindUser(users))
    .then (found => loginHandler(found))

  }

  function validateAndFindUser(users) {
    // console.log(users)
    return users.find(function (user) {
      return (user.username === username.value && user.password === passwordField.value)
    })
  }

  function loginHandler(returnedUser){
    if (returnedUser) {
      clearBody()
      loadFirstPage(returnedUser)
      // appendUserGames(returnedUser)
    }else{
      showLoginError()
    }
  }



  function loadFirstPage(user){
    console.log("first page loaded")
    bodyDiv.innerHTML +=
    `
      <div style="width: 50%; float:left">
        <p> left side </p>
        <ul id="user-games">

        </ul>
      </div>
      <div style="width: 50%; float:right">
       <div class = "button-container">
         <button class="btn btn-primary btn-lg create-btn" type="button">
           Create a Game
         </button>
         <button class="btn btn-primary btn-lg join-btn" type="button">
           Join a Game
         </button>
       </div>
      </div>
    `
    const ul = document.querySelector('#user-games')

    console.log(user.games)
    user.games.forEach (function(game) {
      ul.innerHTML +=
      `
      <li> Game: ${game.name} </li>
      <li> Address: ${game.address} </li>
      <li> Start Time: ${game.start_time} </li>
      `
    })

  }


  function showLoginError(){
    const errorMsg = document.querySelector("#error")
    if (errorMsg){
      errorMsg.remove()
      passwordField.insertAdjacentHTML('afterend', '<p id="error" > Invalid Username or Password </p>')
    }else{
      passwordField.insertAdjacentHTML('afterend', '<p id="error" > Invalid Username or Password </p>')
    }
  }

  function clearBody(){
    document.querySelector("body").innerHTML = ''
  }


})
