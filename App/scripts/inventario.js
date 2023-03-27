window.onload = () => {
    fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
    .then(res=>res.json())
    .then(resultado=>resultado.forEach(inventario => {
        console.log(inventario);
        pintarDatos();

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

        function pintarDatos(){

            let datos = document.querySelector(".datos");
            let medicamentos = document.createElement("div");
            medicamentos.classList.add("my-2", "col-3", "mx-4", "p-3", "medicamentos");
    
            let pId = document.createElement("input");
            let idPro = document.createTextNode(inventario.CodigoNacional);
            pId.type = 'hidden';
            pId.appendChild(idPro);
    
            let pNombre = document.createElement("p");
            pNombre.classList.add('parrafo');
            let nombrePro = document.createTextNode(inventario.NombreProducto)
            pNombre.appendChild(nombrePro);
    
            let pCantidad = document.createElement("p");
            let cantidadPro = document.createTextNode("Stock: " + inventario.Cantidad)
            pCantidad.classList.add('parrafo');
            pCantidad.appendChild(cantidadPro); 
    
            let pPrecio = document.createElement("p");
            let precioPro = document.createTextNode("Precio: " + inventario.Precio + "Euros")
            pPrecio.classList.add('parrafo');
            pPrecio.appendChild(precioPro);
    
            let botonBorrar = document.createElement("input");
            botonBorrar.classList.add("botonBorrar");
            botonBorrar.type = "button";
            botonBorrar.value = "Borrar";
    
            botonBorrar.addEventListener('click', borrar);  
    
    
            medicamentos.appendChild(pNombre);
            medicamentos.appendChild(pCantidad);
            medicamentos.appendChild(pPrecio);
            medicamentos.appendChild(botonBorrar);
            medicamentos.appendChild(pId);

            medicamentos.addEventListener('click', function(e){
                recibir(e);
            })
    
            datos.appendChild(medicamentos);
        }

        function recibir(e){
            if (e.target.classList.contains('parrafo')) {
                let div = e.target.parentNode;
                var nombre = div.firstChild.innerText;
                console.log(nombre);
            } else {
                var nombre = e.target.firstChild.innerText;
                console.log(nombre);
            }

            fetch(`http://localhost/OuterPharma/App/BaseDatos/devInfo.php?nombre=${nombre}`)
            .then(respuesta=>respuesta.json())
            .then(resultado=>{
                resultado.forEach(med => {
                    
                let datos = document.querySelector(".devDatos");
                datos.innerHTML="";
                let medicamentos = document.createElement("div");
                medicamentos.classList.add("medicamento");
        
                let pNombre = document.createElement("p");
                pNombre.classList.add('parrafo', 'small');
                let nombrePro = document.createTextNode(med.NombreProducto)
                pNombre.appendChild(nombrePro);
        
                let pCantidad = document.createElement("p");
                let cantidadPro = document.createTextNode("Stock: " + med.Cantidad)
                pCantidad.classList.add('parrafo', 'small');
                pCantidad.appendChild(cantidadPro); 

                let pPrecio = document.createElement("p");
                let precioPro = document.createTextNode("Precio: " + med.Precio + " Euros")
                pPrecio.classList.add('parrafo', 'small');
                pPrecio.appendChild(precioPro);
        
                let pPresc = document.createElement("p");
                let presPro = document.createTextNode("Prescripcion: " + med.presMedica)
                pPresc.classList.add('parrafo', 'small');
                pPresc.appendChild(presPro);
                    
                let pActivo = document.createElement("p");
                let activoPro = document.createTextNode("P.Activo: " + med.pActivo)
                pActivo.classList.add('parrafo', 'small');
                pActivo.appendChild(activoPro);

                let pLab = document.createElement("p");
                let labPro = document.createTextNode("Laboratorio: " + med.Laboratorio)
                pLab.classList.add('parrafo', 'small');
                pLab.appendChild(labPro);

                let pVia = document.createElement("p");
                let viaPro = document.createTextNode("Vía: " + med.vAdmin)
                pVia.classList.add('parrafo', 'small');
                pVia.appendChild(viaPro);

                

        
        
                medicamentos.appendChild(pNombre);
                medicamentos.appendChild(pCantidad);
                medicamentos.appendChild(pPrecio);
                medicamentos.appendChild(pPresc);
                medicamentos.appendChild(pActivo);
                medicamentos.appendChild(pLab);
                medicamentos.appendChild(pVia);

                medicamentos.addEventListener('click', function(e){
                    recibir(e);
                })
        
                datos.appendChild(medicamentos);
                    });
                });
            }
    }));
    
}