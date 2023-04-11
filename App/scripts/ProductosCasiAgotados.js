
fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
.then(res=>res.json())
.then(response=>{
    // Aquí usamos el método sort para ordenar las cartas por cantidad.
    response.sort((a, b) => a.Cantidad - b.Cantidad);

    response.forEach(element => {
        pintarCarta(element.NombreProducto, element.Cantidad, element.CodigoNacional, '.carousel');
    });
    
});

    function pintarCarta(Nombre,Cantidad,CN,Ubicacion) {
        let contenedorCarta=document.querySelector(Ubicacion);
        let carta=document.createElement('div');
        let sup=document.createElement('div');
        let imagen=document.createElement('img');
        let nombreMedicamento=document.createElement('p');
        let cn=document.createElement('p');
        let cantidad=document.createElement('div');
        let NombreM=Nombre.padEnd(12, ' ').slice(0, 12);
        carta.classList.add('carta');
        sup.classList.add('sup');
        cantidad.classList.add('cantidad');
        nombreMedicamento.classList.add('NombreMedicamento');
        cantidad.appendChild(document.createTextNode(Cantidad));
        cn.appendChild(document.createTextNode(CN));
        nombreMedicamento.appendChild(document.createTextNode(NombreM));
        imagen.src='assets/pastillica.webp';

        sup.appendChild(imagen);
        sup.appendChild(nombreMedicamento);
        sup.appendChild(cn);

        carta.appendChild(sup);
        carta.appendChild(cantidad);

        contenedorCarta.appendChild(carta);

        if (Cantidad>=0 && Cantidad<=5) {
            carta.style.backgroundColor='rgba(255, 99, 132, 1)';
        }else if(Cantidad>5 && Cantidad<=15){
            carta.style.backgroundColor='rgba(255, 240, 86, 1)';
        }else{
            carta.style.backgroundColor='rgba(140,200,43,1)';
        }
;    }


const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

nextBtn.addEventListener("click", () => {
  carousel.scrollBy(300, 0);
});

prevBtn.addEventListener("click", () => {
  carousel.scrollBy(-300, 0);
});
