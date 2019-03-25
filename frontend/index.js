document.addEventListener("DOMContentLoaded", () => {

  console.log("HEY Camille and Dolma are in the DOM!!!!!")
  const username = document.querySelector('#name')
  const passwordField = document.querySelector('#password')
  const submitButton = document.querySelector('#submit-button')
  const bodyDiv = document.querySelector("body")
  // const joinBtn = document.querySelector(".join-btn")
  // const createBtn = document.querySelector(".create-btn")


  const USER_URL = 'http://localhost:3000/users'
  const GAME_URL = 'http://localhost:3000/games'

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
    createBody()
    appendUserGamestoUL(user);
    generateForm();
    const createNewGameBtn = document.querySelector('#create-new-game-btn')
    createNewGameBtn.addEventListener('click', postGame)
  }

  function appendUserGamestoUL(user){
    const ul = document.querySelector('#user-games')
    user.games.forEach (function(game) {
      ul.innerHTML +=
      `
      <li> Game: ${game.name} </li>
      <li> Address: ${game.address} </li>
      <li> Game Day: ${game.game_day.split("T")[0]} </li>
      <li> Start Time: ${game.start_time.split("T")[1]} </li>
      <li> End Time: ${game.end_time.split("T")[1]} </li>
      `
    })
  }

  function createBody() {
    bodyDiv.innerHTML +=
    `
      <div style="width: 30%; float:left">
        <ul id="user-games">

        </ul>
      </div>
      <div style="width: 70%; float:right">
      <div class="form-container">

      </div>
       <div class = "button-container">
         <button class="btn btn-primary btn-lg join-btn" type="button">
           Join a Game
         </button>
       </div>
      </div>
    `
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


  function generateForm() {
    const formDiv = document.querySelector('.form-container')
    formDiv.innerHTML =
    `
    <form>
        <div class="form-group">
            <label for="name">Game Name</label>
            <input class="form-control" type="text" id="game-name" placeholder="Enter name">
        </div>

        <div class="form-group">
            <label for="Sport">Sport</label>
            <select class="form-control" id="sport-type">
                <option>Basketball</option>
                <option>Football</option>
                <option>Ping Pong</option>
                <option>Hockey</option>
            </select>
        </div>

        <div class="form-group">
            <label for="game-day">Game Day: </label>
            <input class = "form-control" id = "game-day" type="date"/>
        </div>

        <div class="form-group">
            <label for="start_time">Game Start Time: </label>
            <input class = "form-control" id = "start-time" type="time"/>
        </div>


        <div class="form-group">
            <label for="end_time">Game End Time: </label>
            <input class = "form-control" id = "end-time" type="time"/>
        </div>

        <div class="form-group">
            <label for="end_time">Game Location: </label>
            <input class="form-control" type="text" id="location">
        </div>

        <br>
        <button class="btn btn-primary btn-block" id = "create-new-game-btn" type="submit">Submit</button>
    </form>
    `
  }


  function postGame(e) {

    console.log("WE ARE POSTING")

    let gameName = document.querySelector("#game-name").value
    let sport = document.querySelector("#sport-type").value
    let gameDay = document.querySelector("#game-day").value
    let startTime = document.querySelector("#start-time").value
    let endTime = document.querySelector("#end-time").value

    let data =
    {
      name: gameName,
      game_type: sport,
      game_day: gameDay,
      start_time: startTime,
      end_time: endTime
    }

    e.preventDefault();
    let config =
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers:
      {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    fetch(GAME_URL, config)
    .then(resp => resp.json())
    .then(data => console.log(data))
  }


})
