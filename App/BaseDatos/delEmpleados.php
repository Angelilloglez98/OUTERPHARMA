<?php
    require('./conexionDB.php');
    session_start();

    $correo=$_SESSION['CorreoFarmacia'];
    $nombre=$_POST["nombre"];
    $idempleado=$_POST["idempleado"];


    $sql="DELETE FROM empleados WHERE CcorreoFarmacia = '$correo' AND Nombre = '$nombre' AND nEmpleado = '$idempleado'";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();
?>