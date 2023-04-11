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

  const createProv = (data) => {

      data.forEach(element => {

          let showProv = document.querySelector(".showProv");
          let cardProv = document.createElement("div");
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

              console.log(element);

          }

          showProv.appendChild(cardProv);

      });

  }

  buscarProv().then((response)=>{

    createProv(response);

  });

  const insertProv = async(datos)=>{

    const options = {
        method: 'GET',
        redirect: 'follow',
        body: datos,
        Headers: {'Accept':'aplication/json'}
    }

    var url = 'http://localhost/OuterPharma/App/BaseDatos/insertProveedores.php';
    
    return fetch(url, options)
    .then(response => response.json())
    .then(result => {return result})
    .catch(e => {console.error("ERROR: ", e.message)});

}

  button.onclick = ()=>{
    hideOnBush.style.display = 'flex';
    const form = {
        title: "Formulario",
        html: `
          <input type="text" name="nombre" placeholder="Nombre" class="swal2-input">
          <input type="text" name="direccion" placeholder="Dirección" class="swal2-input">
          <input type="tel" name="telefono" placeholder="Teléfono" class="swal2-input">
          <input type="url" name="pagina-web" placeholder="Página Web" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          // Retorna un objeto con los valores de los campos del formulario
          return {
            nombre: document.getElementsByName("nombre")[0].value,
            direccion: document.getElementsByName("direccion")[0].value,
            telefono: document.getElementsByName("telefono")[0].value,
            paginaWeb: document.getElementsByName("pagina-web")[0].value,
          };
        },
      };
  
      // Muestra la ventana modal con el formulario
      Swal.fire(form).then((result) => {
        // Si el usuario ha enviado el formulario, muestra los valores de los campos
        if (result.isConfirmed) {
          const formData = result.value;
          insertProv(formData).then(response => console.log(formData, response));
    
        }
      });
}

}