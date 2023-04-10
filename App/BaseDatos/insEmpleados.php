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
    // Hasheamos la contraseña utilizando el algoritmo Bcrypt
    $hash = hash('sha256', $password);

    $sql="INSERT INTO empleados (CcorreoFarmacia, NombreEmpleado, Telefono, Contrasena, CorreoPersonal,Rol) VALUES ('$correo', '$nombre', '$numero', '$hash', '$correopersonal','$rol')";

    $pdo->exec("SET NAMES 'utf8mb4'");

    $sth=$pdo->prepare($sql);

    $sth->execute();
?>
