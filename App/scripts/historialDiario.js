function cogerDatosHistorial() {
    fetch('http://localhost/OuterPharma/App/BaseDatos/devHistorialDiario.php')
    .then(respuesta=>respuesta.json())
    .then(resultado=>{
        resultado.forEach(element => {
            console.log(element);
            pintarDatosHistorial(element.Nombre,element.Precio);
        });
    })
}

cogerDatosHistorial();

function pintarDatosHistorial(nombre,valor) {
    let tabla=document.querySelector('#TablaHistorial');
    let fila=document.createElement('tr');
    fila.classList.add('fila');
    let col=document.createElement('td');
    let col2=document.createElement('td');
    col.appendChild(document.createTextNode(nombre));
    col2.appendChild(document.createTextNode(valor));
    fila.appendChild(col);
    fila.appendChild(col2);
    tabla.appendChild(fila);

}