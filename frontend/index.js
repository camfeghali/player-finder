document.addEventListener("DOMContentLoaded", () => {

  console.log("HEY Camille and Dolma are in the DOM!!!!!")

  // -------------------- INPUT VALUES DIVS --------------------
  const username = document.querySelector('#name')
  const passwordField = document.querySelector('#password')
  const submitButton = document.querySelector('#submit-button')
  const bodyDiv = document.querySelector("body")
  let userId;
  // const joinBtn = document.querySelector(".join-btn")
  // const createBtn = document.querySelector(".create-btn")

  // -------------------- API URLS --------------------
  const USERS_URL = 'http://localhost:3000/users'
  const GAMES_URL = 'http://localhost:3000/games'
  const COURTS_URL = 'http://localhost:3000/courts'

  submitButton.addEventListener('click', validate)

// ------------------- VALIDATE USER -----------------
  function validate(e) {
    e.preventDefault();
    fetch (USERS_URL)
    .then (res => res.json())
    .then (users => validateAndFindUser(users))
    .then (found => loginHandler(found))

  }

// -------------------- VALIDATE AND FIND USER ----------------
  function validateAndFindUser(users) {
    // console.log(users)
    return users.find(function (user) {
      return (user.username === username.value && user.password === passwordField.value)
    })
  }

// ------------------- HANDLE LOGIN  -------------------------
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


// --------------------- LOAD FIRST PAGE ----------------------
  function loadFirstPage(user){
    console.log("first page loaded")
    createBody()
    appendUserGamestoUL(user);
    // generateForm();
    fetchAllGames();
    mapGenerator()
    // const createNewGameBtn = document.querySelector('#create-new-game-btn')
    // createNewGameBtn.addEventListener('click', postGame)
    const gamesBtn = document.querySelector('#games-buttons')
    gamesBtn.addEventListener('click', filterHandler)
    let gameList = document.querySelector('#games-list')
    gameList.addEventListener("click",  joinGameHandler)
    const myGamesList = document.querySelector("#user-games")
    myGamesList.addEventListener("click",  leaveGameHandler)

  }

 // ------------------- Append All Games To My List ---------------------
  function appendUserGamestoUL(user){
    let myGameContainer = document.querySelector('#user-games')
    let filteredByDateGames = filterByDate(user.games)
    filteredByDateGames.forEach (function(game) {
      myGameContainer.innerHTML +=
      `
      <div data-mygame-id=${game.id}>
        <p> Game: ${game.name} </p>
        <p> Address: ${game.address} </p>
        <p> Game Day: ${game.game_day.split("T")[0]} </p>
        <p> Start Time: ${game.start_time.split("T")[1]} </p>
        <p> End Time: ${game.end_time.split("T")[1]} </p>
        <button> Leave Game </button>
      </div>
      `
    })
  }

// -------------------- CREATE BODY OF FIRST PAGE -------------------
  function createBody() {
    bodyDiv.innerHTML +=
    `
      <div style="width: 30%; float:left">
        <div id="user-games">

        </div>
      </div>
      <div style="width: 70%; float:right">
        <div id="mapid"></div>
        <div class="form-container">
        </div >
        <div id ="games-buttons">
          <button  id = "basketball-btn" >Basketball</button>
          <button  id = "football-btn" >Football</button>
          <button  id = "soccer-btn" >Soccer</button>
          <button  id = "pingpong-btn" >Ping Pong</button>
          <button  id = "all-btn" >All Games</button>
        </div>
        <div id = "games-list">
        </div>
      </div>
    `
  }

// ----------------------- LOGIN ERROR ---------------------------------------

  function showLoginError(){
    const errorMsg = document.querySelector("#error")
    if (errorMsg){
      errorMsg.remove()
      passwordField.insertAdjacentHTML('afterend', '<p id="error" > Invalid Username or Password </p>')
    }else{
      passwordField.insertAdjacentHTML('afterend', '<p id="error" > Invalid Username or Password </p>')
    }
  }

// ------------------ CLEAR BODY OF LOGIN PAGE -------------------------
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
                <option>Soccer</option>
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
        <button class="btn btn-primary btn-block" id = "create-new-game-btn">Submit</button>
    </form>
    `
    return formDiv
  }


// ------------------------ Fetch Requests ---------------------------

// ------------------------ Post A Court  ---------------------------
function postCourt(gameId){
  console.log("WE ARE POSTING a COURT")

  let data =
  {
    user_id: userId,
    game_id: gameId
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
  .then(court => appendCourtToMyList(court))

}

// ------------------------- Append a Game/Court to My List ---------------
  function appendCourtToMyList(court) {
    let ul = document.querySelector('#user-games')
    ul.innerHTML += `

    <div data-mygame-id=${court.game.id}>
    <p> Game: ${court.game.name} </p>
    <p> Address: ${court.game.address} </p>
    <p> Game Day: ${court.game.game_day.split("T")[0]} </p>
    <p> Start Time: ${court.game.start_time.split("T")[1]} </p>
    <p> End Time: ${court.game.end_time.split("T")[1]} </p>
    <button> Leave Game </button>
    </div>
    `
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
    .then(game => postCourt(game.id))

  }

// ---------------------- FETCH ALL GAMES -----------------------------

  function fetchFilteredGames(targetGames){
    fetch(GAMES_URL)
    .then(resp => resp.json())
    .then(games => filterGames(games, targetGames))
    .then(games => filterOutMyGames(games))
    .then(games => filterByCapacity(games))
    .then(games => filterByDate(games))
    .then(filtered => appendAllGames(filtered))
  }

// -------------------- FILTER LIST ----------------
  function filterHandler(event) {
    let targetGame = event.target.innerText
    if (targetGame === "All Games"){
      fetchAllGames()
    }else{
      fetchFilteredGames(targetGame)
    }
  }

// ------------------- FILTER BY CAPACITY ----------------
  function filterByCapacity(games){
    return games.filter((game) => {
      return (game.capacity > game.players.length)
    })
  }

  // ------------------- FILTER BY DATE ----------------
  function filterByDate(games){
    return games.filter(game => {
      let currentDate = new Date()
      let gameDay = new Date(game.game_day)
      return gameDay > currentDate
    })
  }
// --------------------- FILTER BY SPORT -----------------
  function filterGames(games, targetGame) {
    return games.filter((game) => {
      return (game.game_type.toLowerCase() === targetGame.toLowerCase())
    })
  }


// --------------------- FETCH and APPEND GAMES ----------------
  function fetchAllGames() {
    fetch(GAMES_URL)
    .then(resp => resp.json())
    .then(games => filterOutMyGames(games))
    .then(games => filterByCapacity(games))
    .then(games => filterByDate(games))
    // .then(games => console.log(games))
    .then(filteredGames => appendAllGames(filteredGames))
  }

//------------------------ Filter Games --------------------------

  function filterOutMyGames(games) {
    console.log(games);
    return games.filter((game) => {
      return !game.players.find(player => player.id === userId)
    })
  }

// ---------------- Append All Games List ---------------------
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

// --------------------------- HANDLE JOINING A GAME -----------------
  function joinGameHandler(e) {
    if (e.target.innerText === "Join") {
      increasePlayerCountInFrontEnd(e)
      removeGameFromList(e)
      addGameToMyList(e)
    }
  }

  // ---------------- AFTER JOINING JOINING A GAME, Add IT TO MY LIST -----------------
  function addGameToMyList(e){
    let gameId = parseInt(e.target.parentNode.dataset.gameId)
    postCourt(gameId)
  }

// -------------------- REMOVE A GAME FROM MY LIST --------------
  function removeGameFromList(e){
      e.target.parentNode.remove()
  }

// --------------- Increase player Count in Front End ---------------
  function increasePlayerCountInFrontEnd(e){
    if (e.target.innerText === "Join") {
      e.target.parentNode.querySelector(".game-player-count").innerText = parseInt(e.target.parentNode.querySelector(".game-player-count").innerText) + 1
    }
  }

  function leaveGameHandler(e){
    if (e.target.innerText === "Leave Game"){
      console.log("leaveclicked")
      removeGameFromList(e)
      let gameId = parseInt(e.target.parentNode.dataset.mygameId)
      console.log(gameId)
      // removeMyGameFromBackend(gameId)
    }
  }

  function removeGameFromList(e){
    e.target.parentNode.remove()
    let gameId = parseInt(e.target.parentNode.dataset.mygameId)
    fetch(COURTS_URL)
    .then(res => res.json())
    .then(courts => findCourtByGameAndUser(courts, gameId))
    .then(foundCourt => removeMyGameFromBackend(foundCourt))
  }


  function removeMyGameFromBackend(foundCourt){
    console.log(foundCourt)

    let config =
    {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers:
      {
        "Content-Type": "application/json",
      }
      // body: JSON.stringify(data),
    }
    fetch(`${COURTS_URL}/${foundCourt.id}`, config)
  }



  function findCourtByGameAndUser(courts, gameId) {
    // console.log("we are here")
    // console.log(typeof userId)
    // debugger;
    return courts.find((court) => {
      return (court.game.id === gameId && court.user.id === userId)
    })
  }


  // -------------------- Map Generator ----------------------------
  function mapGenerator(){
    let mymap = L.map('mapid').setView([40.727822, -73.985776], 13);
    let popup = L.popup();

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY29va2kiLCJhIjoiY2p0bm53b2IwMHAxNjN5cGRuYXJzdG1rNCJ9.Z7p-0gkunkycqAbdMPZiuQ'
      }).addTo(mymap);

      // let div

      function onMapClick(e) {
        getAddress(e.latlng)
        popup
            .setLatLng(e.latlng)
            .setContent(generateForm)
            .openOn(mymap);
            const createNewGameBtn = document.querySelector('#create-new-game-btn')
            createNewGameBtn.addEventListener('click', postGame)
      }
      mymap.on('click', onMapClick);

  }

  function getAddress(latlng){
    let lat = latlng.lat
    let lng = latlng.lng
    console.log("type of lat and long:", typeof lat)
    fetch(`http://api.geonames.org/findNearestAddress?lat=${lat}&lng=${lng}&username=demo`)
    .then(resp => xmlToJson(resp))
    .then(data => console.log(data))
  }

})
