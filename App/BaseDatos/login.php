    <?php
        require('./conexionDB.php');

        if (isset($_POST['email']) && isset($_POST['password'])) {

            $email=$_POST['email'];
            
            $password=$_POST['password'];

            $sql="SELECT * from farmacias where Ccorreo='$email'";

            $pdo->exec("SET NAMES utf8");

            $sth=$pdo->prepare($sql);
            
            $sth->execute();

            $fila=$sth->fetch();

            // $hash = hash('sha256', $password);
            session_start();
            if ($sth->rowCount()==1 && $password==$fila['Contrasenia']){
                //$auth = password_verify($password, $fila['Contraseina']);
                //contraseña y usuario correctos
                
                $_SESSION['CorreoFarmacia']=$fila['Ccorreo'];
                header('Location: ../selecPerfil.html');
            }else {
                // correo electrónico incorrecto
                $_SESSION['error'] = "El correo electrónico o la contraseña son incorrectos.";
                header('Location: ../index.php');
            }
        }
    ?>