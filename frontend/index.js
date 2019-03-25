document.addEventListener("DOMContentLoaded", () => {

  console.log("HEY Camille and Dolma are in the DOM!!!!!")
  const username = document.querySelector('#name')
  const passwordField = document.querySelector('#password')
  const submitButton = document.querySelector('#submit-button')
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
      loadFirstPage()
    }else{
      showLoginError()
    }
  }

  function loadFirstPage(){
    console.log("first page loaded")
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
