// ---------- Tab Switching ----------
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

function showRegister() {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
}

// ---------- Show/Hide Password ----------
function togglePassword(inputId, el) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    el.innerText = "Hide";
  } else {
    input.type = "password";
    el.innerText = "Show";
  }
}

// ---------- Helper: Show Message ----------
function showMessage(elementId, text, isSuccess) {
  const msgEl = document.getElementById(elementId);
  msgEl.innerText = text;
  msgEl.className = "message " + (isSuccess ? "success" : "error");
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- Register Logic ----------
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (name === "" || email === "" || password === "" || confirm === "") {
    showMessage("registerMessage", "Please fill in all fields", false);
    return;
  }

  if (!emailPattern.test(email)) {
    showMessage("registerMessage", "Please enter a valid email", false);
    return;
  }

  if (password.length < 6) {
    showMessage("registerMessage", "Password must be at least 6 characters", false);
    return;
  }

  if (password !== confirm) {
    showMessage("registerMessage", "Passwords do not match", false);
    return;
  }

  // Save user to localStorage (simple simulation, not for real security use)
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.some(function (u) {
    return u.email === email;
  });

  if (alreadyExists) {
    showMessage("registerMessage", "An account with this email already exists", false);
    return;
  }

  users.push({ name: name, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("registerMessage", "Registration successful! You can now log in.", true);
  registerForm.reset();

  setTimeout(showLogin, 1200);
});

// ---------- Login Logic ----------
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    showMessage("loginMessage", "Please fill in all fields", false);
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (!user) {
    showMessage("loginMessage", "Invalid email or password", false);
    return;
  }

  showMessage("loginMessage", "Login successful! Welcome, " + user.name + ".", true);
});
