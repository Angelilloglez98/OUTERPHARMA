window.onload = () =>{

    const newProv = document.querySelector(".newProv");
    const button = document.createElement('button')
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



}