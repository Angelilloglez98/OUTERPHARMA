let formularios=document.querySelector('#formularios');
let btnregistrar=document.querySelector('#moverRegister');
let btnLogin=document.querySelector('#moverLogin');
const form = document.querySelector('.Login');
const emailInput = form.querySelector('input[type="email"]');
const passwordInput = form.querySelector('input[type="password"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  // Validar el campo de correo electrónico
  if (!email) {
    alert('Por favor, introduce tu correo electrónico');
    emailInput.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor, introduce un correo electrónico válido');
    emailInput.focus();
    return;
  }
  
  // Validar el campo de contraseña
  if (!password) {
    alert('Por favor, introduce tu contraseña');
    passwordInput.focus();
    return;
  }
  if (password.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres');
    passwordInput.focus();
    return;
  }
  
  // Si los campos son válidos, enviar el formulario
  form.submit();
});

btnregistrar.onclick=()=>{
    activarRegistrar();
}
btnLogin.onclick=()=>{
    activarLogin();
}


function activarRegistrar() {
    formularios.style.transform='translateX(-50%)';    
}

function activarLogin() {
    formularios.style.transform='translateX(0)';
}

