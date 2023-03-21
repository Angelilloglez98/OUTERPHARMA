window.onload = () => {
        fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
        .then(res=>res.json())
        .then(resultado=>resultado.forEach(inventario => {
            console.log(inventario);
            pintarDatos(inventario.idProducto, inventario.NombreProducto, inventario.Cantidad, inventario.Precio);

            function borrar(){
                console.log(inventario.Cantidad);
                console.log(inventario.idProducto);
                
                //Pasar por post los datos del js a un php externo
                //Que ese php recoja los datos y haga la consulta sql
                let sql = "UPDATE `farmacias_productos` SET `Cantidad`='[value-4]' WHERE `Id`= datos.lastElementChild.innerText ";
            }

            function pintarDatos(Id, nombre, Cantidad, Precio){

                let datos = document.querySelector(".datos");
                let medicamentos = document.createElement("div");
                medicamentos.classList.add("my-2", "col-4", "mx-3", "p-2");
        
                let pId = document.createElement("input");
                let idPro = document.createTextNode(Id);
                pId.type = 'hidden';
                pId.appendChild(idPro);
        
                let pNombre = document.createElement("p");
                let nombrePro = document.createTextNode("Nombre del producto: " + nombre)
                pNombre.appendChild(nombrePro);
        
                let pCantidad = document.createElement("p");
                let cantidadPro = document.createTextNode("Stock: " + Cantidad)
                pCantidad.appendChild(cantidadPro); 
        
                let pPrecio = document.createElement("p");
                let precioPro = document.createTextNode("Precio: " + Precio)
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
        
                datos.appendChild(medicamentos);
            }
        }));
    
    

    

    


}


