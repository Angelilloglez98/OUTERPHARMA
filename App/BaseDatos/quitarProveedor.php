<?php
    require('./conexionDB.php');
    session_start();

    $data = json_decode(file_get_contents('php://input'), true);

    $CcorreoFarmacia=$_SESSION['CorreoFarmacia'];
    $Nombre=$data["Nombre"];
   
    $sth=$pdo->prepare("DELETE FROM proveedores WHERE CcorreoFarmacia = :CcorreoFarmacia AND Nombre = :Nombre");
    $sth->bindParam(':CcorreoFarmacia', $CcorreoFarmacia);
    $sth->bindParam(':Nombre', $Nombre);

    if ($sth->execute()) {
        echo true;
    } else {
        echo "Error al insertar: " . $sth->errorInfo()[2];
    }

?>