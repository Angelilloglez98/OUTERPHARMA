<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT p.Laboratorio, SUM(vp.Cantidad) AS TotalVentas
    FROM VENTAS v
    JOIN VENTAS_PRODUCTOS vp ON v.nVentas = vp.nVentas
    JOIN FARMACIAS_PRODUCTOS fp ON vp.CodigoNacional = fp.CodigoNacional AND v.Ccorreo = fp.Ccorreo
    JOIN PRODUCTOS p ON vp.CodigoNacional = p.CodigoNacional
    WHERE v.Ccorreo = '$correo'
    GROUP BY p.Laboratorio
    ORDER BY TotalVentas DESC";
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Laboratorio'=>$fila['Laboratorio'],
            'VentasLab'=>$fila['TotalVentas']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>