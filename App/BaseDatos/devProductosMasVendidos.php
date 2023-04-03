<?php
    require('./conexionDB.php');
    session_start();
    $fecha;
    $registros=array();
    if (isset($_GET['fecha'])) {
        $fecha=$_GET['fecha'];
    }else {
        $fecha='2023';
    }
   
    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT p.Nombre, SUM(vp.Cantidad) AS CantidadVendida
    FROM PRODUCTOS p
    JOIN VENTAS_PRODUCTOS vp ON p.CodigoNacional = vp.CodigoNacional
    JOIN VENTAS v ON vp.nVentas = v.nVentas
    JOIN FARMACIAS f ON v.Ccorreo = f.Ccorreo
    WHERE f.Ccorreo = '$correo' AND YEAR(v.Fecha) = '$fecha'
    GROUP BY p.Nombre
    ORDER BY CantidadVendida DESC";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Nombre'=>$fila['Nombre'],
            'CantidadVendida'=>$fila['CantidadVendida']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>