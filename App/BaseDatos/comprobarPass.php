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
    if ($sth->ROWCOUNT()==1 && password_verify($password,$fila['Contrasena'])) {
        echo true;
    }else {
        echo false;
    }
?>