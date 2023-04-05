<?php
session_start();
    require('./conexionDB.php');
    
    $registros=array();


    $correo=$_SESSION['CorreoFarmacia'];

    $nVentas=$_GET['nVentas'];

    $sql="SELECT FARMACIAS.NombreF,FARMACIAS.nTelefono,FARMACIAS.Direccion,VENTAS.Fecha,VENTAS_PRODUCTOS.nVentas,EMPLEADOS.NombreEmpleado,PRODUCTOS.Nombre,VENTAS_PRODUCTOS.Cantidad,VENTAS_PRODUCTOS.PVP,VENTAS_PRODUCTOS.PrecioProductos,VENTAS.Total
    FROM VENTAS_PRODUCTOS 
    INNER JOIN VENTAS ON VENTAS.nVentas = ventas_productos.nVentas
    INNER JOIN PRODUCTOS ON PRODUCTOS.CodigoNacional=VENTAS_PRODUCTOS.CodigoNacional 
    INNER JOIN EMPLEADOS ON EMPLEADOS.nEmpleado=VENTAS.nEmpleado
    INNER JOIN FARMACIAS ON FARMACIAS.Ccorreo=EMPLEADOS.CcorreoFarmacia
    where VENTAS.Ccorreo='$correo' and VENTAS.nVentas='$nVentas' ";

    

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth = $pdo->prepare($sql);

    $sth->execute();

    $registros=$sth->fetchAll();

    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>