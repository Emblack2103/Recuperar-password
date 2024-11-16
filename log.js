const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const submitBtn = document.getElementById("submitBtn");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");

const recoveryContainer = document.querySelector(".recovery-container");
const loginContainer = document.querySelector(".login-container");
const recoveryEmailInput = document.getElementById("recoveryEmail");
const newPasswordInput = document.getElementById("newPassword");
const recoveryEmailError = document.getElementById("recoveryEmailError");
const newPasswordError = document.getElementById("newPasswordError");
const recoveryForm = document.getElementById("recoveryForm");
const backToLoginLink = document.getElementById("backToLoginLink");

const users = [
  { email: "usuario@gmail.com", password: "usuario123", role: "user" },
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
];


forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginContainer.style.display = "none";
  recoveryContainer.style.display = "block";
});


backToLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  recoveryContainer.style.display = "none";
  loginContainer.style.display = "block";
});


emailInput.addEventListener("input", checkFormValidity);
passwordInput.addEventListener("input", checkFormValidity);

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  validateForm();
});

function checkFormValidity() {
  const isEmailValid = validateEmail(emailInput.value);
  const isPasswordValid = validatePassword(passwordInput.value);
  emailError.style.display = isEmailValid ? "none" : "block";
  passwordError.style.display = isPasswordValid ? "none" : "block";
  submitBtn.disabled = !(isEmailValid && isPasswordValid);
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  const passwordPattern = /^(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
}

function validateForm() {
  const user = users.find(
    (u) => u.email === emailInput.value && u.password === passwordInput.value
  );

  if (user) {
    sessionStorage.setItem("role", user.role);
    if (user.role === "admin") {
      alert("Acceso de administrador exitoso");
      window.location.replace("../index.html");
      showAdminFeatures();
    } else {
      alert("Acceso de usuario exitoso");
      window.location.replace("../index.html");
      hideDataTableForUser();
    }
    return true;
  } else {
    alert("Credenciales incorrectas");
    return false;
  }
}

function showAdminFeatures() {
  document.getElementById("dataTableLink").style.display = "block";
  document.getElementById("datatable-view").style.display = "block";
}

function hideDataTableForUser() {
  document.getElementById("dataTableLink").style.display = "none";
  document.getElementById("datatable-view").style.display = "none";
}


recoveryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const recoveryEmail = recoveryEmailInput.value;
  const newPassword = newPasswordInput.value;

  
  if (!validateEmail(recoveryEmail)) {
    recoveryEmailError.style.display = "block";
    return false;
  } else {
    recoveryEmailError.style.display = "none";
  }

 
  if (!validatePassword(newPassword)) {
    newPasswordError.textContent = "La contraseña debe tener al menos 8 caracteres y un número.";
    newPasswordError.style.display = "block";
    return false;
  } else {
    newPasswordError.style.display = "none";
  }

  
  const user = users.find((u) => u.email === recoveryEmail);
  if (!user) {
    alert("El correo no está registrado.");
    return false;
  }


  if (user.password === newPassword) {
    newPasswordError.textContent = "La nueva contraseña no puede ser igual a la anterior.";
    newPasswordError.style.display = "block";
    return false;
  } else {
    newPasswordError.style.display = "none";
  }

  
  user.password = newPassword;
  alert("Contraseña cambiada con éxito");
  backToLoginLink.click(); // Volver al formulario de inicio de sesión
});
