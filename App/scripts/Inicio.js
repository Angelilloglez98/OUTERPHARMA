function datosVentasPedidos() {
    let mesesVentas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    fetch('http://localhost/OuterPharma/App/BaseDatos/devVentasMeses.php')
        .then(res => res.json())
        .then(resultado => {
            resultado.forEach(venta => {
                switch (venta.Mes) {
                    case '01':
                        mesesVentas[0] = venta.CantidadVendida;
                        break;
                    case '02':
                        mesesVentas[1] = venta.CantidadVendida;
                        break;
                    case '03':
                        mesesVentas[2] = venta.CantidadVendida;
                        break;
                    case '04':
                        mesesVentas[3] = venta.CantidadVendida;
                        break;
                    case '05':
                        mesesVentas[4] = venta.CantidadVendida;
                        break;
                    case '06':
                        mesesVentas[5] = venta.CantidadVendida;
                        break;
                    case '07':
                        mesesVentas[6] = venta.CantidadVendida;
                        break;
                    case '08':
                        mesesVentas[7] = venta.CantidadVendida;
                        break;
                    case '09':
                        mesesVentas[8] = venta.CantidadVendida;
                        break;
                    case '10':
                        mesesVentas[9] = venta.CantidadVendida;
                        break;
                    case '11':
                        mesesVentas[10] = venta.CantidadVendida;
                        break;
                    case '12':
                        mesesVentas[11] = venta.CantidadVendida;
                        break;
                    default:
                        break;
                }
            });


        });

        let mesesPedidos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        fetch('http://localhost/OuterPharma/App/BaseDatos/devPedidosMes.php')
            .then(dev => dev.json())
            .then(resultado => {
                resultado.forEach(venta => {
                    switch (venta.Mes) {
                        case '01':
                            mesesPedidos[0] = venta.CantidadPedida;
                            break;
                        case '02':
                            mesesPedidos[1] = venta.CantidadPedida;
                            break;
                        case '03':
                            mesesPedidos[2] = venta.CantidadPedida;
                            break;
                        case '04':
                            mesesPedidos[3] = venta.CantidadPedida;
                            break;
                        case '05':
                            mesesPedidos[4] = venta.CantidadPedida;
                            break;
                        case '06':
                            mesesPedidos[5] = venta.CantidadPedida;
                            break;
                        case '07':
                            mesesPedidos[6] = venta.CantidadPedida;
                            break;
                        case '08':
                            mesesPedidos[7] = venta.CantidadPedida;
                            break;
                        case '09':
                            mesesPedidos[8] = venta.CantidadPedida;
                            break;
                        case '10':
                            mesesPedidos[9] = venta.CantidadPedida;
                            break;
                        case '11':
                            mesesPedidos[10] = venta.CantidadPedida;
                            break;
                        case '12':
                            mesesPedidos[11] = venta.CantidadPedida;
                            break;
                        default:
                            break;
                    }
                });
                graficoLineal(mesesVentas,mesesPedidos);
            })
    
}




function datosGraficoCircular() {
    let nombreMedicamento = [];
    let cantidadPorMedicamento = [];
    fetch('http://localhost/OuterPharma/App/BaseDatos/devProductosMasVendidos.php')
        .then(data => data.json())
        .then(res => {
            res.forEach(element => {

                nombreMedicamento.push(element.Nombre);
                cantidadPorMedicamento.push(element.CantidadVendida);

            });
        GraficoCircular(nombreMedicamento,cantidadPorMedicamento);
        })
    
}

function GraficoCircular(nombresMedicamentos,cantidadMedicamento) {
    var graficoCircular = document.getElementById('graficoCircular').getContext('2d');

var data = {
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

var options = {
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

new Chart(graficoCircular, {
    type: 'pie',
    data: data,
    options: options
});

}

function graficoLineal(linea1,linea2) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Ventas',
                data: linea1
            }, {
                type: 'line',
                label: 'Pedidos',
                data: linea2
            }],
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        options: {
            aspectRatio: 3,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function pintarGraficos() {
     datosGraficoCircular();
    datosVentasPedidos();
    
}

pintarGraficos();
