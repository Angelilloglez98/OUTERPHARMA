<?php

require('./conexionDB.php');
session_start();
$registros=array();

$codigo = $_GET["cn"];

$correo=$_SESSION['CorreoFarmacia'];

// Consulta SELECT para verificar si el producto ya existe
$sth = $pdo->prepare("SELECT * FROM FARMACIAS_PRODUCTOS WHERE CodigoNacional = :codigo AND Ccorreo = '$correo'");
$sth->bindParam(':codigo', $codigo);
$sth->execute();

// Si no hay resultados, agregar el producto a la base de datos
if ($sth->rowCount() == 0) {

    $sth = $pdo->prepare("SELECT * FROM PRODUCTOS WHERE CodigoNacional = :codigo");
    $sth->bindParam(':codigo', $codigo);
    $sth->execute();

    if ($sth->rowCount() == 0) {
        $nombre = "Prueba";
        $pactivo = "Prueba p";
        $lab= "Prueba Lab";
        $vadmin = "vAdmin";
        $pres = "Prescripcion";
        $sth = $pdo->prepare("INSERT INTO PRODUCTOS (CodigoNacional, Nombre, pActivo, Laboratorio, vAdmin, presMedica) VALUES (:codigo, :nombre, :pactivo, :lab, :vadmin, :pres)");
        $sth->execute(array(':codigo' => $codigo, ':nombre' => $nombre, ':pactivo' => $pactivo, ':lab' => $lab, ':vadmin' => $vadmin, ':pres' => $pres));
    }

    $precio = 1.5;
    $cantidad = 1;
    $fEntrada = 2023-04-05;
    $fCaducidad = 2024-06-01;
    $sth = $pdo->prepare("INSERT INTO FARMACIAS_PRODUCTOS (Ccorreo, CodigoNacional, Precio, Cantidad, fEntrada, fCaducidad) VALUES (:correo, :codigo, :precio, :cantidad, :fEntrada, :fCaducidad)");
    $sth->execute(array(':correo' => $correo, ':codigo' => $codigo, ':precio' => $precio, ':cantidad' => $cantidad, ':fEntrada' => $fEntrada, ':fCaducidad' => $fCaducidad));
}
// Si hay resultados, actualizar el stock del producto
else {
    $sth = $pdo->prepare("SELECT Cantidad FROM Farmacias_Productos WHERE CodigoNacional = :codigo AND Ccorreo = '$correo'");
    $sth->bindParam(':codigo', $codigo);
    $sth->execute();

    $cantidad = $sth->fetchColumn();
    $cantidad++;

    $sth = $pdo->prepare("UPDATE Farmacias_PRODUCTOS SET Cantidad = $cantidad WHERE CodigoNacional = :codigo AND Ccorreo = '$correo'");
    $sth->execute(array(':codigo' => $codigo));
}

?>
<p><?php echo $correo ?></p>