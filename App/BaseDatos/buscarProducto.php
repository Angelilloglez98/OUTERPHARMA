<?php

require('./conexionDB.php');
session_start();
$registros=array();

// Hacer el if de si es un int o un texto
// Se cree una variable y se haga un select o otro select
$datos = $_GET["datos"];

$correo=$_SESSION['CorreoFarmacia'];

if (is_numeric($datos)) {
    $sql = "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad, p.pActivo, p.Laboratorio, p.vAdmin, p.presMedica
    FROM FARMACIAS_PRODUCTOS fp
    INNER JOIN PRODUCTOS p ON fp.CodigoNacional = p.CodigoNacional
    WHERE fp.Ccorreo = '$correo' and fp.CodigoNacional LIKE '$datos%'
    ORDER BY p.Nombre ASC";
} else {
    $sql = "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad, p.pActivo, p.Laboratorio, p.vAdmin, p.presMedica
    FROM FARMACIAS_PRODUCTOS fp
    INNER JOIN PRODUCTOS p ON fp.CodigoNacional = p.CodigoNacional
    WHERE fp.Ccorreo = '$correo' and p.Nombre LIKE '$datos%'
    ORDER BY p.Nombre ASC";
}


    
$pdo->exec("SET NAMES 'utf8mb4'");

$sth = $pdo->prepare($sql);


$sth->execute();

while ($fila=$sth->fetch()) {
    $registros[]=array(
        'Ccorreo'       =>$fila['Ccorreo'],
        'CodigoNacional'=>$fila['CodigoNacional'],
        'NombreProducto'=>$fila['Nombre'],
        'Precio'        =>$fila['Precio'],
        'Cantidad'      =>$fila['Cantidad'],
        'fCaducidad'    =>$fila['fCaducidad'],
        'pActivo'       =>$fila['pActivo'],
        'Laboratorio'   =>$fila['Laboratorio'],
        'vAdmin'        =>$fila['vAdmin'],
        'presMedica'    =>$fila['presMedica']
    );
}

$resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
echo $resultado;
?>