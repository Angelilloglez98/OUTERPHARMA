<?php

require('./conexionDB.php');
session_start();
$registros=array();

$codigo = $_GET["cn"];

$correo=$_SESSION['CorreoFarmacia'];

// Consulta SELECT para verificar si el producto ya existe
$sth = $pdo->prepare("SELECT * FROM Productos WHERE CodigoNacional = :codigo");
$sth->bindParam(':codigo', $codigo);
$sth->execute();

// Si no hay resultados, agregar el producto a la base de datos
if ($sth->rowCount() == 0) {
    echo $codigo . "<br>"; // Agregar punto y coma
    $nombre = "Prueba"; // Debes definir el nombre, precio y cantidad
    $precio = 0.0;
    $cantidad = 1;
    $sth = $pdo->prepare("INSERT INTO PRODUCTOS (CodigoNacional, Nombre, Precio, Stock) VALUES (:codigo, :nombre, :precio, :cantidad)");
    $sth->execute(array(':codigo' => $codigo, ':nombre' => $nombre, ':precio' => $precio, ':cantidad' => $cantidad));
}
// Si hay resultados, actualizar el stock del producto
else {
    $sth = $pdo->prepare("SELECT Cantidad FROM Farmacias_Productos WHERE CodigoNacional = :codigo");
    $sth->bindParam(':codigo', $codigo);
    $sth->execute();

    $cantidad = $sth->fetchColumn();
    $cantidad++;

    $sth = $pdo->prepare("UPDATE Farmacias_PRODUCTOS SET Cantidad = $cantidad WHERE CodigoNacional = :codigo");
    $sth->execute(array(':codigo' => $codigo));
}

?>