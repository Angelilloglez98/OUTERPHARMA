<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT Nombre,Contrasena,Rol from empleados where CcorreoFarmacia='$correo'";
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'nombre'=>$fila['Nombre'],
            'contrasena'=>$fila['Contrasena'],
            'rol'=>$fila['Rol']
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>
