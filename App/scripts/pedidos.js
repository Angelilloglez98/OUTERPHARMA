window.onload = () =>{

    fetch('http://localhost/OuterPharma/App/BaseDatos/devProveedores.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {

        console.log(element);

    }));

    const buscarMed = async(datos) => {

        const options = {
            method: 'GET',
            redirect: 'follow',
            Headers: {'Accept':'aplication/jason'}
        }

        const url = "https://cima.aemps.es/cima/rest/medicamentos?";
        const busqueda = "nombre="
        // if(isNaN(datos)){url+="s?"}
        // else{url+="?"}

        return fetch(url+busqueda+datos, options)
        .then(response => response.json())
        .then(medicamentos => {return medicamentos})
        .catch(e => {console.error("ERROR: ", e.message)});

    }

    const busqueda = document.querySelector('input[type="search"]');

    busqueda.addEventListener("keydown", (event) => {

        if (event.isComposing || event.keyCode === 'Enter') {
          console.log("Si");
        }
        
      });

    console.log(busqueda.value); 

    buscarMed("paracetamol").then((response) => {
        console.log(response);
    })



} 