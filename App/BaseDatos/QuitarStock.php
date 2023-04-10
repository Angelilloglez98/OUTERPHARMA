<?php
session_start();
require('./conexionDB.php');

$cn = $_GET["CodigoNacional"];
$cantidadRestar = $_GET["cantidad"];
$correo=$_SESSION['CorreoFarmacia'];


$sqlCantidad="SELECT Cantidad FROM farmacias_productos WHERE CodigoNacional= '$cn' AND Ccorreo='$correo'";
$a = $pdo->prepare($sqlCantidad);
$a->execute();
$cantidadBD = $a->fetchColumn();

$cantidadActualizada=$cantidadBD-$cantidadRestar;

if ($cantidadActualizada>=0) {
    $sqlUpdate = "UPDATE farmacias_productos SET Cantidad='$cantidadActualizada' WHERE CodigoNacional= '$cn' AND Ccorreo='$correo'";
    $pdo->exec("SET NAMES 'utf8mb4'");
    $sth = $pdo->prepare($sqlUpdate);
    $sth->execute(); 
} 

?>