window.onload = () => {

  fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
      Pintar(document.querySelector('.contenedorUser'), element.nombre, element.correopersonal, element.telefono, element.nempleado, element.rol,element.UrlEmpleado)

    }));

  function ventanaEmergenteEdit(nombre, correo, telefono, nempleado) {
    let div = document.createElement('div');
    div.setAttribute("id", "emergente");
    div.classList.add("emergente");

    let pName = document.createElement('p');
    let txtName = document.createTextNode("Nombre:");
    pName.appendChild(txtName);
    div.appendChild(pName);
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.value = nombre;
    div.appendChild(inputName);

    let pTelefono = document.createElement('p');
    let txtTelefono = document.createTextNode("Telefono:");
    pTelefono.appendChild(txtTelefono);
    div.appendChild(pTelefono);
    let inputTelefono = document.createElement("input");
    inputTelefono.classList.add("inputs");
    inputTelefono.value = telefono;
    div.appendChild(inputTelefono);

    let pCorreo = document.createElement('p');
    let txtCorreo = document.createTextNode("Correo personal:");
    pCorreo.appendChild(txtCorreo);
    div.appendChild(pCorreo);
    let inputCorreo = document.createElement("input");
    inputCorreo.classList.add("inputs");
    inputCorreo.value = correo;
    div.appendChild(inputCorreo);

    let p4 = document.createElement('p');
    let txtnempleado = document.createTextNode(nempleado);
    p4.classList.add("empleado")
    p4.hidden = true;
    p4.appendChild(txtnempleado);
    div.appendChild(p4)

    let div2 = document.createElement("div");
    div.appendChild(div2);

    let buttonAccept = document.createElement('button')
    buttonAccept.classList.add("aceptar")
    let textAccept = document.createTextNode("Aceptar")
    buttonAccept.appendChild(textAccept);
    let buttonCancel = document.createElement('button')
    buttonCancel.classList.add("cancel")
    let textCancel = document.createTextNode("Cancel")
    buttonCancel.appendChild(textCancel);
    div2.appendChild(buttonAccept);
    div2.appendChild(buttonCancel);
    document.body.appendChild(div);
  }

  function ventanaEmergenteCrear() {
    let div = document.createElement('div');
    div.setAttribute("id", "emergente");
    div.classList.add("emergente");

    let pName = document.createElement('p');
    let txtName = document.createTextNode("Nombre:");
    pName.appendChild(txtName);
    div.appendChild(pName);
    let inputName = document.createElement("input");

    div.appendChild(inputName);

    let pTelefono = document.createElement('p');
    let txtTelefono = document.createTextNode("Telefono:");
    pTelefono.appendChild(txtTelefono);
    div.appendChild(pTelefono);
    let inputTelefono = document.createElement("input");
    inputTelefono.classList.add("inputs");
    div.appendChild(inputTelefono);

    let pCorreo = document.createElement('p');
    let txtCorreo = document.createTextNode("Correo personal:");
    pCorreo.appendChild(txtCorreo);
    div.appendChild(pCorreo);
    let inputCorreo = document.createElement("input");
    inputCorreo.classList.add("inputs");
    div.appendChild(inputCorreo);

    let pContraseña = document.createElement('p');
    let txtContraseña = document.createTextNode("Contraseña:");
    pContraseña.appendChild(txtContraseña);
    div.appendChild(pContraseña);
    let inputContraseña = document.createElement("input");
    inputContraseña.classList.add("inputs");
    inputContraseña.type = "password"
    div.appendChild(inputContraseña);

    let div2 = document.createElement("div");
    div.appendChild(div2);

    let buttonAccept = document.createElement('button')
    buttonAccept.classList.add("aceptar")
    let textAccept = document.createTextNode("Aceptar")
    buttonAccept.appendChild(textAccept);
    let buttonCancel = document.createElement('button')
    buttonCancel.classList.add("cancel")
    let textCancel = document.createTextNode("Cancel")
    buttonCancel.appendChild(textCancel);
    div2.appendChild(buttonAccept);
    div2.appendChild(buttonCancel);
    document.body.appendChild(div);
  }

  function ventanaEmergenteEli(nombre, nempleado) {
    let div = document.createElement('div');
    div.setAttribute("id", "emergente");
    div.classList.add("emergente");

    let pName = document.createElement('p');
    let txtName = document.createTextNode("Nombre:");
    pName.appendChild(txtName);
    div.appendChild(pName);
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.setAttribute("disabled", true)
    inputName.value = nombre;
    div.appendChild(inputName);


    let pPass = document.createElement('p');
    let txtPass = document.createTextNode("Contraseña del administrador:");
    pPass.appendChild(txtPass);
    div.appendChild(pPass);
    let inputPass = document.createElement("input");
    inputPass.id = "password";
    inputPass.type = "password";
    div.appendChild(inputPass);




    let div2 = document.createElement("div");
    div.appendChild(div2);

    let buttonAccept = document.createElement('button')
    buttonAccept.classList.add("aceptar")
    let textAccept = document.createTextNode("Aceptar")
    buttonAccept.appendChild(textAccept);
    let buttonCancel = document.createElement('button')
    buttonCancel.classList.add("cancel")
    let textCancel = document.createTextNode("Cancel")
    buttonCancel.appendChild(textCancel);
    div2.appendChild(buttonAccept);
    div2.appendChild(buttonCancel);
    document.body.appendChild(div);
  }

  function cerrarVentana() {
    let cerrar = document.querySelector(".emergente")
    document.body.removeChild(cerrar)
  }

  function Pintar(elemento, nombre, correo, telefono, nempleado, rol,url) {
    let div = document.createElement('div');
    div.classList.add("card");
    div.style.width = "18rem";
    div.dataset.nombre = nombre;
    div.dataset.correo = correo;
    div.dataset.telefono = telefono;
    div.dataset.numero = nempleado;

    const cardImg = document.createElement("img");
    cardImg.src = url;
    cardImg.classList.add("card-img-top");

    // Crear el elemento div con la clase "card-body"
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Crear el elemento h5 con la clase "card-title"
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let txtNombre = document.createTextNode(nombre);
    cardTitle.appendChild(txtNombre)
 
    const cardSubtitle = document.createElement("h6");
    cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
    let txtCorreo = document.createTextNode(correo);
    cardSubtitle.appendChild(txtCorreo)

    let botones = document.createElement("div")

    let p3 = document.createElement('p');
    let txtTelefono = document.createTextNode(telefono);
    let p4 = document.createElement('p');
    let txtnempleado = document.createTextNode(nempleado);
    let bedi = document.createElement('button');
    p4.appendChild(txtnempleado);
    p3.appendChild(txtTelefono);

    // Añadir los elementos hijos al elemento div con la clase "card"
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(p3);
    cardBody.appendChild(p4);
    botones.appendChild(bedi);
    p4.hidden = true;
    div.appendChild(cardImg);
    div.appendChild(cardBody);
    div.appendChild(botones)

    // Este if es para que si tiene el rol admin no aparezca para eliminarse
    if (rol != "Admin") {
      let beli = document.createElement('button');
      botones.appendChild(beli);
      beli.style.backgroundImage = "url('https://www.shutterstock.com/image-vector/recycle-bin-icon-trash-can-260nw-1687424971.jpg')";


      beli.setAttribute("class", "delete");
      beli.addEventListener("click", function (e) {
        var nombre = e.target.closest(".card").dataset.nombre;
        var nEmpleado = e.target.closest(".card").dataset.numero;
        ventanaEmergenteEli(nombre, nEmpleado);

        let cancel = document.querySelector(".cancel")
        cancel.addEventListener("click", () => {
          cerrarVentana()
        })
        let accept = document.querySelector(".aceptar");
        let validacion = document.querySelector("#password")

        accept.addEventListener("click", () => {  
          
          
          let pass = {'password':validacion.value};
          comprobarPass(pass).then(result=>{
            if (result=="true") {
              eliminarDatos(nombre,nEmpleado);
              cerrarVentana()
              location.reload();
            } else {
              alert("La contraseña es incorrecta");
            }}
            )
        })
      })
    }

    bedi.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/6324/6324826.png')";

    bedi.setAttribute("class", "edit");
    bedi.addEventListener("click", function (e) {

      var nombre = e.target.closest(".card").dataset.nombre;
      var nEmpleado = e.target.closest(".card").dataset.numero;
      var correo = e.target.closest(".card").dataset.correo;
      var tlf = e.target.closest(".card").dataset.telefono;
      ventanaEmergenteEdit(nombre, tlf, correo, nEmpleado);

      let empleado = document.querySelector(".empleado")
      let validacion = document.querySelectorAll("input");
      let cancel = document.querySelector(".cancel")
      cancel.addEventListener("click", () => {
        cerrarVentana()
      })

      let accept = document.querySelector(".aceptar");
      accept.addEventListener("click", () => {

        if (validarNombre(validacion[0].value) == true && validarCorreoElectronico(validacion[2].value) && validarTelefono(validacion[1].value, empleado)) {

          enviarDatos(validacion[0].value, validacion[2].value, validacion[1].value, empleado.textContent)
          cerrarVentana()
          location.reload();
        } else {
          alert("rellene bien los campos")
        }
      })
    });
    let add = document.querySelector(".add")
    let añadir = document.querySelector("#añadir")
    if (!añadir) {
      let buttonadd = document.createElement("button")
      buttonadd.id = "añadir";
      let textoadd = document.createTextNode("Añadir")
      buttonadd.appendChild(textoadd)
      add.appendChild(buttonadd)

      buttonadd.addEventListener("click", function () {
        ventanaEmergenteCrear();
        let cancel = document.querySelector(".cancel")
        cancel.addEventListener("click", () => {
          cerrarVentana()
        })
        let accept = document.querySelector(".aceptar");
        let validacion = document.querySelectorAll("input");
        accept.addEventListener("click", () => {

          if (validarNombre(validacion[0].value) && validarTelefono(validacion[1].value) && validarCorreoElectronico(validacion[2].value) && validarContrasena(validacion[3].value)) {
            url = "assets/A1.png";
            let nombre = validacion[0].value;
            let nombreFormateado = nombre.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ')
            enviarDatosCrear(nombreFormateado, validacion[2].value, validacion[1].value, validacion[3].value,url)
            cerrarVentana()
            location.reload();
          }
        })
      })
    }





    elemento.appendChild(div);
  }

  function validarNombre(nombre) {
    let validarN = true;
    // Verificar que el nombre no esté vacío o tenga solo espacios en blanco
    if (!nombre || /^\s*$/.test(nombre)) {
      alert("El nombre no puede estar vacío.");
      validarN = false;
    }

    // Verificar que el nombre contenga de 1 a 3 palabras
    const palabras = nombre.trim().split(/\s+/);
    if (palabras.length > 3) {
      alert("El nombre no puede tener más de 3 palabras.");
      validarN = false;
    }

    // Convertir la primera letra de cada palabra en mayúscula y unir las palabras
    const nombreFormateado = palabras.map(palabra => palabra.charAt(0).toUpperCase());

    if (validarN) {
      return true;

    } else {
      return false;
    }
  }

  function validarCorreoElectronico(correo) {
    // Expresión regular para validar el formato del correo electrónico
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validarC = true;

    // Verificar si el correo cumple con el formato
    if (!expresionRegular.test(correo)) {
      alert("El correo electrónico no es válido.");
      validarC = false;
    }

    if (validarC) {
      return true;

    } else {
      return false;
    }
  }

  function validarTelefono(telefono) {
    // Expresión regular para validar el formato del número de teléfono
    const expresionRegular = /^[0-9]{9}$/;
    let validarT = true;
    // Verificar si el número de teléfono cumple con el formato
    if (!expresionRegular.test(telefono)) {
      alert("El número de teléfono no es válido.");
      validarT = false;
    }

    if (validarT) {
      return true;

    } else {
      return false;
    }
  }

  function validarContrasena(contrasena) {
    let validarP = true;
    if (contrasena.length < 5) {
      alert("La contraseña debe tener al menos 5 caracteres.");
      validarP = false;
    }

    if (validarP) {
      return true;

    } else {
      return false;
    }
  }

  function enviarDatos(nombre, correo, numero, idempleado) {
    // Creamos un objeto FormData con los datos a enviar
    var data = 'nombre=' + encodeURIComponent(nombre) +
      '&correopersonal=' + encodeURIComponent(correo) +
      '&numero=' + encodeURIComponent(numero) +
      '&idempleado=' + encodeURIComponent(idempleado);


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

  function enviarDatosCrear(nombre, correo, numero, password,url) {
    // Creamos un objeto FormData con los datos a enviar
    var data = 'nombre=' + encodeURIComponent(nombre) +
      '&correopersonal=' + encodeURIComponent(correo) +
      '&numero=' + encodeURIComponent(numero) +
      '&password=' + encodeURIComponent(password) +
      '&url=' + encodeURIComponent(url)


    // Creamos una solicitud HTTP POST
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'BaseDatos/insEmpleados.php', true);

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

  function eliminarDatos(nombre, idempleado) {
    // Creamos un objeto FormData con los datos a enviar
    var data = 'nombre=' + encodeURIComponent(nombre) +
      '&idempleado=' + encodeURIComponent(idempleado)
    // Creamos una solicitud HTTP POST
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'BaseDatos/delEmpleados.php', true);

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

  const comprobarPass=async(password)=>{
    var pass = JSON.stringify(password);
    const option={
      method:"POST",
      redirect:"follow",
      body:pass,
      Headers:{
        "Accept":"application/json"
      }
    }
    return fetch("BaseDatos/comprobarPass.php",option)
    .then(response=>response.text())
    .then(result=>{return result})
    .catch(e=>{console.error("ERROR:" , e.message)})
  }
} 