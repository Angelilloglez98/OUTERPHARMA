window.onload = () => {
    fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
    .then(res=>res.json())
    .then(resultado=>resultado.forEach(inventario => {
        console.log(inventario);
      
        fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${inventario.CodigoNacional}`)
            .then(res=>res.json())
            .then(resultadoApi=>{
                if(resultadoApi.fotos===undefined){
                    pintarDatos('sin datos',inventario.CodigoNacional, inventario.NombreProducto, inventario.Cantidad, inventario.Precio);
                }else{
                    pintarDatos(resultadoApi.fotos[0].url, inventario.CodigoNacional, inventario.NombreProducto, inventario.Cantidad, inventario.Precio);
                }
                
            });

        function borrar(){
            fetch(`http://localhost/OuterPharma/App/BaseDatos/borrarStock.php?CodigoNacional=${inventario.CodigoNacional}&cantidad=${inventario.Cantidad}`)
            .then(respuesta=>respuesta.json())
            .then(resultado=>{
                resultado.forEach(element => {
                    console.log(element);
                    location.reload();
                });
            });
        }

        function pintarDatos(foto, CN, nombre, cant, precio){

            let datos = document.querySelector(".datos");
            let medicamentos = document.createElement("div");
            medicamentos.classList.add("my-2", "col-3", "mx-4", "p-3", "medicamentos");
            medicamentos.dataset.name = nombre;
        
            let medicamento = document.createElement("div");
            medicamento.classList.add("medicamento");
        
            let pFoto = new Image();
            pFoto.src = foto;
            pFoto.classList.add('imagen_foto');
        
            let pId = document.createElement("input");
            let idPro = document.createTextNode(CN);
            pId.type = 'hidden';    
            pId.appendChild(idPro);
        
            let pNombre = document.createElement("p");
            pNombre.classList.add('info_parrafo');
            let nombrePro = document.createTextNode(nombre)
            pNombre.appendChild(nombrePro);
        
            let pCantidad = document.createElement("p");
            let cantidadPro = document.createTextNode("Stock: " + cant)
            pCantidad.classList.add('info_parrafo');
            pCantidad.appendChild(cantidadPro); 
        
            let pPrecio = document.createElement("p");
            let precioPro = document.createTextNode("Precio: " + precio + "Euros")
            pPrecio.classList.add('info_parrafo');
            pPrecio.appendChild(precioPro);
        
            let botonBorrar = document.createElement("input");
            botonBorrar.classList.add("info_botonBorrar");
            botonBorrar.type = "button";
            botonBorrar.value = "Borrar";
        
            botonBorrar.addEventListener('click', borrar);  
        
            medicamentos.appendChild(pFoto);
            medicamentos.appendChild(pNombre);
            medicamentos.appendChild(pCantidad);
            medicamentos.appendChild(pPrecio);
            medicamentos.appendChild(pId);
            
        
            medicamentos.addEventListener('click', function(e){
                recibir(e);
            });
        
            medicamentos.appendChild(botonBorrar);
        
            datos.appendChild(medicamentos);
        }

        const form = document.querySelector('form[role="search"]');

    form.addEventListener('submit', (r) => {
        r.preventDefault();
    });
    
    const busqueda = document.querySelector('#busqueda');
    
    const buscarMed = (datos) => {

        // Hacer el parse int si es un numero y pasarle tremenda variable por url
        if (isNaN(datos)) {
            console.log("Tremendo texto");
        } else {
            console.log("Tremendo numero");
        }
        
        var url = `http://localhost/OuterPharma/App/BaseDatos/buscarProducto.php?datos=${datos}`;
        
        return fetch(url)
        .then(response => response.json())
        .then(medicamentos => {return medicamentos; })
        .catch(e => {console.error("ERROR: ", e.message)});
    }
    
    
    
    busqueda.onkeydown =  (event) => {

        if (event.key === 'Enter' && busqueda.value != '') {
    
            const tbody = document.querySelector("#buscarMed");
    
            var datos = busqueda.value;
            busqueda.value = "";
          
            buscarMed(datos).then((element) => {
    
                console.log(element);
                for (const i in element) {
                    fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${element[i].CodigoNacional}`)
                    .then(res=>res.json())
                    .then(resultadoApi=>{
                        vaciarDatos();
                        pintarDatos(resultadoApi.fotos[0].url,element[i].CodigoNacional, element[i].NombreProducto, element[i].Cantidad, element[i].Precio)
                    });
                    
                }
    
            })
    
        }
        
    };
    })); 



    
    
    function pintarDatosCaja(foto, nombre, cant, precio, pres, pAct, Lab, vAd){
        let datos = document.querySelector(".devDatos");
        datos.innerHTML="";
        let medicamentos = document.createElement("div");
        medicamentos.classList.add("medicamento");
        
        let imagen = document.createElement("div");
        imagen.classList.add("medicamento_imagen");
    
        let info = document.createElement('div');
        info.classList.add('medicamento_info');
    
        let pFoto = new Image();
        pFoto.src = foto;
        pFoto.classList.add('imagen_foto');
    
        let pNombre = document.createElement("p");
        pNombre.classList.add('info_parrafo', 'small');
        let nombrePro = document.createTextNode(nombre)
        pNombre.appendChild(nombrePro);
    
        let pCantidad = document.createElement("p");
        let cantidadPro = document.createTextNode("Stock: " + cant)
        pCantidad.classList.add('info_parrafo', 'small');
        pCantidad.appendChild(cantidadPro); 
    
        let pPrecio = document.createElement("p");
        let precioPro = document.createTextNode("Precio: " + precio + " Euros")
        pPrecio.classList.add('info_parrafo', 'small');
        pPrecio.appendChild(precioPro);
    
        let pPresc = document.createElement("p");
        let presPro = document.createTextNode("Prescripcion: " + pres)
        pPresc.classList.add('info_parrafo', 'small');
        pPresc.appendChild(presPro);
            
        let pActivo = document.createElement("p");
        let activoPro = document.createTextNode("P.Activo: " + pAct)
        pActivo.classList.add('info_parrafo', 'small');
        pActivo.appendChild(activoPro);
    
        let pLab = document.createElement("p");
        let labPro = document.createTextNode("Laboratorio: " + Lab)
        pLab.classList.add('info_parrafo', 'small');
        pLab.appendChild(labPro);
    
        let pVia = document.createElement("p");
        let viaPro = document.createTextNode("Vía: " + vAd)
        pVia.classList.add('info_parrafo', 'small');
        pVia.appendChild(viaPro);
    
        medicamentos.appendChild(pFoto);
        medicamentos.appendChild(pNombre);
        medicamentos.appendChild(pCantidad);
        medicamentos.appendChild(pPrecio);
        medicamentos.appendChild(pPresc);
        medicamentos.appendChild(pActivo);
        medicamentos.appendChild(pLab);
        medicamentos.appendChild(pVia);
    
        info.appendChild(medicamentos);
    
        imagen.appendChild(pFoto);
    
        medicamentos.addEventListener('click', function(e){
            recibir(e);
        })
    
        datos.appendChild(imagen)
        datos.appendChild(info);
    }
    
    function vaciarDatos() {
        let datos = document.querySelector(".datos");
    
        while (datos.hasChildNodes()) {
            datos.removeChild(datos.firstChild);
        }
    }

    function recibir(e){
        if (e.target.classList.contains('info_botonBorrar')) {
            return;
        }

        var nombre = e.target.closest(".medicamentos").dataset.name;
        console.log(nombre);
    
        fetch(`http://localhost/OuterPharma/App/BaseDatos/devInfo.php?nombre=${nombre}`)
        .then(respuesta=>respuesta.json())
        .then(resultado=>{
            resultado.forEach(med => {
                       
                fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${med.CodigoNacional}`)
                .then(res=>res.json())
                .then(resultadoApi=>{
                    if(resultadoApi.fotos===undefined){
                        pintarDatosCaja('sin datos',med.NombreProducto, med.Cantidad, med.Precio, med.presMedica, med.pActivo, med.Laboratorio, med.vAdmin);
                    }else{
                        pintarDatosCaja(resultadoApi.fotos[0].url, med.NombreProducto, med.Cantidad, med.Precio, med.presMedica, med.pActivo, med.Laboratorio, med.vAdmin);
                    }
                    
                });
            
        })});
    }
}







