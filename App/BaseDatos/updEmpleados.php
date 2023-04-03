<?php
    require('./conexionDB.php');
    session_start();


    $correo=$_SESSION['CorreoFarmacia'];
    $nombre=$_POST["nombre"];
    $correopersonal=$_POST["correopersonal"];
    $numero=$_POST["numero"];
    $idempleado=$_POST["idempleado"];
    $sql="UPDATE empleados SET Nombre = '$nombre',Telefono='$numero',CorreoPersonal='$correopersonal' where CcorreoFarmacia='$correo' AND nEmpleado='$idempleado'";

    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();
?>