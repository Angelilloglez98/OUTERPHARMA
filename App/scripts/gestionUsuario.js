window.onload = () => {

  fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
      Pintar(document.querySelector('.contenedorUser'), element.nombre, element.correopersonal, element.telefono, element.nempleado, element.rol,element.UrlEmpleado)

    }));

  function ventanaEmergenteEdit(nombre, telefono, correo, nempleado) {

    const form = {

      title: "Editar usuario",

      html: `
        <form id="formulario" method="POST" action="http://localhost/OuterPharma/App/BaseDatos/updEmpleado.php">
          <input type="text" name="Nombre" placeholder="Nombre" class="swal2-input" value="${nombre}">
          <input type="text" name="Correo" placeholder="Correo" class="swal2-input" value="${correo}">
          <input type="tel" name="nTelefono" placeholder="Teléfono" class="swal2-input" value="${telefono}">
          
        </form>
      `,

      focusConfirm: false,

      preConfirm: () => {
        
        // Retorna un objeto con los valores de los campos del formulario
        return {
          Nombre: document.getElementsByName("Nombre")[0].value,
          Direccion: document.getElementsByName("Correo")[0].value,
          nTelefono: document.getElementsByName("nTelefono")[0].value,
        };

      },

    };
  
      // Muestra la ventana modal con el formulario
      Swal.fire(form).then((result) => {
        // Si el usuario ha enviado el formulario, muestra los valores de los campos
        if (result.isConfirmed) {
          let nombre = document.querySelector('input[name="Nombre"]').value
          let correo = document.querySelector('input[name="Correo"]').value
          let ntelefono = document.querySelector('input[name="nTelefono"]').value

          if (validarNombre(nombre) == true && validarCorreoElectronico(correo) && validarTelefono(ntelefono)) {

            enviarDatos(nombre, correo, ntelefono,nempleado)
            location.reload();
          } else {
            alert("rellene bien los campos")
          }
    
        }

      });

  }

  function ventanaEmergenteCrear() {
    const form = {

      title: "Agregar usuario",

      html: `
        <form id="formulario" method="POST" action="http://localhost/OuterPharma/App/BaseDatos/delEmpleados.php">
          <input type="text" name="Nombre" placeholder="Nombre" class="swal2-input">     
          <input type="telefono" name="telefono" placeholder="Teléfono" class="swal2-input">
          <input type="correo" name="correo" placeholder="Correo" class="swal2-input">   
          <input type="password" name="password" placeholder="Contraseña" class="swal2-input">          
        </form>
      `,

      focusConfirm: false,

      preConfirm: () => {
        
        // Retorna un objeto con los valores de los campos del formulario
        return {
          Nombre: document.getElementsByName("Nombre")[0].value,

        };

      },

    };
  
      // Muestra la ventana modal con el formulario
      Swal.fire(form).then((result) => {
        // Si el usuario ha enviado el formulario, muestra los valores de los campos
        if (result.isConfirmed) {
          let nombre = document.querySelector('input[name="Nombre"]').value
          let telefono = document.querySelector('input[name="telefono"]').value
          let correo = document.querySelector('input[name="correo"]').value
          let contrasena = document.querySelector('input[name="password"]').value

          if (validarNombre(nombre) && validarTelefono(telefono) && validarCorreoElectronico(correo) && validarContrasena(contrasena)) {
            url = "assets/A1.png";
            let nombre2 = nombre;
            let nombreFormateado = nombre2.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ')
            enviarDatosCrear(nombreFormateado, correo, telefono, contrasena,url)
            location.reload();
          }
    
        }

      });
  }

  function ventanaEmergenteEli(nombre, nempleado) {

    const form = {

      title: "Eliminar usuario",

      html: `
        <form id="formulario" method="POST" action="http://localhost/OuterPharma/App/BaseDatos/delEmpleados.php">
          <input type="text" name="Nombre" placeholder="Nombre" class="swal2-input" value="${nombre}">     
          <input type="password" name="password" placeholder="Contraseña" class="swal2-input">       
        </form>
      `,

      focusConfirm: false,

      preConfirm: () => {
        
        // Retorna un objeto con los valores de los campos del formulario
        return {
          Nombre: document.getElementsByName("Nombre")[0].value,

        };

      },

    };
  
      // Muestra la ventana modal con el formulario
      Swal.fire(form).then((result) => {
        // Si el usuario ha enviado el formulario, muestra los valores de los campos
        if (result.isConfirmed) {
          let nombre = document.querySelector('input[name="Nombre"]').value
          let validacion = document.querySelector('input[name="password"]').value

          let pass = {'password':validacion};
          comprobarPass(pass).then(result=>{
            if (result=="true") {
              eliminarDatos(nombre,nempleado);
              location.reload();
            } else {
              alert("La contraseña es incorrecta");
            }})
    
        }

      });
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
    botones.classList.add("butunos");

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
      beli.style.backgroundImage = "url('./assets/trash.svg')";


      beli.setAttribute("class", "delete");
      beli.addEventListener("click", function (e) {
        var nombre = e.target.closest(".card").dataset.nombre;
        var nEmpleado = e.target.closest(".card").dataset.numero;
        ventanaEmergenteEli(nombre, nEmpleado);
      })
    }

    bedi.style.backgroundImage = "url('./assets/edit.svg')";

    bedi.setAttribute("class", "edit");
    bedi.addEventListener("click", function (e) {

      var nombre = e.target.closest(".card").dataset.nombre;
      var nEmpleado = e.target.closest(".card").dataset.numero;
      var correo = e.target.closest(".card").dataset.correo;
      var tlf = e.target.closest(".card").dataset.telefono;
      ventanaEmergenteEdit(nombre, tlf, correo, nEmpleado);

    });
    let add = document.querySelector(".add")
    let añadir = document.querySelector("#añadir")
    if (!añadir) {
      let buttonadd = document.createElement("button")
      buttonadd.id = "añadir";
      let textoadd = document.createTextNode("+")
      buttonadd.appendChild(textoadd)
      add.appendChild(buttonadd)

      buttonadd.addEventListener("click", function () {
        ventanaEmergenteCrear();
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