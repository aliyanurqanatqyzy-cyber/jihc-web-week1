let loginModal = document.getElementById("loginModal");
let loginButton = document.getElementById("modalBtn");
let loginCloseButton = document.getElementById("loginCloseBtn");
let loginForm = document.getElementById("loginForm");
let loginEmailInput = document.getElementById("loginEmail");
let loginPasswordInput = document.getElementById("loginPassword");
let loginMessage = document.getElementById("loginMessage");

loginButton.onclick = function () {
    loginMessage.textContent = "";
    loginModal.showModal();
};

loginCloseButton.onclick = function () {
    loginModal.close();
};

loginModal.onclose = function () {
    loginPasswordInput.value = "";
};

loginForm.onsubmit = function (event) {
    event.preventDefault();
    loginMessage.textContent = "";

    let email = loginEmailInput.value;
    email = email.trim();
    email = email.toLowerCase();

    let password = loginPasswordInput.value;
    let passwordWithoutSpaces = password.trim();

    if (email === "") {
        loginMessage.textContent = "Please enter your email.";
        return;
    }

    if (passwordWithoutSpaces === "") {
        loginMessage.textContent = "Please enter your password.";
        return;
    }

    let savedUsers = localStorage.getItem("users");
    let users = [];

    if (savedUsers !== null) {
        users = JSON.parse(savedUsers);
    }

    let userNumber = 0;
    let loginIsCorrect = false;

    while (userNumber < users.length) {
        let user = users[userNumber];
        let savedEmail = user.email.trim();
        savedEmail = savedEmail.toLowerCase();

        if (savedEmail === email) {
            if (user.password === password) {
                loginIsCorrect = true;
                break;
            }
        }

        userNumber = userNumber + 1;
    }

    if (loginIsCorrect === true) {
        window.location.href = "users.html";
    } else {
        loginMessage.textContent = "Incorrect email or password.";
    }
};
