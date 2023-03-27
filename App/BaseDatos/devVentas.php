<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT PRODUCTOS.Nombre, VENTAS.nEmpleado, VENTAS.Cantidad, VENTAS.Fecha, VENTAS.Total, MONTH(VENTAS.Fecha) AS Mes
    FROM VENTAS
    INNER JOIN VENTAS_PRODUCTOS ON VENTAS.nVentas = VENTAS_PRODUCTOS.nVentas
    INNER JOIN PRODUCTOS ON VENTAS_PRODUCTOS.CodigoNacional = PRODUCTOS.CodigoNacional
    ORDER BY MONTH(VENTAS.Fecha)";
    
    
    
    $sql_totalVentas= "SELECT SUM(Total) AS TotalVenta, MONTH(Fecha) AS Mes
    FROM VENTAS
    GROUP BY MONTH(Fecha)";
    // Id producto -> Nombre del producto, nº Empleado, Cantidad vendida, fecha de la venta, total de esa venta


    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'nombreProducto'=>$fila['Nombre'],
            'numeroEmpleado'=>$fila['nEmpleado'],
            'cantidadVendida'=>$fila['Cantidad'],
            'fechaVenta'=>$fila['Fecha'],
            'totalVenta'=>$fila['Total']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>