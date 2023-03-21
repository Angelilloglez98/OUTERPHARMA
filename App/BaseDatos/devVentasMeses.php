<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT DATE_FORMAT(Fecha, '%m') AS Mes, SUM(Cantidad) AS TotalVentas
    FROM VENTAS
    INNER JOIN EMPLEADOS ON VENTAS.nEmpleado = EMPLEADOS.nEmpleado
    INNER JOIN FARMACIAS ON EMPLEADOS.CcorreoFarmacia = FARMACIAS.Ccorreo
    WHERE FARMACIAS.Ccorreo = '$correo'
    AND YEAR(Fecha) = YEAR(CURDATE())
    GROUP BY Mes;";
      
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Mes'=>$fila['Mes'],
            'CantidadVendida'=>$fila['TotalVentas']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>