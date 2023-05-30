<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT productos.Nombre, ventas.nEmpleado, ventas.Cantidad, ventas.Fecha, ventas.Total, MONTH(ventas.Fecha) AS Mes
    FROM ventas
    INNER JOIN ventas_productos ON ventas.nVentas = ventas_productos.nVentas
    INNER JOIN productos ON ventas_productos.CodigoNacional = productos.CodigoNacional
    ORDER BY MONTH(ventas.Fecha)";
    
    
    
    $sql_totalVentas= "SELECT SUM(Total) AS TotalVenta, MONTH(Fecha) AS Mes
    FROM ventas
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