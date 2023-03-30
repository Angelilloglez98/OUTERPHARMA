<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT *
    FROM FARMACIAS_PRODUCTOS INNER JOIN PRODUCTOS ON FARMACIAS_PRODUCTOS.CodigoNacional=PRODUCTOS.CodigoNacional where Ccorreo='$correo'";
    
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'Ccorreo'=>$fila['Ccorreo'],
            'CodigoNacional'=>$fila['CodigoNacional'],
            'NombreProducto'=>$fila['Nombre'],
            'Precio'=>$fila['Precio'],
            'Cantidad'=>$fila['Cantidad'],
            'fCaducidad'=>$fila['fCaducidad']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>