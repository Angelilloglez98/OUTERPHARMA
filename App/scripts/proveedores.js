window.onload = () =>{

  const newProv = document.querySelector(".newProv");
  const button = document.createElement('button')
  const hideOnBush = document.createElement('div');
  const form = document.createElement("form");
  
  button.className = 'addProv';
  button. textContent = 'Añadir +';
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

  const createProv = (data) => {

      data.forEach(element => {

          let showProv = document.querySelector(".showProv");
          let cardProv = document.createElement("div");
          let deleteProv = document.createElement('button');
          let updateProv = document.createElement('button');

          deleteProv.innerText = 'Borrar';
          updateProv.innerText = 'Editar';
          deleteProv.onclick = ()=>{borrarProb(element.nombre).then()};
          updateProv.onclick = ()=>{console.log(element.nombre)};

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

    hideOnBush.style.display = 'flex';

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
          insertProv(result.value).then(response => console.log(response));
    
        }

      });
}

}