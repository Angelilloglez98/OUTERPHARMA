<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="scripts/gestionUsuario.js"></script>
    <link rel="stylesheet" href="styles/gestionUser.css">
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link href='https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css' rel='stylesheet'>
    <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="styles/header.css">
    <script src="scripts/header.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body id="body-pd">
    <a href="mailto:perxasgmail.com"><Button class="BotonEnviarEmail"><span class="material-symbols-outlined">mail</span></Button></a>
    <header class="header" id="header">
        <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
        <div class="header_img"> </div>
    </header>
    <div class="l-navbar" id="nav-bar">
    <nav class="nav">
          <div> <a href="Inicio.php" class="nav_logo"> <img src="assets/logo.png" class="outerpharma"> <span class="nav_logo-name">OuterPharma</span> </a>
              <div class="nav_list"> <a href="Inicio.php" class="nav_link"> <i class='bx bxs-home-alt-2 nav_icon'></i> <span class="nav_name">Inicio</span> </a>
                  <a href="ventas.php" class="nav_link"> <i class='bx bxs-dollar-circle nav_icon'></i> <span class="nav_name">Ventas</span></a> 
                  <a href="inventario.php" class="nav_link"> <i class='bx bxs-box nav_icon'></i> <span class="nav_name">Inventario</span> </a>
                  <a href="pedidos.php" class="nav_link"> <i class='bx bx-search nav_icon'></i> <span class="nav_name">Buscador</span> </a>
                  <a href="proveedores.php" class="nav_link"> <i class='bx bxs-user nav_icon'></i> <span class="nav_name">Proveedores</span> </a>
                  <a href="historialVentas.php" class="nav_link"> <i class='bx bxs-credit-card nav_icon'></i> <span class="nav_name">Historial Ventas</span> </a> </div>
                  <?php
                    require('./BaseDatos/conexionDB.php');
                    session_start();
                    $numeroEmpleado=$_SESSION['nEmpleado'];
                    $sql="SELECT Rol FROM empleados WHERE nEmpleado=:nEmpleado";

                    $sth = $pdo->prepare($sql);
                    $sth->bindParam(':nEmpleado', $_SESSION['nEmpleado']);
                    $sth->execute();
                    $rolUsuario=$sth->fetch();
                    
                    if ($rolUsuario['Rol']=='Admin') {
                        echo '<a href="gestionUsuarios.php" class="nav_link active"> <i class="bx bxs-id-card nav_icon"></i> <span class="nav_name">Gestion de usuarios</span> </a>';
                    }        
                  ?>
          </div> <a href="#" class="nav_link salir"> <i class='bx bx-log-out nav_icon'></i> <span class=" signOut d-flex align-items-center"></span> </a>
      </nav>
    </div>
    <div class="bodyUser">
        <div class="usuario">
            <div class="contenedor">

                <div class="contenedorUser">
                    
                </div>

                <div class="add">
                    
                </div>
            </div>
        </div>
        
    </div>
</body>
</html>