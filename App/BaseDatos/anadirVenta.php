<?php
session_start();
require('./conexionDB.php');
    $correo=$_SESSION['CorreoFarmacia'];
    $nEmpleado=$_GET['nEmpleado'];
    $fecha_actual = date("Y-m-d H:i:s");
    $PrecioTotal=$_GET['PTotal'];
    $Productos_Encoded=$_GET['Productos'];
    $Productos = json_decode($Productos_Encoded);

    //Insertar una venta
    $sql="INSERT INTO ventas VALUES ('','$correo','$nEmpleado','$fecha_actual','$PrecioTotal')";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    //Insertar todos los productos de la venta
    
    $ultimaVenta=$pdo->lastInsertId();
    for ($i=0; $i < count($Productos); $i++) { 

        $sqlVentas="INSERT INTO VENTAS_PRODUCTOS VALUES ('$ultimaVenta','" . $Productos[$i]->CodigoNacional . "','" . $Productos[$i]->Cantidad . "','" . $Productos[$i]->PVP . "','" . $Productos[$i]->precioFila . "')";
        $pdo->exec("SET NAMES 'utf8mb4'");
    
        $stha=$pdo->prepare($sqlVentas);
        
        $stha->execute();

        if (!$stha) {
            echo "\nPDO::errorInfo():\n";
            print_r($pdo->errorInfo());
        }
    }
    
    
?>