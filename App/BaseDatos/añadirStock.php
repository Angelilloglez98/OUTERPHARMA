<?php

require('./conexionDB.php');
session_start();
$registros=array();

$codigo = $_GET["cn"];

$correo=$_SESSION['CorreoFarmacia'];

$sth = $pdo->prepare("SELECT Cantidad FROM Farmacias_Productos WHERE CodigoNacional = :codigo AND Ccorreo = '$correo'");
$sth->execute(array(':codigo' => $codigo));

$cantidad = $sth->fetchColumn();
$cantidad++;

$sth = $pdo->prepare("UPDATE Farmacias_PRODUCTOS SET Cantidad = $cantidad WHERE CodigoNacional = :codigo AND Ccorreo = '$correo'");
$sth->execute(array(':codigo' => $codigo));
?>