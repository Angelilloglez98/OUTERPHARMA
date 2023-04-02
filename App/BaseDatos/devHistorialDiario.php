<?php

    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT P.Nombre, FP.Precio, SUM(VP.Cantidad) AS Cantidad
    FROM FARMACIAS_PRODUCTOS FP
    JOIN PRODUCTOS P ON FP.CodigoNacional = P.CodigoNacional
    JOIN VENTAS_PRODUCTOS VP ON FP.CodigoNacional = VP.CodigoNacional
    JOIN VENTAS V ON VP.nVentas = V.nVentas
    WHERE V.Ccorreo = '$correo' AND V.Fecha = CURDATE()
    GROUP BY P.Nombre, FP.Precio;";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Nombre'=>$fila['Nombre'],
            'Cantidad'=>$fila['Cantidad'],
            'Precio'=>$fila['Precio']
        );
    }

    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>