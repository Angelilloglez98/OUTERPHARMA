<?php

require('./conexionDB.php');
session_start();
$registros=array();

// Hacer el if de si es un int o un texto
// Se cree una variable y se haga un select o otro select
$datos = $_GET["datos"];

$correo=$_SESSION['CorreoFarmacia'];

$sql="SELECT FARMACIAS_PRODUCTOS.Ccorreo,FARMACIAS_PRODUCTOS.CodigoNacional,productos.Nombre,FARMACIAS_PRODUCTOS.Precio,FARMACIAS_PRODUCTOS.Cantidad,FARMACIAS_PRODUCTOS.fCaducidad
    FROM FARMACIAS_PRODUCTOS INNER JOIN PRODUCTOS ON FARMACIAS_PRODUCTOS.CodigoNacional=PRODUCTOS.CodigoNacional where Ccorreo='$correo'";
if (is_numeric($datos)) {
    $sql= "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad
    FROM FARMACIAS_PRODUCTOS as fp
    INNER JOIN PRODUCTOS as p
    ON fp.CodigoNacional = p.CodigoNacional
    WHERE fp.Ccorreo = '$correo' and fp.CodigoNacional = '$datos'";
} else {
    $sql= "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad
    FROM FARMACIAS_PRODUCTOS as fp
    INNER JOIN PRODUCTOS as  p
    ON fp.CodigoNacional = p.CodigoNacional
    WHERE fp.Ccorreo = '$correo' and p.Nombre = '$datos'";
}
    
$pdo->exec("SET NAMES 'utf8mb4'");

$sth = $pdo->prepare($sql);


$sth->execute();

while ($fila=$sth->fetch()) {
    $registros[]=array(
        'Ccorreo'=>$fila['Ccorreo'],
        'CodigoNacional'=>$fila['CodigoNacional'],
        'NombreProducto'=>$fila['Nombre'],
        'Precio'=>$fila['Precio'],
        'Cantidad'=>$fila['Cantidad'],
        'fCaducidad'=>$fila['fCaducidad']
    );
}

$resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
echo $resultado;
?>