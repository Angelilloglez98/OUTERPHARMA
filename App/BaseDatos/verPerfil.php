<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $data = json_decode(file_get_contents('php://input'), true);

    $correo=$_SESSION['CorreoFarmacia'];
    $idempleado=$data["nempleado"];
    $password=$data['password'];


    $sql="SELECT Contrasena FROM empleados WHERE CcorreoFarmacia='$correo' AND nEmpleado='$idempleado'";

    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $fila = $sth->execute();

    if (password_verify($password,$fila['Contrasena'])) {
        echo "true";
    } else {
        echo "false";
    }
?>