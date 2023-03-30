<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];
    $nombre=$_POST["nombre"];
    $correopersonal=$_POST["correopersonal"];
    $numero=$_POST["numero"];


    $sql="DELETE FROM empleados WHERE CcorreoFarmacia = '$correo' AND Nombre = '$nombre' AND CorreoPersonal = '$correopersonal' AND Telefono = '$numero'";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();
?>