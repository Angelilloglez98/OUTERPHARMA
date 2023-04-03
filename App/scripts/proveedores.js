window.onload = () =>{

    const newProv = document.querySelector(".newProv");

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

        let showProv = document.querySelector(".showProv");
        let cardProv = document.createElement("div");

        data.forEach(element => {

            for (const atribute in element) {

                let prov = document.createElement("p");
                let info = document.createTextNode(element[atribute]);


                prov.appendChild(info);
                cardProv.appendChild(prov);

                console.log(element[atribute]);

            }

            showProv.appendChild(cardProv);


        });

    }

    buscarProv().then((response)=>{

        createProv(response);

    });
}