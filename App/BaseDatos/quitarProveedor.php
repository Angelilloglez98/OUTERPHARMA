<?php
    require('./conexionDB.php');
    session_start();

    $CcorreoFarmacia=$_SESSION['CorreoFarmacia'];
    $Nombre=$_POST["Nombre"];
   


    $sql="DELETE FROM proveedores WHERE CcorreoFarmacia = '$correo' AND Nombre = :Nombre";
    $sth->bindParam(':CcorreoFarmacia', $CcorreoFarmacia);
    $sth->bindParam(':Nombre', $Nombre);

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();
?>