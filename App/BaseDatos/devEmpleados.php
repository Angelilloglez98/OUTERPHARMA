
    <?php
        require('./conexionDB.php');
        session_start();

        $registros=array();

        $codigo=$_SESSION['codigoFarmacia'];

        $sql="SELECT Nombre,Contrasena,Rol from empleados where Codigo='$codigo'";

        $sth=$pdo->prepare($sql);
    	
        $sth->execute();
        while ($fila=$sth->fetch()) {
            $registros[]=array(
                'nombre'=>$fila['Nombre'],
                'contrasena'=>$fila['Contrasena'],
                'rol'=>$fila['Rol']
            );
        }
        $registros_json=json_encode($registros);
        echo($registros_json);
    ?>
