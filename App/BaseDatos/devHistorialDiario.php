<?php

    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT p.Nombre, vp.Cantidad, vp.PVP 
    FROM VENTAS v
    JOIN VENTAS_PRODUCTOS vp ON v.nVentas = vp.nVentas
    JOIN FARMACIAS_PRODUCTOS fp ON vp.CodigoNacional = fp.CodigoNacional AND v.Ccorreo = fp.Ccorreo
    JOIN PRODUCTOS p ON vp.CodigoNacional = p.CodigoNacional
    WHERE DATE(v.Fecha) = CURDATE() AND v.Ccorreo = '$correo'";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Nombre'=>$fila['Nombre'],
            'Cantidad'=>$fila['Cantidad'],
            'Precio'=>$fila['PVP']
        );
    }

    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>