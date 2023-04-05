<?php
    require('./conexionDB.php');
    session_start();

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];

    $sql="SELECT * FROM proveedores WHERE CcorreoFarmacia='$correo'";
    
    
    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();

    while ($fila=$sth->fetch()) {
        $registros[]=array(
            'nombre'=>$fila['Nombre'],
            'direccion'=>$fila['Direccion'],
            'nTelefono'=>$fila['nTelefono'],
            'Link'=>$fila['Link'],
        );
    }
    
    $resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
    echo $resultado;
    

?>