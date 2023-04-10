<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT UrlEmpleado,NombreEmpleado,Contrasena,Rol,Telefono,CorreoPersonal,nEmpleado from empleados where CcorreoFarmacia='$correo'";
    
    $pdo->exec("SET NAMES 'utf8mb4'");
    
    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'UrlEmpleado'=>$fila['UrlEmpleado'],
            'nEmpleado'=>$fila['nEmpleado'],
            'nombre'=>$fila['NombreEmpleado'],
            'contrasena'=>$fila['Contrasena'],
            'rol'=>$fila['Rol'],
            'telefono'=>$fila['Telefono'],
            'correopersonal'=>$fila['CorreoPersonal'],
            'nempleado'=>$fila['nEmpleado']

        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
?>
