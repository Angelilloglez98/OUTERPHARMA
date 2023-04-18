<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $data = json_decode(file_get_contents('php://input'), true);

    $correo=$_SESSION['CorreoFarmacia'];
    $password=$data['password'];
    $sql="SELECT Contrasena from empleados where CcorreoFarmacia='$correo' AND Rol='Admin'";
    
    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();

    $fila=$sth->fetch();

    if (password_verify($password,$fila['Contrasena'])) {
        echo "true";
    } else {
        echo "false";
    }
?>