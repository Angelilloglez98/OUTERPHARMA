<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link href='https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css' rel='stylesheet'>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <link rel="stylesheet" href="styles/header.css">
        <link rel="stylesheet" href="styles/inventario.css">
        <script src="scripts/inventario.js" defer></script>
        <script src="scripts/escanerInventario.js" defer></script>
        <script src="scripts/header.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        
    </head>
    <body id="body-pd">
        <a href="mailto:perxasgmail.com"><Button class="BotonEnviarEmail"><span class="material-symbols-outlined">mail</span></Button></a>
        <header class="header" id="header">
            <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
            <div class="header_img"></div>
        </header>
        <div class="l-navbar" id="nav-bar">
            <nav class="nav">
                <div> <a href="Inicio.php" class="nav_logo"> <img src="assets/logo.png" class="outerpharma"> <span class="nav_logo-name">OuterPharma</span> </a>
                    <div class="nav_list"> <a href="Inicio.php" class="nav_link"> <i class='bx bxs-home-alt-2 nav_icon'></i> <span class="nav_name">Inicio</span> </a>
                        <a href="ventas.php" class="nav_link"> <i class='bx bxs-dollar-circle nav_icon'></i> <span class="nav_name">Ventas</span></a> 
                        <a href="inventario.php" class="nav_link active"> <i class='bx bxs-box nav_icon'></i> <span class="nav_name">Inventario</span> </a>
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
                              echo '<a href="gestionUsuarios.php" class="nav_link"> <i class="bx bxs-id-card nav_icon"></i> <span class="nav_name">Gestion de usuarios</span> </a>';
                          }        
                        ?>
                </div> <a href="#" class="nav_link salir"> <i class='bx bx-log-out nav_icon'></i> <span class=" signOut d-flex align-items-center"></span> </a>
            </nav>
        </div>
        <!--Container Main start-->
        <div class="bg-light mt-5">
            <h4>Inventario</h4>
            <div class="cambiarForma">
                <div id="Escaner" class="viewport"></div>
            </div>
            <nav class="navbar bg-body-tertiary">
                <div class="container">
                  <form role="search">
                    <input id="busqueda" class="form-control input me-2" type="search" placeholder="Search" aria-label="Search">
                    <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
                    <p>Ordenar por:</p>
                    <div class="wrapper d-flex align-items-center btn ">
                        <input type="button" value="Nombre" class="btn btn-rounded busqueda">
                    </div>
                    
                    <div class="wrapper d-flex align-items-center btn ms-5">
                        <input type="button" value="Precio" class="btn btn-rounded busqueda">
                    </div>
                  </form>
                  
                </div>
            </nav>
            <div class="w-100">
                <div class="">
                    <div class="row gap-3 fit">
                        <div class="col-9">
                            <div class="row datos">
                                
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row">
                                <div class="col-12 pedirCN d-flex flex-column align-items-center">
                                    <form class="codigo" role="search" action="">
                                        <input id="cn" class="cN input form-control me-2" type="search" name="CodigoNacional" placeholder="Codigo de barra" aria-label="Search">
                                        <input type="button" value="" id="codigoBarra" class="botonverde ">
                                    </form> 
                                </div>
                                <div class="col-12 btn-group d-flex align-items-center" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" class="btn-check" name="funcion" id="insertar" autocomplete="off">
                                    <label class="btn btn-outline-success" for="insertar">+</label>
                                  
                                    <input type="radio" class="btn-check" name="funcion" id="borrar" autocomplete="off">
                                    <label class="btn btn-outline-danger" for="borrar">-</label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
              </div>
        </div>
        <!--Container Main end-->
    </body>
</html>