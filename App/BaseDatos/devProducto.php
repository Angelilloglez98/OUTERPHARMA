<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo = $_SESSION['CorreoFarmacia'];
    $codigo = $_GET['codigo'];

    $sql="SELECT Productos.Nombre
    FROM FARMACIAS_PRODUCTOS INNER JOIN PRODUCTOS ON FARMACIAS_PRODUCTOS.CodigoNacional=PRODUCTOS.CodigoNacional where Ccorreo='$correo' and FARMACIAS_PRODUCTOS.CodigoNacional = '$codigo'";
    
    
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