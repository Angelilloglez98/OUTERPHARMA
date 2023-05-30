<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT MONTH(ventas.Fecha) AS Mes, SUM(ventas_productos.Cantidad) AS CantidadMedicamentosVendidos
    FROM ventas
    JOIN ventas_productos ON ventas.nVentas = ventas_productos.nVentas
    JOIN farmacias_productos ON ventas_productos.CodigoNacional = farmacias_productos.CodigoNacional
    WHERE YEAR(Fecha) = YEAR(CURDATE()) AND ventas.Ccorreo = '$correo'
    GROUP BY Mes";
      
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Mes'=>$fila['Mes'],
            'CantidadVendida'=>$fila['CantidadMedicamentosVendidos']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>