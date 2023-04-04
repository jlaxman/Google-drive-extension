import utils from "./utils.js";

let CLIENT_ID =
  "337914154185-kecb8tvffhim7otqth09qjng23dd6086.apps.googleusercontent.com";
let REDIRECT_URI = "http://localhost:8000/profile.html";
let SCOPES = "https://www.googleapis.com/auth/drive";

let button = document.getElementById("button");

button.addEventListener("click", signIn);

function signIn() {
  utils.signIn(CLIENT_ID, REDIRECT_URI, SCOPES);
}
