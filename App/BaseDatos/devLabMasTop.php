<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT PRODUCTOS.Laboratorio AS laboratorio, SUM(VENTAS.Cantidad) AS ventasProducto
    FROM VENTAS
    INNER JOIN PRODUCTOS ON VENTAS.IdProducto=PRODUCTOS.IdProducto
    INNER JOIN EMPLEADOS ON VENTAS.nEmpleado=EMPLEADOS.nEmpleado
    INNER JOIN FARMACIAS ON EMPLEADOS.CcorreoFarmacia=FARMACIAS.Ccorreo
    WHERE FARMACIAS.Ccorreo = '$correo'
    GROUP BY PRODUCTOS.laboratorio
    ORDER BY VENTAS.Cantidad DESC"
    ;
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Laboratorio'=>$fila['laboratorio'],
            'VentasLab'=>$fila['ventasProducto']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>