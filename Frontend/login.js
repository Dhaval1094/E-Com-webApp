import { baseUrl } from "./utils.js";

const loginForm = document.getElementById("loginForm");
const loginResult = document.getElementById("loginResult");
const loader = document.getElementById("loader");
loginForm.addEventListener("submit", (e) => {
    loader.style.display = "block";
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        `${baseUrl}/login`
    );
    xhr.setRequestHeader(
        "Content-Type",
        "application/json"
    );
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        loginResult.innerText = data.message;
        if (xhr.status === 200) {
            window.location.href = "products.html";
        }
        loader.style.display = "none";
    };
    xhr.onerror = function () {
        loginResult.innerText = "Server Error";
        loader.style.display = "none";
    };
    xhr.send(JSON.stringify({
        email,
        password
    }));
});