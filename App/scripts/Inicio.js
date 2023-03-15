fetch('http://localhost/OUTERPHARMA/App/BaseDatos/devInventario.php')
.then(res=>res.json())
.then(resultado=>{
    console.log(resultado);
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    data: {
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40]
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [50, 50, 50, 50],
        }],
        labels: ['January', 'February', 'March', 'April']
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