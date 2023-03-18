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

    $sql="SELECT p.Nombre, SUM(v.Cantidad) as CantidadVendida 
    FROM VENTAS v JOIN PRODUCTOS p ON v.IdProducto = p.IdProducto JOIN EMPLEADOS e ON v.nEmpleado = e.nEmpleado JOIN FARMACIAS f ON e.CcorreoFarmacia = f.Ccorreo
    WHERE f.Ccorreo = '$correo'
    AND YEAR(v.Fecha) = '$fecha'
    GROUP BY p.Nombre
    ORDER BY CantidadVendida DESC;";

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