window.onload = () => {

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
        .then(response => response.json())
        .then(registro => registro.forEach(element => {
            Pintar(document.querySelector('.contenedorUser'), element.nombre, element.correopersonal, element.telefono, element.nempleado,element.rol)

        }));

    function ventanaEmergenteEdit(nombre, correo, telefono,nempleado) {
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
        p4.hidden=true;
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
      inputContraseña.type="password"
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

  function ventanaEmergenteEli(nombre,nempleado) {
    let div = document.createElement('div');
    div.setAttribute("id", "emergente");
    div.classList.add("emergente");

    let pName = document.createElement('p');
        let txtName = document.createTextNode("Nombre:");
        pName.appendChild(txtName);
        div.appendChild(pName);
        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.setAttribute("disabled",true)
        inputName.value = nombre;
        div.appendChild(inputName);


    let pPass = document.createElement('p');
    let txtPass = document.createTextNode("Contraseña del administrador:");
    pPass.appendChild(txtPass);
    div.appendChild(pPass);
    let inputPass = document.createElement("input");
    inputPass.classList.add("inputs");
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

    function Pintar(elemento, nombre, correo, telefono,nempleado,rol) {
        let div = document.createElement('div');
        div.classList.add("usuarios");
        div.dataset.nombre = nombre;
        div.dataset.correo = correo;
        div.dataset.telefono = telefono;
        div.dataset.numero = nempleado;
        let p = document.createElement('p');
        let txtNombre = document.createTextNode(nombre);
       
        let botones = document.createElement("div")

        let p2 = document.createElement('p');
        let txtCorreo = document.createTextNode(correo);
        let p3 = document.createElement('p');
        let txtTelefono = document.createTextNode(telefono);
        let p4 = document.createElement('p');
        let txtnempleado = document.createTextNode(nempleado);
        let bedi = document.createElement('button');


        p4.appendChild(txtnempleado);
        
        p.appendChild(txtNombre);
        p2.appendChild(txtCorreo);
        p3.appendChild(txtTelefono);

        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        botones.appendChild(bedi);
        div.appendChild(botones)
        p4.hidden=true;
        
        
        // Este if es para que si tiene el rol admin no aparezca para eliminarse
        if (rol != "Admin") {
          let beli = document.createElement('button');
          botones.appendChild(beli);
          beli.style.backgroundImage = "url('https://www.shutterstock.com/image-vector/recycle-bin-icon-trash-can-260nw-1687424971.jpg')";

          
          beli.setAttribute("class", "delete");
          beli.addEventListener("click", function(e){
            var nombre = e.target.closest(".usuarios").dataset.nombre;
            var nEmpleado = e.target.closest(".usuarios").dataset.numero;
            ventanaEmergenteEli(nombre,nEmpleado);

            let cancel = document.querySelector(".cancel")
                cancel.addEventListener("click", () => {    
                  cerrarVentana()
                })
                let accept = document.querySelector(".aceptar");
                let validacion = document.querySelectorAll("input");
                
                accept.addEventListener("click", () => { 
                    let pass = localStorage.getItem("password")
                    
                  if (validacion[1].value==pass ) {
                      eliminarDatos(nombre,nempleado);
                      cerrarVentana()
                      location.reload();
                  }else{
                      alert("rellene bien los campos")
                  }
                    })  
          })
        }
        
        bedi.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/6324/6324826.png')";

        bedi.setAttribute("class", "edit");
        bedi.addEventListener("click", function (e) {

                var nombre = e.target.closest(".usuarios").dataset.nombre;
                var nEmpleado = e.target.closest(".usuarios").dataset.numero;
                var correo = e.target.closest(".usuarios").dataset.correo;
                var tlf = e.target.closest(".usuarios").dataset.telefono;
                ventanaEmergenteEdit(nombre, tlf, correo,nEmpleado);
                
                let empleado = document.querySelector(".empleado")
                let validacion = document.querySelectorAll("input");
                let cancel = document.querySelector(".cancel")
                cancel.addEventListener("click", () => {    
                  cerrarVentana()
                })

                let accept = document.querySelector(".aceptar");
                accept.addEventListener("click", () => { 
                    
                  if (validarNombre(validacion[0].value)==true && validarCorreoElectronico(validacion[2].value) && validarTelefono(validacion[1].value,empleado)) {
                    
                      enviarDatos(validacion[0].value,validacion[2].value,validacion[1].value,empleado.textContent)
                      cerrarVentana()
                      location.reload();
                  }else{
                      alert("rellene bien los campos")
                  }
                    })  
        });
        let add = document.querySelector(".add")
        let añadir = document.querySelector("#añadir")
        if (!añadir) {
          let buttonadd = document.createElement("button")
          buttonadd.id="añadir";
          let textoadd = document.createTextNode("Añadir")
          buttonadd.appendChild(textoadd)
          add.appendChild(buttonadd)

          buttonadd.addEventListener("click", function(){
            ventanaEmergenteCrear();
            let cancel = document.querySelector(".cancel")
                cancel.addEventListener("click", () => {    
                  cerrarVentana()
                })
                let accept = document.querySelector(".aceptar");
                let validacion = document.querySelectorAll("input");
                accept.addEventListener("click", () => { 
                    
                  if (validarNombre(validacion[0].value)==true && validarCorreoElectronico(validacion[2].value) && validarTelefono(validacion[1].value)) {
                    
                      enviarDatosCrear(validacion[0].value,validacion[2].value,validacion[1].value,validacion[3].value)
                      cerrarVentana()
                      location.reload();
                  }else{
                      alert("rellene bien los campos")
                  }
                    })  
          })
        }
        

        elemento.appendChild(div);
    }

    function validarNombre(nombre) {
        // Comprueba si el nombre tiene de 1 a 3 palabras
        if (!/^[\wáéíóúñÁÉÍÓÚÑ]{1,}(\s[\wáéíóúñÁÉÍÓÚÑ]{1,}){0,2}$/.test(nombre)) {
          return false;
        }
      
        // Comprueba que el nombre no contenga números
        if (/\d/.test(nombre)) {
          return false;
        }
        return true;
      }

    function validarCorreoElectronico(correo) {
    // Expresión regular para validar el correo electrónico
    const expresionRegular = /^[^@]+@\w+(\.\w+)+\w$/;
    
    // Validamos el correo electrónico con la expresión regular
    if (!expresionRegular.test(correo)) {
        return false;
    }
    
    return true;
    }

    function validarTelefono(numero) {
        // Eliminar espacios en blanco y guiones del número de teléfono
        numero = numero.replace(/\s+/g, '').replace(/-/g, '');
      
        // Verificar que el número de teléfono solo contenga dígitos numéricos
        if (!/^\d+$/.test(numero)) {
          return false;
        }
      
        // Verificar que el número de teléfono tenga exactamente 9 dígitos
        if (numero.length !== 9) {
          return false;
        }
      
        // Si todas las validaciones pasan, el número de teléfono es válido
        return true;
      }

      function enviarDatos(nombre,correo,numero,idempleado) {
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
        xhr.onload = function() {
          if (xhr.status === 200 && xhr.readyState === 4) {
            console.log(xhr.responseText);
          }
        };
        
        // Enviamos los datos al servidor
        xhr.send(data);
      }
      function enviarDatosCrear(nombre,correo,numero,password) {
        // Creamos un objeto FormData con los datos a enviar
        var data = 'nombre=' + encodeURIComponent(nombre) +
             '&correopersonal=' + encodeURIComponent(correo) +
             '&numero=' + encodeURIComponent(numero) +
             '&password=' + encodeURIComponent(password)
        
        
        // Creamos una solicitud HTTP POST
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'BaseDatos/insEmpleados.php', true);
        
        // Configuramos el tipo de contenido que vamos a enviar
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        // Manejamos la respuesta del servidor
        xhr.onload = function() {
          if (xhr.status === 200 && xhr.readyState === 4) {
            console.log(xhr.responseText);
          }
        };
        
        // Enviamos los datos al servidor
        xhr.send(data);
      }

      function eliminarDatos(nombre,idempleado) {
        // Creamos un objeto FormData con los datos a enviar
        var data = 'nombre=' + encodeURIComponent(nombre) +
          '&idempleado=' + encodeURIComponent(idempleado)
        console.log(nombre);
        console.log(idempleado);
        // Creamos una solicitud HTTP POST
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'BaseDatos/delEmpleados.php', true);
        
        // Configuramos el tipo de contenido que vamos a enviar
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        // Manejamos la respuesta del servidor
        xhr.onload = function() {
          if (xhr.status === 200 && xhr.readyState === 4) {
            console.log(xhr.responseText);
            
          }
        };
        
        // Enviamos los datos al servidor
        xhr.send(data);
      }
} 