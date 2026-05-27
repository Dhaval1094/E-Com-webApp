import { baseUrl } from "./utils.js";

const form = document.getElementById("signupForm");
const result = document.getElementById("result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Submitting signup form");
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `${baseUrl}/signup`
  );
  xhr.setRequestHeader(
    "Content-Type",
    "application/json"
  );
  xhr.onload = function () {
    console.log(xhr.responseText);
    const data = JSON.parse(xhr.responseText);
    result.innerText = data.message;
  };
  xhr.onerror = function () {
    result.innerText = "Server Error";
  };
  xhr.send(JSON.stringify({
    name,
    email,
    password
  }));
});