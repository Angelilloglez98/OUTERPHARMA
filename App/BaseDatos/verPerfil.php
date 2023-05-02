<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $data = json_decode(file_get_contents('php://input'), true);

    $correo=$_SESSION['CorreoFarmacia'];
    $idempleado=$data["idempleado"];


    $sql="SELECT Contrasena FROM empleados WHERE CcorreoFarmacia='$correo' AND nEmpleado='$idempleado'";

    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();

    $registro=$sth->fetchColumn();

    $resultado = json_encode($registro, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>