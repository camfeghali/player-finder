document.addEventListener("DOMContentLoaded", () => {

  console.log("HEY Camille and Dolma are in the DOM!!!!!")
  const username = document.querySelector('#name')
  const passwordField = document.querySelector('#password')
  const submitButton = document.querySelector('#submit-button')
  const bodyDiv = document.querySelector("body")
  let userId;
  // const joinBtn = document.querySelector(".join-btn")
  // const createBtn = document.querySelector(".create-btn")


  const USERS_URL = 'http://localhost:3000/users'
  const GAMES_URL = 'http://localhost:3000/games'
  const COURTS_URL = 'http://localhost:3000/courts'

  submitButton.addEventListener('click', validate)


  function validate(e) {
    e.preventDefault();
    fetch (USERS_URL)
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
      userId = returnedUser.id
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
    fetchAllGames();
    const createNewGameBtn = document.querySelector('#create-new-game-btn')
    createNewGameBtn.addEventListener('click', postGame)
    const gamesBtn = document.querySelector('#games-buttons')
    gamesBtn.addEventListener('click', filterHandler)
    let gameList = document.querySelector('#games-list')
    gameList.addEventListener("click",  joinGameHandler)

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
        </div >
        <div id ="games-buttons">
          <button  id = "basketball-btn" >Basketball</button>
          <button  id = "football-btn" >Football</button>
          <button  id = "soccer-btn" >Soccer</button>
          <button  id = "pingpong-btn" >Pingpong</button>
          <button  id = "all-btn" >All Games</button>
        </div>
        <div id = "games-list">
        </div>
      </div>
    `
  }

// ------------------ LOGIN ERROR ---------------------------------------

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

// --------------- GENERATE CREATE A GAME FORM --------------------------

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
            <label for="capacity">Capacity: </label>
            <input class = "form-control" id = "capacity" type="number"/>
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


// ------------------------ Fetch Requests ---------------------------

// ------------------------ Post A Court  ---------------------------

function postCourt(game){
  console.log("WE ARE POSTING a COURT")

  let data =
  {
    user_id: userId,
    game_id: game.id
  }
  let config =
  {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers:
    {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  fetch(COURTS_URL, config)
  .then(resp => resp.json())
  .then(court => console.log(court))

}

// ------------------------ Post a Game ---------------------------

  function postGame(e) {


    console.log("userId:", userId)

    let gameName = document.querySelector("#game-name").value
    let sport = document.querySelector("#sport-type").value
    let gameDay = document.querySelector("#game-day").value
    let startTime = document.querySelector("#start-time").value
    let endTime = document.querySelector("#end-time").value
    let gameCapacity = document.querySelector("#capacity").value
    let gameAddress = document.querySelector("#location").value

    let data =
    {
      name: gameName,
      game_type: sport,
      address: gameAddress,
      game_day: gameDay,
      start_time: startTime,
      end_time: endTime,
      capacity: gameCapacity
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
    fetch(GAMES_URL, config)
    .then(resp => resp.json())
    .then(game => postCourt(game))

  }

// ---------------------- FETCH ALL GAMES -----------------------------

  function fetchFilteredGames(targetGames){
    fetch(GAMES_URL)
    .then(resp => resp.json())
    .then(games => filterGames(games, targetGames))
    .then(filtered => appendAllGames(filtered))
  }

  function filterHandler(event) {
    let targetGame = event.target.innerText
    if (targetGame === "All Games"){
      fetchAllGames()
    }else{
      fetchFilteredGames(targetGame)
    }
  }

  function filterGames(games, targetGame) {
    return games.filter((game) => {
      return (game.game_type.toLowerCase() === targetGame.toLowerCase())
    })
  }



  function fetchAllGames() {
    fetch(GAMES_URL)
    .then(resp => resp.json())
    .then(games => appendAllGames(games))
  }

  function appendAllGames(games) {
    let gameList = document.querySelector('#games-list')
    gameList.innerHTML = ''
    games.forEach((game) => {
      gameList.innerHTML +=
      `<div data-game-id = ${game.id}>
        <p> ${game.name}</p>
        <p> ${game.game_type} </p>
        <p> ${game.address} </p>
        <p> ${game.game_day} </p>
        <p> ${game.start_time} </p>
        <p> ${game.end_time} </p>
        <p> ${game.capacity} </p>
        <p class="game-player-count"> ${game.players.length} </p>
        <button >Join</button>
      </div>
      `
    })
  }


  function joinGameHandler(e) {
    increasePlayerCountInFrontEnd(e)
    removeGameFromList(e)
    addGameToMyList(e)
    // saveToDatabase(e)
  }

  function addGameToMyList(e){
    console.log(e.target.parentNode)
  }

  function removeGameFromList(e){
    if (e.target.innerText === "Join") {
      e.target.parentNode.remove()
    }
  }

// --------------- Increase player Count in Front End ---------------
  function increasePlayerCountInFrontEnd(e){
    if (e.target.innerText === "Join") {
      e.target.parentNode.querySelector(".game-player-count").innerText = parseInt(e.target.parentNode.querySelector(".game-player-count").innerText) + 1
    }
  }

})
