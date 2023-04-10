window.onload = () =>{

    const newProv = document.querySelector(".newProv");
    const button = document.createElement('button')
    const hideOnBush = document.createElement('div');
    const form = document.createElement("form");
    const nombreInput = document.createElement("input");
    const direccionInput = document.createElement("input");
    const telefonoInput = document.createElement("input");
    const paginaWebInput = document.createElement("input");

    nombreInput.setAttribute("type", "text");
    nombreInput.setAttribute("name", "nombre");
    nombreInput.setAttribute("placeholder", "Nombre"); 

    direccionInput.setAttribute("type", "text");
    direccionInput.setAttribute("name", "direccion");
    direccionInput.setAttribute("placeholder", "Dirección");
    
    telefonoInput.setAttribute("type", "tel");
    telefonoInput.setAttribute("name", "telefono");
    telefonoInput.setAttribute("placeholder", "Teléfono");  

    paginaWebInput.setAttribute("type", "url");
    paginaWebInput.setAttribute("name", "pagina-web");
    paginaWebInput.setAttribute("placeholder", "Página Web");
   
    button.className = 'addProv';
    button. textContent = 'Añadir +';
    hideOnBush.classList.add('card');
    hideOnBush.style.display = 'none';
    form.classList.add('card-body');

    form.appendChild(nombreInput);
    form.appendChild(direccionInput);
    form.appendChild(telefonoInput);
    form.appendChild(paginaWebInput);

    hideOnBush.appendChild(form);

    newProv.appendChild(button);
    newProv.appendChild(hideOnBush);

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
              console.log(formData);
            }
          });
    }

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



}