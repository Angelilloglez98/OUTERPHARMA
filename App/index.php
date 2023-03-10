<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/Login.css">
    <script src="./scripts/Login.js" defer></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    <script type="text/javascript">
      emailjs.init('NqWx-4tcJJczGTE9p')
    </script>

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
        <div class="formularios" id="formularios">
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
          
          <form id="form">
             <h2>Contactanos</h2>
            <div class="field">
              <label for="from_name">Nombre</label>
              <input type="text" name="from_name" id="from_name">
            </div>
            <div class="field">
              <label for="message">mensaje</label>
              <input type="text" name="message" id="message">
            </div>
            <div class="field">
              <label for="user_email">email</label>
              <input type="text" name="user_email" id="user_email">
            </div>
            
            <input type="submit" id="button" value="Send Email">

            <p><label for="" id="moverLogin" class="parrafoP">Volver</label></p>
          </form>

        </div>
      </section>
      
    </div>
  </div>
  <script src="../App/scripts/enviaremail.js"></script>
</body>
