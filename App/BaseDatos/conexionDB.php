<?php

    $dsn = 'mysql:host=localhost;port=3306;dbname=outerpharma';
    $username = 'root';
    $password = '';

    try {
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');
    } catch (PDOException $e) {
        echo $e->getMessage();
        die();
    }

?>