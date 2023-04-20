<?php

require('./conexionDB.php');
session_start();

$registros=array();

$correo=$_SESSION['CorreoFarmacia'];

$sql = "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad
        FROM FARMACIAS_PRODUCTOS as fp
        INNER JOIN PRODUCTOS as p
        ON fp.CodigoNacional = p.CodigoNacional
        WHERE fp.Ccorreo = '$correo'
        ORDER BY p.Nombre ASC";


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