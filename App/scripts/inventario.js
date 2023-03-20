fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
.then(res=>res.json())
.then(resultado=>{
    resultado.forEach(inventario => {
        console.log(inventario);

        let datos = document.querySelector(".datos");
        let medicamentos = document.createElement("div");

        let pNombre = document.createElement("p");
        pNombre = document.createTextNode("Nombre del producto: " + inventario.NombreProducto);

        let pCantidad = document.createElement("p");
        pCantidad = document.createTextNode("Cantidad: " + inventario.Cantidad);

        let pPrecio = document.createElement("p");
        pPrecio = document.createTextNode("Precio: " + inventario.Precio);

        medicamentos.appendChild(pNombre);
        medicamentos.appendChild(pCantidad);
        medicamentos.appendChild(pPrecio);

        datos.appendChild(medicamentos);



    });
});

    