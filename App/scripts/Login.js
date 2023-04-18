
//Variables y constantes
let formularios = document.querySelector('#formularios');
let btnregistrar = document.querySelector('#moverRegister');
let btnLogin = document.querySelector('#moverLogin');
const form = document.querySelector('.Login');
const emailInput = form.querySelector('input[type="email"]');
const passwordInput = form.querySelector('input[type="password"]');
const error = document.querySelector('.error');



form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validar el campo de correo electrónico
  if (!email) {
    crearMensajeError(error, 'Por favor, introduce un email')
    emailInput.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    crearMensajeError(error, 'Por favor, introduce un correo electrónico válido');
    emailInput.focus();
    return;
  }

  // Validar el campo de contraseña
  if (!password) {
    crearMensajeError(error, 'Por favor, introduce tu contraseña')
    passwordInput.focus();
    return;
  }

  // Si los campos son válidos, enviar el formulario
  form.submit();
});

btnregistrar.onclick = () => {
  activarRegistrar();
}
btnLogin.onclick = () => {
  activarLogin();
}

function crearMensajeError(elemento, mensaje) {
  elemento.innerHTML = '';
  let p = document.createElement('p');
  p.classList.add('error');
  let texto = document.createTextNode(mensaje);
  p.appendChild(texto);
  elemento.appendChild(p);
}

function activarRegistrar() {
  formularios.style.transform = 'translateX(-50%)';
}

function activarLogin() {
  formularios.style.transform = 'translateX(0)';
}