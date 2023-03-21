window.onload=()=>{

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        Pintar(document.querySelector('.contenedor'),element.nombre)
        let contenedor = document.querySelector("#contenedor");

        
        function Pintar(elemento, mensaje) {
            
        }

        
    
    }));

 
}