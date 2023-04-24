<?php

require('./conexionDB.php');
session_start();
$registros=array();

$orden = $_GET['orden'];
$direccion = $_GET['direccion'];
$correo=$_SESSION['CorreoFarmacia'];

if ($orden == "Nombre") {
    $sql = "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad, p.pActivo, p.Laboratorio, p.vAdmin, p.presMedica
            FROM FARMACIAS_PRODUCTOS fp
            INNER JOIN PRODUCTOS p ON fp.CodigoNacional = p.CodigoNacional
            WHERE fp.Ccorreo = '$correo'
            ORDER BY p.Nombre $direccion";
} elseif ($orden == "Precio") {
    $sql = "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad, p.pActivo, p.Laboratorio, p.vAdmin, p.presMedica
            FROM FARMACIAS_PRODUCTOS fp
            INNER JOIN PRODUCTOS p ON fp.CodigoNacional = p.CodigoNacional
            WHERE fp.Ccorreo = '$correo'
            ORDER BY fp.Precio $direccion";
} else {
    $sql = "SELECT fp.Ccorreo, fp.CodigoNacional, p.Nombre, fp.Precio, fp.Cantidad, fp.fCaducidad, p.pActivo, p.Laboratorio, p.vAdmin, p.presMedica
            FROM FARMACIAS_PRODUCTOS fp
            INNER JOIN PRODUCTOS p ON fp.CodigoNacional = p.CodigoNacional
            WHERE fp.Ccorreo = '$correo'
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