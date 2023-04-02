<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT MONTH(Fecha) AS Mes, COUNT(nVentas) AS NumeroDeVentas
    FROM VENTAS
    WHERE Ccorreo = '$correo' AND YEAR(Fecha) = YEAR(CURRENT_DATE())
    GROUP BY MONTH(Fecha);";
      
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Mes'=>$fila['Mes'],
            'CantidadVendida'=>$fila['NumeroDeVentas']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>