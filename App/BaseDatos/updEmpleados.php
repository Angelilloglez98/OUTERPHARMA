<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="UPDATE empleados SET Nombre = '$nombre',Contrasena = '$contraseña',Telefono='$telefono',CorreoPersonal='$correopersonal' where CcorreoFarmacia='$correo' AND nEmpleado='$nempleado'";

    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();
?>