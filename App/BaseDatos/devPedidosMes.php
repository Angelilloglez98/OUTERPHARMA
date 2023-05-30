<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT MONTH(fEntrada) AS Mes, SUM(Cantidad) AS TotalPedidos
    FROM farmacias_productos 
    JOIN farmacias ON farmacias_productos .Ccorreo = farmacias.Ccorreo 
    WHERE farmacias.Ccorreo = '$correo' AND YEAR(fEntrada) = YEAR(CURRENT_DATE())
    GROUP BY MONTH(fEntrada)";
    
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