<?php

require('./conexionDB.php');
session_start();
$registros=array();

$idProducto = $_GET["idProducto"];
$cantidad = $_GET["cantidad"];
$cantidad--;

$sqlUpdate = "UPDATE `farmacias_productos` SET `Cantidad`='$cantidad' WHERE `IdProducto`= '$idProducto'";

$correo=$_SESSION['CorreoFarmacia'];

$sqlSelect="SELECT FARMACIAS_PRODUCTOS.Ccorreo,FARMACIAS_PRODUCTOS.idProducto,productos.Nombre,FARMACIAS_PRODUCTOS.Precio,FARMACIAS_PRODUCTOS.Cantidad,FARMACIAS_PRODUCTOS.fCaducidad
    FROM FARMACIAS_PRODUCTOS INNER JOIN PRODUCTOS ON FARMACIAS_PRODUCTOS.idProducto=PRODUCTOS.idProducto where Ccorreo='$correo'";

$pdo->exec("SET NAMES 'utf8mb4'");

$sth = $pdo->prepare($sqlUpdate);

$sth->execute();

$sthSel = $pdo->prepare($sqlSelect);

$sthSel->execute();

while ($fila=$sthSel->fetch()) {
    $registros[]=array(
        'Ccorreo'=>$fila['Ccorreo'],
        'idProducto'=>$fila['idProducto'],
        'NombreProducto'=>$fila['Nombre'],
        'Precio'=>$fila['Precio'],
        'Cantidad'=>$fila['Cantidad'],
        'fCaducidad'=>$fila['fCaducidad']
    );
}

$resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
echo $resultado;
?>