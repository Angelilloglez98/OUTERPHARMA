<?php
session_start();
    require('./conexionDB.php');
    
    $registros=array();


    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT ventas.nVentas,ventas.Fecha,ventas.Total,ventas_productos.CodigoNacional,ventas_productos.Cantidad,ventas_productos.PVP,ventas_productos.PrecioProductos,productos.Nombre,empleados.NombreEmpleado FROM VENTAS
    INNER JOIN VENTAS_PRODUCTOS ON ventas_productos.nVentas=VENTAS.nVentas 
    INNER JOIN PRODUCTOS ON PRODUCTOS.CodigoNacional=VENTAS_PRODUCTOS.CodigoNacional 
    INNER JOIN EMPLEADOS ON EMPLEADOS.nEmpleado=VENTAS.nEmpleado
    where VENTAS.Ccorreo='$correo'";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth = $pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'IdVenta'=>$fila['nVentas'],
            'Fecha'=>$fila['Fecha'],
            'Total'=>$fila['Total'],
            'CN'=>$fila['CodigoNacional'],
            'Cantidad'=>$fila['Cantidad'],
            'PVP'=>$fila['PVP'],
            'PrecioProductos'=>$fila['PrecioProductos'],
            'NombreProducto'=>$fila['Nombre'],
            'NombreEmpleado'=>$fila['NombreEmpleado']
        );
    }

    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>