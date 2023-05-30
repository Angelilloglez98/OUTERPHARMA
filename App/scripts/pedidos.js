window.onload = () =>{

    const busqueda = document.querySelector('input[type="search"]');

    busqueda.oninput = () => {
        let codigo = busqueda.value;
        if (codigo.length == 13) {
            let cortar = codigo.substring(6, 12);
            busqueda.value = cortar;
        }
        
    };

    const buscarMed = async(datos, filtro) => {

        const options = {
            method: 'GET',
            redirect: 'follow',
            Headers: {'Accept':'aplication/json'}
        }

        var url = "https://cima.aemps.es/cima/rest/medicamento";

        if(filtro==="cn"){

            url += "?";
            filtro += "=";

        }

        if(filtro==="nombre" || filtro === "vtm"){

            url += "s?";
            filtro += "=";

        }
        
        return fetch(url+filtro+datos, options)
        .then(response => response.json())
        .then(medicamentos => {return medicamentos})
        .catch(e => {console.error("ERROR: ", e.message)});


    }

    let table = new DataTable('#myTable', {"pageLength": 5, "lengthMenu": [5, 10, 25, 50]});

    const createRows = (data, urlIMG) => {

        let info = [];

        info.push(`<img width="200px" height="113px" src="${urlIMG}">`);

        for (const i in data) {

            switch (i) {

                case 'nombre': case 'labtitular': case 'cpresc':
                
                    info.push( data[i]);

                break;

                case 'docs':

                    info.push(`<a target="_blank" href="${data[i][1].urlHtml}" >Prospecto</a>`);
                    
                break;

                case 'vtm': case 'formaFarmaceutica':

                    for (const j in data[i]) {

                        if(j == 'nombre'){
                            info.push( data[i][j]);
                        }
                        
                    }
                    
                break;

                case 'viasAdministracion':

                    data[i].forEach(element=>{

                        info.push(element.nombre);

                    });
                        
                break;

            }

        }

        table.row.add(info);
        table.draw();

    }

    const borrarTabla = () => {

        table.clear().draw();

    }

    busqueda.addEventListener("keydown", (event) => {
 
        if (event.key === 'Enter' && busqueda.value != '') {

            var filtro = document.querySelector("#filtro");

            borrarTabla(table);
            var datos = busqueda.value;
            busqueda.value = "";
          
            buscarMed(datos, filtro.value).then((response) => {

                if(Array.isArray(response.resultados)){

                    response.resultados.forEach(element => {

                        console.log(element);

                        if(element.fotos === undefined){

                            const noIMG = "assets/pastillica.webp";

                            createRows(element, noIMG);

                        }else{
                            createRows(element, element.fotos[0].url);
                        }
                        
                    })

                }else{

                    createRows(response);

                }


            });

        }
        
      });

} 