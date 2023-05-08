    <?php
    session_start();
        require('./conexionDB.php');

        if (isset($_POST['email']) && isset($_POST['password'])) {

            $email=$_POST['email'];
            
            $password=$_POST['password'];

            $sql="SELECT * from farmacias where Ccorreo='$email'";

            $pdo->exec("SET NAMES utf8");

            $sth=$pdo->prepare($sql);
            
            $sth->execute();

            $fila=$sth->fetch();

            //Hacer la logica de si la sesion esta abierta, 2 opciones que se cierre la sesion y se habra otra, o que al abrir otra pestaña se inicie sesion solo y te mesutre los usuario solos
            
            if ($sth->rowCount()==1 && password_verify($password,$fila['Contrasenia'])){
                //Idea: que cada sesion se genere con un nombre identificativo de cada farmacia, en este caso el correo
                $_SESSION['CorreoFarmacia']=$fila['Ccorreo'];
                header('Location: ../selecPerfil.php');
            }else {
                // correo electrónico incorrecto
                $_SESSION['error'] = "El correo electrónico o la contraseña son incorrectos.";
                header('Location: ../index.php');
            }
        }
    ?>