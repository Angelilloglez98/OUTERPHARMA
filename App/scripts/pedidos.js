window.onload = () =>{

    const busqueda = document.querySelector('input[type="search"]');
    

    // fetch('http://localhost/OuterPharma/App/BaseDatos/devProveedores.php')
    // .then(response => response.json())
    // .then(registro => registro.forEach(element => {

    //     // console.log(element);

    // }));

    const buscarMed = async(datos, filtro) => {

        const options = {
            method: 'GET',
            redirect: 'follow',
            Headers: {'Accept':'aplication/json'}
        }

        var url = "https://cima.aemps.es/cima/rest/medicamento";

        if(filtro==="cn"){

            url += "?"
            filtro += "="

        }

        if(filtro==="nombre" || filtro === "vtm"){

            url += "s?"
            filtro += "="

        }
        
        return fetch(url+filtro+datos, options)
        .then(response => response.json())
        .then(medicamentos => {return medicamentos})
        .catch(e => {console.error("ERROR: ", e.message)});


    }

    const borrarTabla = (tabla) => {

        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }

    }

    const creatRow = (data, urlIMG) =>{

        let tableBody = document.querySelector("#buscarMed");
        let tr = document.createElement('tr');
        let tdIMG = document.createElement('td');
        let img = document.createElement("img");

        img.src = urlIMG;

        tdIMG.appendChild(img);
        tr.appendChild(tdIMG);

        for (const i in data) {

            let td = document.createElement('td');

            switch (i) {

                case 'nombre': case 'labtitular': case 'cpresc':
                
                    let info = document.createTextNode(data[i]);
                    td.appendChild(info);
                    tr.appendChild(td);
                break;

                case 'docs':
                    
                    let link = document.createElement('a');
                    link.href = `${data[i][1].urlHtml}`;
                    link.textContent = "Prospecto";
                    link.target = "_blank"
                    td.appendChild(link);
                    tr.appendChild(td);
                break;

                case 'vtm': case 'formaFarmaceutica':

                    for (const j in data[i]) {
                        if(j == 'nombre'){
                            let info = document.createTextNode(data[i][j]);
                            td.appendChild(info);
                            tr.appendChild(td); 
                        }
                        
                    }
                    
                break;

                case 'viasAdministracion':

                    data[i].forEach(element=>{

                        let info = document.createTextNode(element.nombre);
                        td.appendChild(info);
                        tr.appendChild(td); 

                    })
                        
                break;

            }

        }

        tableBody.appendChild(tr);

    }

    busqueda.addEventListener("keydown", (event) => {
 
        if (event.key === 'Enter' && busqueda.value != '') {

            var filtro = document.querySelector("#filtro");
            const tbody = document.querySelector("#buscarMed");

            borrarTabla(tbody);
            var datos = busqueda.value;
            busqueda.value = "";
          
            buscarMed(datos, filtro.value).then((response) => {

                if(Array.isArray(response.resultados)){

                    response.resultados.forEach(element => {
                    
                        if(element.fotos === undefined){

                            const noIMG = "sin datos";

                            creatRow(element, noIMG);

                        }else{
                            creatRow(element, element.fotos[0].url);
                        }
                        
                    })

                }else{

                    creatRow(response);

                }


            });

        }
        
      });

} 