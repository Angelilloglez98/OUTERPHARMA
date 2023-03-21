

windows.onload = () => {
    fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
    .then(res=>res.json())
    .then(resultado=>{
        resultado.forEach(inventario => {
            console.log(inventario);

            let datos = document.querySelector(".datos");
            let medicamentos = document.createElement("div");
            medicamentos.classList.add("my-2", "col-4", "mx-3", "p-2");

            let pIdProducto = document.createElement("input");
            let idPro = document.createTextNode(inventario.idProducto);
            pIdProducto.type = 'hidden';
            pIdProducto.appendChild(idPro);

            let pNombre = document.createElement("p");
            let nombrePro = document.createTextNode("Nombre del producto: " + inventario.NombreProducto)
            pNombre.appendChild(nombrePro);

            let pCantidad = document.createElement("p");
            let cantidadPro = document.createTextNode("Stock: " + inventario.Cantidad)
            pCantidad.appendChild(cantidadPro);

            let pPrecio = document.createElement("p");
            let precioPro = document.createTextNode("Precio: " + inventario.Precio)
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
            medicamentos.appendChild(pIdProducto);

            datos.appendChild(medicamentos);

        

    });
}); 
}

function borrar(){
    let datos = this.parentNode;
    console.log(datos.childNodes[1].innerText);
    console.log(datos.lastElementChild.innerText);
    let sql = "UPDATE `farmacias_productos` SET `Cantidad`='[value-4]' WHERE `IdProducto`= datos.lastElementChild.innerText ";
}
