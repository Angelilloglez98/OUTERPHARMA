<?php

    require('./conexionDB.php');
    session_start();
    $registros=array();

    $nombre = $_GET["Nombre"];
    $direccion = $_GET["Direccion"];
    $nTelefono = $_GET["nTelefono"];
    $Link = $_GET["Link"];

    $correo=$_SESSION['CcorreoFarmacia'];

    // Consulta SELECT para verificar si el proveedor ya existe
    $sth = $pdo->prepare("SELECT * FROM proveedores WHERE Nombre = :nombre AND CcorreoFarmacia = '$correo'");
    $sth->bindParam(':nombre', $nombre);
    $sth->execute();

    // Si no hay resultados, agregar el proveedor a la base de datos
    if ($sth->rowCount() == 0) {

        $sth = $pdo->prepare("INSERT INTO proveedores (CcorreoFarmacia, Nombre, Direccion, nTelefono, Link) VALUES (:correo, :nombre, :direccion, :ntelefono, :link)");
        $sth->execute(array(':correo' => $correo, ':nombre' => $nombre, ':direccion' => $direccion, ':ntelefono' => $nTelefono, ':link' => $Link));
        echo true;
        
    }else{
        echo false;
    }

?>