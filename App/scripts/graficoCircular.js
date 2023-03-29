let grafico = null;
let formulario=document.querySelector('form');
const cantidadMaximaMedicamento=5;
function GraficoCircular(nombresMedicamentos,cantidadMedicamento) {
    let graficoCircular= document.querySelector('#graficoCircular');
    graficoCircular.getContext('2d');

    if (grafico!==null) {
        grafico.destroy()
    }
    if (nombresMedicamentos.length==0) {
        nombresMedicamentos=['Sin datos'];
        cantidadMedicamento=[0];
    }
    if (nombresMedicamentos.length>=cantidadMaximaMedicamento) {
        nombresMedicamentos.length=cantidadMaximaMedicamento;
        cantidadMedicamento.length=cantidadMaximaMedicamento;
    }

    let data = {
        labels: nombresMedicamentos,
        datasets: [{
            label: 'Cantidad',
            data: cantidadMedicamento,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 240, 86, 0.7)',
                'rgba(140,200,43,0.7)',
                'rgba(255,140,21,0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 240, 86, 1)',
                'rgba(140,200,43,1)',
                'rgba(255,140,21,1)'
            ],
            borderWidth: 1
        }]
    };

    let options = {
        plugins:{
            legend:{
                display:true,
                position:'right'
            }
        },
        responsive: true,
        aspectRatio: 2,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    grafico= new Chart(graficoCircular, {
        type: 'pie',
        data: data,
        options: options
    });

}
function recogerDatos() {
    let nombreMedicamento = [];
    let cantidadPorMedicamento = [];
    fetch(`http://localhost/OuterPharma/App/BaseDatos/devProductosMasVendidos.php?fecha=${formulario.fecha.value}`)
    .then(respuesta=>respuesta.json())
    .then(resultado=>{
        resultado.forEach(element => {
            nombreMedicamento.push(element.Nombre);
            cantidadPorMedicamento.push(element.CantidadVendida);
        });
        GraficoCircular(nombreMedicamento,cantidadPorMedicamento);
    });
}

function a() {
    
    formulario.onchange=(evento)=>{
    evento.preventDefault();
        recogerDatos();
    }
}
a();
recogerDatos();
