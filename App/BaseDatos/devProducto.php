<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo = $_SESSION['CorreoFarmacia'];
    $codigo = $_GET['codigo'];

    $sql="SELECT Productos.Nombre
    FROM farmacias_productos INNER JOIN productos ON farmacias_productos.CodigoNacional=productos.CodigoNacional where Ccorreo='$correo' and farmacias_productos.CodigoNacional = '$codigo'";
    
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'NombreProducto'=>$fila['Nombre']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>