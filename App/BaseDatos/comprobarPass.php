<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];
    $password=$_POST['password'];
    $sql="SELECT Contrasena from empleados where CcorreoFarmacia='$correo' AND Rol='Admin'";
    
    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();

    $fila=$sth->fetch();

    $verify = password_verify($fila['Contrasena'], $hash);

    if ($verify) {
        echo "true";
    } else {
        echo "false";
    }
?>