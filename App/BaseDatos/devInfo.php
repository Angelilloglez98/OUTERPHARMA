<?php

require('./conexionDB.php');
session_start();
$registros=array();

$nombre = $_GET["nombre"];

$correo=$_SESSION['CorreoFarmacia'];

$sql="SELECT FARMACIAS_PRODUCTOS.Ccorreo,FARMACIAS_PRODUCTOS.CodigoNacional,productos.Nombre,FARMACIAS_PRODUCTOS.Precio,FARMACIAS_PRODUCTOS.Cantidad,FARMACIAS_PRODUCTOS.fCaducidad, productos.pActivo, productos.Laboratorio, productos.vAdmin, productos.presMedica
    FROM FARMACIAS_PRODUCTOS INNER JOIN PRODUCTOS ON FARMACIAS_PRODUCTOS.CodigoNacional=PRODUCTOS.CodigoNacional where Ccorreo='$correo' and productos.Nombre='$nombre'";

$pdo->exec("SET NAMES 'utf8mb4'");

$sth = $pdo->prepare($sql);

$sth->execute();

while ($fila=$sth->fetch()) {
    $registros[]=array(
        'Ccorreo'=>$fila['Ccorreo'],
        'CodigoNacional'=>$fila['CodigoNacional'],
        'NombreProducto'=>$fila['Nombre'],
        'Precio'=>$fila['Precio'],
        'Cantidad'=>$fila['Cantidad'],
        'fCaducidad'=>$fila['fCaducidad'],
        'pActivo'=>$fila['pActivo'],
        'Laboratorio'=>$fila['Laboratorio'],
        'vAdmin'=>$fila['vAdmin'],
        'presMedica'=>$fila['presMedica']
    );
}

$resultado = json_encode($registros, JSON_UNESCAPED_UNICODE);
echo $resultado;
?>