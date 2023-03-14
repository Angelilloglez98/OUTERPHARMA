<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT IdProducto, Precio, Cantidad, fCaducidad from inventarios where CcorreoFarmacia='$correo'";
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'idProducto'=>$fila['IdProducto'],
            'Precio'=>$fila['Precio'],
            'Cantidad'=>$fila['Cantidad'],
            'fCaducidad'=>$fila['fCaducidad']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>