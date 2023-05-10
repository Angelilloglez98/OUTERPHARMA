function cogerDatosHistorial() {
    fetch('./BaseDatos/devHistorialDiario.php')
    .then(respuesta=>respuesta.json())
    .then(resultado=>{
        resultado.forEach(element => {
            
            pintarDatosHistorial(element.Nombre,element.Cantidad,element.Precio);
        });
    })
}

cogerDatosHistorial();

function pintarDatosHistorial(nombre,cantidad,valor) {
    let tabla=document.querySelector('#TablaHistorial');
    let fila=document.createElement('tr');
    fila.classList.add('fila');
    let col=document.createElement('td');
    let col2=document.createElement('td');
    let col3=document.createElement('td');
    col.appendChild(document.createTextNode(nombre));
    col2.appendChild(document.createTextNode(cantidad));
    col3.appendChild(document.createTextNode(valor));
    fila.appendChild(col);
    fila.appendChild(col2);
    fila.appendChild(col3);
    tabla.appendChild(fila);

}