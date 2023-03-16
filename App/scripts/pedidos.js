window.onload = () =>{

    fetch('http://localhost/OuterPharma/App/BaseDatos/devProveedores.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {

        console.log(element);

    }));

} 