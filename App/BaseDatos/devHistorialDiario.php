<?php

    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT PRODUCTOS.Nombre,VENTAS.Precio
    FROM VENTAS 
    INNER JOIN PRODUCTOS ON VENTAS.CodigoNacional=PRODUCTOS.CodigoNacional
    INNER JOIN EMPLEADOS ON VENTAS.nEmpleado=EMPLEADOS.nEmpleado
    INNER JOIN FARMACIAS ON EMPLEADOS.CcorreoFarmacia=FARMACIAS.Ccorreo
    WHERE VENTAS.Fecha=CAST(CURRENT_TIMESTAMP as DATE)
    AND FARMACIAS.Ccorreo='$correo';";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Nombre'=>$fila['Nombre'],
            'Precio'=>$fila['Precio']
        );
    }

    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>