<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/Login.css">
    <script src="./scripts/Login.js" defer></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&display=swap" rel="stylesheet">
    <title>Login-OuterPharma</title>
</head>
<body>
  <div class="contenedor-grid">
    <div class="corporation">
      <img src="assets/Logo.png" alt="">
      <p for="">OuterPharma<p>
    </div>
    <div class="register-login">
      <section>
        
          <form action="BaseDatos/login.php" method="post" class="Login">
            <h2>Login</h2>
            <div class="email">
              <label for="">Email</label>
              <input type="email" name="email" id="" placeholder="Introduce tu correo electronico">
            </div>
            <div class="password">
              <label for="">Contraseña</label>
              <input type="password" name="password" id="" placeholder="Introduce tu contraseña">
            </div>
            <input type="submit" value="Iniciar Sesion">
            <p for="" id="moverRegister" class="parrafoP">¿No tienes cuenta?</p>
            <P>Llama al<a href="tel:678836981"> 678836981</a> </P>
            <div class="error"> 

            <?php
            session_start();
            if (isset($_SESSION['error'])) {
                echo  $_SESSION['error'];
                unset($_SESSION['error']);
            }
            ?>
            
            </div>
          </form>
      </section>
      
    </div>
  </div>
  <script src="../App/scripts/enviaremail.js"></script>
</body>
