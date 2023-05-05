<?php
session_start();
    if (!isset($_SESSION['CorreoFarmacia'])) {
        header('Location: ./index.php');
    }
?>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link href='https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css' rel='stylesheet'>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
        <script src="./Library/quagga.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <link rel="stylesheet" href="styles/header.css">
        <link rel="stylesheet" href="styles/ventas.css">
        <script src="scripts/ventasFarmacia.js" defer></script>
        <script src="scripts/header.js"></script>
        <script src="scripts/Escaner.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script src="./scripts/editarPerfil.js" defer></script>
        <link rel="stylesheet" href="./styles/editarPerfil.css">
    </head>
    
    <body id="body-pd">
        <a href="mailto:perxasgmail.com"><Button class="BotonEnviarEmail"><span class="material-symbols-outlined">mail</span></Button></a>
        <header class="header" id="header">
            <div class="emergenteEditarUser activo mt-5">
            
            </div>
            <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
            <div class="header_img"> </div>
        </header>
        <div class="l-navbar" id="nav-bar">
        <nav class="nav">
          <div> <a href="Inicio.php" class="nav_logo"> <img src="assets/logo.png" class="outerpharma"> <span class="nav_logo-name">OuterPharma</span> </a>
              <div class="nav_list"> <a href="Inicio.php" class="nav_link"> <i class='bx bxs-home-alt-2 nav_icon'></i> <span class="nav_name">Inicio</span> </a>
                  <a href="ventas.php" class="nav_link active"> <i class='bx bxs-dollar-circle nav_icon'></i> <span class="nav_name">Ventas</span></a> 
                  <a href="inventario.php" class="nav_link"> <i class='bx bxs-box nav_icon'></i> <span class="nav_name">Inventario</span> </a>
                  <a href="pedidos.php" class="nav_link"> <i class='bx bx-search nav_icon'></i> <span class="nav_name">Buscador</span> </a>
                  <a href="proveedores.php" class="nav_link"> <i class='bx bxs-user nav_icon'></i> <span class="nav_name">Proveedores</span> </a>
                  <a href="historialVentas.php" class="nav_link"> <i class='bx bxs-credit-card nav_icon'></i> <span class="nav_name">Historial Ventas</span> </a> </div>
                  <?php
                    require('./BaseDatos/conexionDB.php');
                    $numeroEmpleado=$_SESSION['nEmpleado'];
                    $sql="SELECT Rol FROM empleados WHERE nEmpleado=:nEmpleado";

                    $sth = $pdo->prepare($sql);
                    $sth->bindParam(':nEmpleado', $_SESSION['nEmpleado']);
                    $sth->execute();
                    $rolUsuario=$sth->fetch();
                    
                    if ($rolUsuario['Rol']=='Admin') {
                        echo '<a href="gestionUsuarios.php" class="nav_link"> <i class="bx bxs-id-card nav_icon"></i> <span class="nav_name">Gestion de usuarios</span> </a>';
                    }        
                  ?>
          </div> <a href="#" class="nav_link salir"> <i class='bx bx-log-out nav_icon'></i> <span class=" signOut d-flex align-items-center"></span> </a>
      </nav>
        </div>
       
        <!--Container Main start-->
         
        <div class="height-100 bg-light mt-5">
            <h1>Ventas</h1>
            <div class="cambiarForma">
                <div id="Escaner" class="viewport"></div>
            </div>
            <div class="contenedor">
                <div>
                    <h4>Codigo Nacional</h4>
                    <form>
                        <input type="text" name="" id="AnadirPorCN" class="input input-group-sm">
                        <input type="submit" value="+" class="botonverde">
                        <input type="button" value="" id="codigoBarra" class="botonverde ">
                    </form> 
                    <input type="text" placeholder="Dinero recibido" class="input input-group-sm dinero">
                </div>
                <div class="ventana row">
                    <div class="col-12">
                        <table class="table">
                            <thead>
                                <tr class="filaVenta">
                                    <th></th>
                                    <th class="fotoProducto">Foto</th>
                                    <th>Nombre</th>
                                    <th class="cn">CN</th>
                                    <th>Financiación</th>
                                    <th>Precio venta</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody id="venta">
                                
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="realizarVenta">
                    <form action="">
                    <input type="button" class=" btn btn-primary botonverde venta" data-toggle="modal" value="Realizar Venta"  id="BotonVender">
                    <p class="devuelta"></p>
                    <input type="text" class="total" value="" disabled>
                </form>
                </div>
            </div>
        </div>
    </body>
</html>