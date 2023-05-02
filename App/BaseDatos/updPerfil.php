<?php
    require('./conexionDB.php');
    session_start();


    $correo=$_SESSION['CorreoFarmacia'];
    $correopersonal=$_POST["correopersonal"];
    $numero=$_POST["numero"];
    $idempleado=$_POST["idempleado"];
    $imagen=$_POST["imagen"];
    $password=$_POST["password"];
    $hash = password_hash($password,PASSWORD_DEFAULT);


    $sql="UPDATE empleados SET Telefono='$numero',CorreoPersonal='$correopersonal',UrlEmpleado='$imagen',Contrasena='$hash' where CcorreoFarmacia='$correo' AND nEmpleado='$idempleado'";

    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();
?>