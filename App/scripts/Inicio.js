
let meses=[0,0,0,0,0,0,0,0,0,0,0,0];

fetch('http://localhost/OuterPharma/App/BaseDatos/devVentasMeses.php')
.then(res=>res.json())
.then(resultado=>{
    resultado.forEach(venta => {
        console.log(venta);
        switch (venta.Mes) {
            case '01':
                meses[0]=venta.CantidadVendida;
                break;
            case '02':
                meses[1]=venta.CantidadVendida;
                break;
            case '03':
                meses[2]=venta.CantidadVendida;
                break;
            case '04':
                meses[3]=venta.CantidadVendida;
                break;
            case '05':
                meses[4]=venta.CantidadVendida;
                break;
            case '06':
                meses[5]=venta.CantidadVendida;
                break;
            case '07':
                meses[6]=venta.CantidadVendida;
                break;
            case '08':
                meses[7]=venta.CantidadVendida;
                break;
            case '09':
                meses[8]=venta.CantidadVendida;
                break;
            case '10':
                meses[9]=venta.CantidadVendida;
                break;
            case '11':
                meses[10]=venta.CantidadVendida;
                break;
            case '12':
                meses[11]=venta.CantidadVendida;
                break;
            default:
                break;
        }
    });
    
  const ctx = document.getElementById('myChart');
  
  new Chart(ctx, {
    data: {
        datasets: [{
            type: 'line',
            label: 'Ventas',
            data: meses
        }],
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre','Noviembre','Diciembre']
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});