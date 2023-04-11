<?php
    session_start();
    require('./conexionDB.php');

    $registros=array();

    $correo=$_SESSION['CorreoFarmacia'];
    $nombre=$_POST["nombre"];
    $correopersonal=$_POST["correopersonal"];
    $numero=$_POST["numero"];
    $password=$_POST["password"];
    $rol = "User";
    $url = $_POST["url"];

    $hash = hash('sha256', $password);

    $sql="INSERT INTO empleados (CcorreoFarmacia, NombreEmpleado, Telefono, Contrasena, CorreoPersonal,Rol,UrlEmpleado) VALUES ('$correo', '$nombre', '$numero', '$hash', '$correopersonal','$rol','$url')";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();
?>
