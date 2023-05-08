window.onload=()=>{
    function recogerDatos() {
        fetch('./BaseDatos/devLabMasTop.php')
        .then(respuesta=>respuesta.json())
        .then(resultado=>{
            resultado.forEach(element => {
                imprimirDatos(element.Laboratorio,element.VentasLab);
            });
        })
    }
    recogerDatos();
    function imprimirDatos(nombre,valor) {
        let tabla=document.querySelector('#TablaLaboratorios');
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
}