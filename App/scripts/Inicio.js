fetch('http://localhost/OUTERPHARMA/App/BaseDatos/devInventario.php')
.then(res=>{res.json()})
.then(resultado=>{
    console.log(resultado);
});