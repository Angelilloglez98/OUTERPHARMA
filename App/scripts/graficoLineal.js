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

datosVentasPedidos(); 



