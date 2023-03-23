window.onload = () =>{

    //IMPLEMENTAR LIMPIAR LA TABLA

    fetch('http://localhost/OuterPharma/App/BaseDatos/devProveedores.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {

        // console.log(element);

    }));

    const buscarMed = async(datos) => {

        const options = {
            method: 'GET',
            redirect: 'follow',
            Headers: {'Accept':'aplication/json'}
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

    const borrarTabla = (tabla) => {

        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }

    }

    const busqueda = document.querySelector('input[type="search"]');

    const creatRow = (data) =>{

        var tableBody = document.querySelector("#buscarMed");
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        th.appendChild(checkbox);
        tr.appendChild(th);

        for (const i in data) {

            let td = document.createElement('td');

            if (i == 'nombre' || i == 'vtm' || i == 'formaFarmaceutica' || i == 'viasAdministracion' || i == 'labtitular' || i == 'cpresc' || i == 'docs') {
                
                if(i == 'vtm' || i == 'formaFarmaceutica'|| i == 'viasAdministracion'){

                    for (const j in data[i]) {
                        if(j == 'nombre'){
                            let info = document.createTextNode(data[i][j]);
                            td.appendChild(info); 
                        }
                        
                    }

                    if(i == 'viasAdministracion'){
                        data[i].forEach(element=>{

                            let info = document.createTextNode(element.nombre);
                            td.appendChild(info); 

                        })
                    }

                }else{

                    if(i == 'docs'){
                        let link = document.createElement('a');
                        link.href = `${data[i][1].urlHtml}`;
                        link.textContent = "Prospecto";
                        link.target = "_blank"
                        td.appendChild(link);
                    }else{
                        let info = document.createTextNode(data[i]);
                        td.appendChild(info);
                    }
                 

                }
                
                tr.appendChild(td);
                
            }
        }

        tableBody.appendChild(tr);

    }

    busqueda.addEventListener("keydown", (event) => {
 
        if (event.key === 'Enter' && busqueda.value != '') {

            var tbody = document.querySelector("#buscarMed");
            borrarTabla(tbody);
            var datos = busqueda.value;
            busqueda.value = "";
          
            buscarMed(datos).then((response) => {

                response.resultados.forEach(element => {
                    
                    creatRow(element);
                    // console.log(element);
                    
                })

            })

        }
        
      });

} 