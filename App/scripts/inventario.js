window.onload = () => {
    fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
    .then(res=>res.json())
    .then(resultado=>resultado.forEach(inventario => {
        console.log(inventario);
        pintarDatos();

        function borrar(){
            fetch(`http://localhost/OuterPharma/App/BaseDatos/borrarStock.php?idProducto=${inventario.idProducto}&cantidad=${inventario.Cantidad}`)
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
            medicamentos.classList.add("my-2", "col-4", "mx-3", "p-2", "medicamentos");
    
            let pId = document.createElement("input");
            let idPro = document.createTextNode(inventario.idProducto);
            pId.type = 'hidden';
            pId.appendChild(idPro);
    
            let pNombre = document.createElement("p");
            let nombrePro = document.createTextNode("Nombre del producto: " + inventario.NombreProducto)
            pNombre.appendChild(nombrePro);
    
            let pCantidad = document.createElement("p");
            let cantidadPro = document.createTextNode("Stock: " + inventario.Cantidad)
            pCantidad.appendChild(cantidadPro); 
    
            let pPrecio = document.createElement("p");
            let precioPro = document.createTextNode("Precio: " + inventario.Precio + "€")
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
            console.log(e.target);
        }
    }));
    
}