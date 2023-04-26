
let imagen = document.querySelector(".header_img")

let nempleado = localStorage.getItem("nEmpleado")
let nombre = localStorage.getItem("nombre")
let rol = localStorage.getItem("rol")
let correo = localStorage.getItem("correo")
let telefono = localStorage.getItem("telefono")
let foto = localStorage.getItem("imagen")

imagen.addEventListener("click", function () {
  let ventana = document.querySelector(".emergenteEditarUser")
  ventana.classList.toggle("activo")
  if (ventana.classList.contains("activo")) {
    ventana.style.transform = "translateY(0px)";
  } else {
    ventana.style.transform = "translateY(500px)";

  }

  ventana.innerHTML = pintarForm(nombre, rol, correo, telefono, foto);

  let imagenperfil = document.querySelector('.fotoperfil');
  imagenperfil.addEventListener("click", function(){
    activarfotos();
  })
    


  let correoInput = document.querySelector('input[name="correo"]');
  correoInput.addEventListener('keyup', function () {
    validardatos();
  });

  let telefonoInput = document.querySelector('input[name="telefono"]');
  telefonoInput.addEventListener('keyup', function () {
    validardatos();
  });

  let passwordInput = document.querySelector('input[name="password"]');
  passwordInput.addEventListener('keyup', function () {
    validardatos();
  });

  let botonenviar = document.querySelector('.aceptar');
  botonenviar.addEventListener('submit', function () {
    enviarperfil();
  });

})



function pintarForm(nombre, rol, correo, telefono, foto) {
  const formulario = `<div class="contenedorEditarUsuario">
      
    <div class="contenedorImagenUser">
        <div class="imagenUser">
            <img src= "./${foto}" class="fotoperfil" alt="" width=100%>
        </div>
    </div>
    <div class="contenedorDatosUser">
    <div class="editarperfiles activos">
              <div>
              <img src= "./assets/A1.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A2.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A3.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A4.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A5.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A6.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A7.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A8.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <div>
              <img src= "./assets/A9.png" class="fotoperfiles" alt="" width=100%>
              </div>
              <button class="aceptar" >✔</button>
        </div>
        <div class="datosArriba">
            <div class="nombre">
                <input type="text" name="nombre" value="${nombre}" disabled>
            </div>
            <div class="rol">
            <input type="text" name="rol" value="${rol}" disabled>
            </div>
        </div>
        <div class="datosAbajo">
            <div class="correo">
                <input type="text" name="correo" value="${correo}">
            </div>
            <div class="telefono">
                <input type="number" name="telefono" value="${telefono}">
            </div>
            <div class="password">
                <input type="password" name="password" value="*********">
            </div>
        </div>
        <div class="botonesperfil">
        <button class="aceptar" disabled>✔</button>
        <button class="cancelar">🗙</button>
        </div>
    </div>
    </div>`;


  return formulario;

}



function enviarperfil() {
  let aceptarBtn = document.querySelector('.aceptar');
  aceptarBtn.disabled = false;
  aceptarBtn.style.backgroundColor = '#27ae60';
  aceptarBtn.addEventListener('click', function () {
    let correoInput = document.querySelector('input[name="correo"]').value;
    let telefonoInput = document.querySelector('input[name="telefono"]').value;
    let passwordInput = document.querySelector('input[name="password"]').value;
    let nombreInput = document.querySelector('input[name="nombre"]').value;
    let nempleado = localStorage.getItem("perfil")

    if (validarTelefono(telefonoInput) && validarCorreoElectronico(correoInput) && validarContrasena(passwordInput)) {
      // Creamos un objeto FormData con los datos a enviar
      var data = '&nombre=' + encodeURIComponent(nombreInput) +
        '&correopersonal=' + encodeURIComponent(correoInput) +
        '&numero=' + encodeURIComponent(telefonoInput) +
        '&password=' + encodeURIComponent(passwordInput) +
        '&idempleado=' + encodeURIComponent(nempleado)


      // Creamos una solicitud HTTP POST
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'BaseDatos/updEmpleados.php', true);

      // Configuramos el tipo de contenido que vamos a enviar
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      // Manejamos la respuesta del servidor
      xhr.onload = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
          console.log(xhr.responseText);
        }
      };

      // Enviamos los datos al servidor
      xhr.send(data);
    }
    aceptarBtn.disabled = true;
  }


  )
}

function validarCorreoElectronico(correo) {
  // Expresión regular para validar el formato del correo electrónico
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verificar si el correo cumple con el formato
  if (!expresionRegular.test(correo)) {
    let divcorreo = document.querySelector(".correo")
    crearMensajeError(divcorreo,"El correo no es valido")
    return false;
  }else{

    let error = document.querySelector(".correo > .error")
    eliminarMensajeError(error)
    return true;
  }
}

function validarTelefono(telefono) {
  // Expresión regular para validar el formato del número de teléfono
  const expresionRegular = /^[0-9]{9}$/;
  // Verificar si el número de teléfono cumple con el formato
  if (!expresionRegular.test(telefono)) {
    let divtelefono = document.querySelector(".telefono")
    crearMensajeError(divtelefono,"El telefono no es valido")
    return false;
  }else{

    let error = document.querySelector(".telefono > .error")
    eliminarMensajeError(error)
    return true;
  }
}

function validarContrasena(contrasena) {
  if (contrasena.length < 5) {
    let divpassword = document.querySelector(".password")
    crearMensajeError(divpassword,"La contraseña almenos 5 caracteres")
    return false;
  }else{
    let error = document.querySelector(".password > .error")
    eliminarMensajeError(error)
    return true;
  }
}

function validardatos() {
  let correoInput = document.querySelector('input[name="correo"]').value;
  let telefonoInput = document.querySelector('input[name="telefono"]').value;
  let passwordInput = document.querySelector('input[name="password"]').value;

  validarCorreoElectronico(correoInput);
  validarTelefono(telefonoInput);
  validarContrasena(passwordInput);
  comprobarInputs();


}

function botonfunsiona() {
  let aceptarBtn = document.querySelector('.aceptar');

  aceptarBtn.disabled = false;
  aceptarBtn.style.backgroundColor = '#27ae60';
}

function botonnofunsiona() {
  let aceptarBtn = document.querySelector('.aceptar');

  aceptarBtn.style.backgroundColor = '#46564d';
    aceptarBtn.disabled = true;
}

function crearMensajeError(elemento, mensaje) {
  if (elemento.querySelector(".error")!=null) {
    elemento.querySelector(".error").remove();
  }
  
  let p = document.createElement('p');
  p.classList.add('error');
  let texto = document.createTextNode(mensaje);
  p.appendChild(texto);
  elemento.appendChild(p);
}

function eliminarMensajeError(elemento) {
  if (elemento!=null) {
    elemento.remove();
  }
  
}

function comprobarInputs() {
  let errorT = document.querySelector(".telefono > .error")
  let errorP = document.querySelector(".password > .error")
  let errorC = document.querySelector(".correo > .error")
  if (errorT!=null || errorP!=null || errorC!=null) {
    botonnofunsiona();
  }else{
    botonfunsiona();
  }
}

function activarfotos() {
  let imagenes = document.querySelector(".editarperfiles");
  console.log(imagenes);
  imagenes.classList.toggle("active")
}




