<?php

    $dsn = 'mysql:host=localhost;port=3306;dbname=outerpharma';
    $username = 'root';
    $password = '';
   

    try {
        $pdo = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        echo $e->getMessage();
        die();
    }

?>