<?php

    require('./conexionDB.php');
    session_start();

    $data = json_decode(file_get_contents('php://input'), true);

    $Nombre = $data["Nombre"];
    $Direccion = $data["Direccion"];
    $nTelefono = $data["nTelefono"];
    $Link = $data["Link"];

    $CcorreoFarmacia=$_SESSION['CorreoFarmacia'];

    // Consulta SELECT para verificar si el proveedor ya existe
    $sth = $pdo->prepare("UPDATE proveedores SET Direccion=:Direccion, nTelefono=:nTelefono, Link=:Link where Nombre=:Nombre");
    $sth->bindParam(':Nombre', $Nombre);
    $sth->bindParam(':Direccion', $Direccion);
    $sth->bindParam(':nTelefono', $nTelefono);
    $sth->bindParam(':Link', $Link);
    if ($sth->execute()) {
        echo true;
    } else {
        echo "Error al insertar: " . $sth->errorInfo()[2];
    }

?>