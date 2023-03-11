window.onload=()=>{
    


    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        console.log(element);
        Pintar(window.document.body,element.nombre)
    }));


    function Pintar(elemento, mensaje) {
        
          let p=document.createElement('p');
          p.classList.add('error');
          let texto=document.createTextNode(mensaje);
          p.appendChild(texto);
          elemento.appendChild(p)
      }
}


