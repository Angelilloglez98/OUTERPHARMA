<?php
session_start();
require('./conexionDB.php');

    $cn=$_GET['cn'];
    $nEmpleado=$_GET['nEmpleado'];
    $fecha_actual = date("d-m-Y");
    $cantidad=$_GET['cantidad'];
    $precio=$_GET['Precio'];
    $PrecioTotal=$_GET['Total'];
    
    $sql="INSERT INTO ventas VALUES ('','$cn','$nEmpleado','$fecha_actual','$cantidad','$precio','$PrecioTotal')";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

?>