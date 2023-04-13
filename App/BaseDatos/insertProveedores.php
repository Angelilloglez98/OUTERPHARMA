<?php

    require('./conexionDB.php');
    session_start();
    $registros=array();

    $data = json_decode(file_get_contents('php://input'), true);

    $Nombre = $data["Nombre"];
    $Direccion = $data["Direccion"];
    $nTelefono = $data["nTelefono"];
    $Link = $data["Link"];

    echo $Nombre.$Direccion.$nTelefono.$Link; 

    $CcorreoFarmacia=$_SESSION['CorreoFarmacia'];

    // Consulta SELECT para verificar si el proveedor ya existe
    $sth = $pdo->prepare("SELECT * FROM proveedores WHERE Nombre = :Nombre AND CcorreoFarmacia = :CcorreoFarmacia");
    // $sth->bindParam(':Nombre', $Nombre);
    // $sth->bindParam(':CcorreoFarmacia', $CcorreoFarmacia);
    $sth->execute(array(':Nombre'=> $Nombre, ':CcorreoFarmacia'=> $CcorreoFarmacia));

    // Si no hay resultados, agregar el proveedor a la base de datos
    if ($sth->rowCount() == 0) {

        $sth = $pdo->prepare("INSERT INTO proveedores (CcorreoFarmacia, Nombre, Direccion, nTelefono, Link) VALUES (:CcorreoFarmacia, :Nombre, :Direccion, :nTelefono, :Link)");
        $sth->bindParam(':CcorreoFarmacia', $CcorreoFarmacia);
        $sth->bindParam(':Nombre', $Nombre);
        $sth->bindParam(':Direccion', $Direccion);
        $sth->bindParam(':nTelefono', $nTelefono);
        $sth->bindParam(':Link', $Link);
        if ($sth->execute()) {
            echo true;
        } else {
            echo "Error al insertar: " . $sth->errorInfo()[2];
        }

    }else{
        echo false;
    }

?>