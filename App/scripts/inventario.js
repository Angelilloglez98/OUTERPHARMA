fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
.then(res=>res.json())
.then(resultado=>{
    resultado.forEach(inventario => {
        console.log(inventario);

        let datos = document.querySelector(".datos");
        let medicamentos = document.createElement("div");
        medicamentos.classList.add("my-2", "col-4", "mx-3", "p-2");

        let pNombre = document.createElement("p");
        let nombrePro = document.createTextNode("Nombre del producto: " + inventario.NombreProducto)
        pNombre.appendChild(nombrePro);

        let pCantidad = document.createElement("p");
        let cantidadPro = document.createTextNode("Stock: " + inventario.Cantidad)
        pCantidad.appendChild(cantidadPro);

        let pPrecio = document.createElement("p");
        let precioPro = document.createTextNode("Precio: " + inventario.Precio)
        pPrecio.appendChild(precioPro);

        medicamentos.appendChild(pNombre);
        medicamentos.appendChild(pCantidad);
        medicamentos.appendChild(pPrecio);

        datos.appendChild(medicamentos);

        

    });
});

    