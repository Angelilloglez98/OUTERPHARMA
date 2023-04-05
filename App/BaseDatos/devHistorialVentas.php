<?php
session_start();
    require('./conexionDB.php');
    
    $registros=array();


    $correo=$_SESSION['CorreoFarmacia'];

    // $sql="SELECT FARMACIAS.NombreF,FARMACIAS.Direccion,FARMACIAS.nTelefono,ventas.nVentas,ventas.Fecha,ventas.Total,ventas_productos.CodigoNacional,ventas_productos.Cantidad,ventas_productos.PVP,ventas_productos.PrecioProductos,productos.Nombre,empleados.NombreEmpleado FROM VENTAS
    // INNER JOIN VENTAS_PRODUCTOS ON ventas_productos.nVentas=VENTAS.nVentas 
    // INNER JOIN PRODUCTOS ON PRODUCTOS.CodigoNacional=VENTAS_PRODUCTOS.CodigoNacional 
    // INNER JOIN EMPLEADOS ON EMPLEADOS.nEmpleado=VENTAS.nEmpleado
    // INNER JOIN FARMACIAS ON FARMACIAS.Ccorreo=EMPLEADOS.CcorreoFarmacia
    // where VENTAS.Ccorreo='$correo' ";

    $sql="SELECT * FROM VENTAS
          INNER JOIN EMPLEADOS ON EMPLEADOS.nEmpleado=VENTAS.nEmpleado
          WHERE Ccorreo='$correo'";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth = $pdo->prepare($sql);

    $sth->execute();

    $registros=$sth->fetchAll();

    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>