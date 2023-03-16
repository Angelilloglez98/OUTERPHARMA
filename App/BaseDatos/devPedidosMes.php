<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT DATE_FORMAT(fEntrada, '%m') AS Mes, SUM(Cantidad) AS TotalPedidos
    FROM FARMACIAS_PRODUCTOS 
    WHERE Ccorreo = '$correo'
    AND YEAR(fEntrada) = YEAR(CURDATE())
    GROUP BY Mes;";
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Mes'=>$fila['Mes'],
            'CantidadPedida'=>$fila['TotalPedidos']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>