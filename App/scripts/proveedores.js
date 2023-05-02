window.onload = () =>{

  const newProv = document.querySelector(".newProv");
  const button = document.createElement('button');
  
  button.className = 'addProv';
  button.textContent = 'Aniadir Proveedor';
  newProv.appendChild(button);

  const buscarProv = async()=>{

      const options = {
          method: 'GET',
          redirect: 'follow',
          Headers: {'Accept':'aplication/json'}
      }

      var url = 'http://localhost/OuterPharma/App/BaseDatos/devProveedores.php';
      
      return fetch(url, options)
      .then(response => response.json())
      .then(medicamentos => {return medicamentos})
      .catch(e => {console.error("ERROR: ", e.message)});

  }

  const insertProv = async(datos)=>{
    
    var raw = JSON.stringify(datos);

    const options = {
        method: 'POST',
        redirect: 'follow',
        body: raw,
        Headers: {'Accept':'aplication/json'}
    }

    var url = 'http://localhost/OuterPharma/App/BaseDatos/insertProveedores.php';
    
    return fetch(url, options)
    .then(response => response.text())
    .then(result => {return result})
    .catch(e => {console.error("ERROR: ", e.message)});


  }

  const updProv = async(datos)=>{
    
    var raw = JSON.stringify(datos);

    const options = {
        method: 'POST',
        redirect: 'follow',
        body: raw,
        Headers: {'Accept':'aplication/json'}
    }

    var url = 'http://localhost/OuterPharma/App/BaseDatos/updProveedores.php';
    
    return fetch(url, options)
    .then(response => response.text())
    .then(result => {return result})
    .catch(e => {console.error("ERROR: ", e.message)});

  }

  const borrarProb = async(nombre)=>{
    var raw = JSON.stringify({'Nombre': nombre});

    const options = {
        method: 'POST',
        redirect: 'follow',
        body: raw,
        Headers: {'Accept':'aplication/json'}
    }

    var url = 'http://localhost/OuterPharma/App/BaseDatos/quitarProveedor.php';
    
    return fetch(url, options)
    .then(response => response.text())
    .then(result => {return result})
    .catch(e => {console.error("ERROR: ", e.message)});
  }

  const button = document.querySelector(".addProv");
  const createProv = (data) => {

      data.forEach(element => {

          let showProv = document.querySelector(".showProv");
          let cardProv = document.createElement("div");
          let deleteProv = document.createElement('button');
          let updateProv = document.createElement('button');

          deleteProv.className = 'delete';          
          updateProv.className = 'edit';

          deleteProv.onclick = ()=>{

            Swal.fire({
              title: '¿Estás seguro?',
              text: "Desaparecerá de forma permanente",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '¡Si, borralo!'
            }).then((result) => {
              if (result.isConfirmed) {
                borrarProb(element.nombre);
                Swal.fire(
                  '¡Borrado!',
                  'El proveedor ha sido eliminado',
                  'success',
                )
                location.reload()
              }
            })

            
          };
          updateProv.onclick = ()=>{
            
            console.log(element)

            const form = {

              title: "Formulario",
        
              html: `
                <form id="formulario" method="POST" action="http://localhost/OuterPharma/App/BaseDatos/insertProveedores.php">
                  <input type="text" name="Nombre" class="swal2-input" value=${element.nombre} disabled = "true">
                  <input type="text" name="Direccion" class="swal2-input" value=${element.direccion}>
                  <input type="tel" name="nTelefono" class="swal2-input" value=${element.nTelefono}>
                  <input type="url" name="Link" class="swal2-input" value=${element.link}>
                </form>
              `,
        
              focusConfirm: false,
        
              preConfirm: () => {
                
                // Retorna un objeto con los valores de los campos del formulario
                return {
                  Nombre: document.getElementsByName("Nombre")[0].value,
                  Direccion: document.getElementsByName("Direccion")[0].value,
                  nTelefono: document.getElementsByName("nTelefono")[0].value,
                  Link: document.getElementsByName("Link")[0].value,
                };
        
              },
        
            };
          
            // Muestra la ventana modal con el formulario
            Swal.fire(form).then((result) => {
              // Si el usuario ha enviado el formulario, muestra los valores de los campos
              if (result.isConfirmed) {
        
                console.log(result.value);
                updProv(result.value).then(result=>{console.log(result);});
                location.reload()
          
              }
        
            });

          };

          cardProv.className = "tarjeta-proveedor";

          for (const atribute in element) {

              let info = document.createTextNode(element[atribute]);
              let prov = '';
              if(atribute === 'nombre'){

                  prov = document.createElement("h5");
                  prov.appendChild(info);

              }else if(atribute === 'Link'){
                  prov = document.createElement("a");
                  prov.href = `${element[atribute]}`;
                  prov.textContent = 'Pagina Web';
                  prov.target = '_blank';
              }else{

                  prov = document.createElement("p");
                  prov.appendChild(info);

              }

              cardProv.appendChild(prov);

          }

          cardProv.appendChild(deleteProv);
          cardProv.appendChild(updateProv);
          showProv.appendChild(cardProv);

      });

  }

  buscarProv().then((response)=>{

    createProv(response);

  });


  button.onclick = ()=>{

    const form = {

      title: "Formulario",

      html: `
        <form id="formulario" method="POST" action="http://localhost/OuterPharma/App/BaseDatos/insertProveedores.php">
          <input type="text" name="Nombre" placeholder="Nombre" class="swal2-input">
          <input type="text" name="Direccion" placeholder="Dirección" class="swal2-input">
          <input type="tel" name="nTelefono" placeholder="Teléfono" class="swal2-input">
          <input type="url" name="Link" placeholder="Página Web" class="swal2-input">
        </form>
      `,

      focusConfirm: false,

      preConfirm: () => {
        
        // Retorna un objeto con los valores de los campos del formulario
        return {
          Nombre: document.getElementsByName("Nombre")[0].value,
          Direccion: document.getElementsByName("Direccion")[0].value,
          nTelefono: document.getElementsByName("nTelefono")[0].value,
          Link: document.getElementsByName("Link")[0].value,
        };

      },

    };
  
    // Muestra la ventana modal con el formulario
    Swal.fire(form).then((result) => {
      // Si el usuario ha enviado el formulario, muestra los valores de los campos
      if (result.isConfirmed) {

        console.log(result.value);
        insertProv(result.value);
        location.reload()
  
      }

    });

  }

}