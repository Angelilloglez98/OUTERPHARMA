<?php
session_start();
    if (!isset($_SESSION['CorreoFarmacia'])) {
        header('Location: ./index.php');
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OuterPharma</title>

    <!-- css -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href='https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="styles/header.css">
    <link rel="stylesheet" href="styles/Inicio.css">
    <link rel="stylesheet" href="./styles/editarPerfil.css">

    <!-- script -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.1/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="scripts/graficoLineal.js" defer></script>
    <script src="scripts/graficoCircular.js" defer></script>
    <script src="scripts/LaboratoriosTop.js"></script>
    <script src="scripts/header.js"></script>
    <script src="scripts/historialDiario.js" defer></script>
    <script src="scripts/ProductosCasiAgotados.js" defer></script>
    <script src="./scripts/editarPerfil.js" defer></script>

</head>

<body id="body-pd">
    <a href="mailto:perxasgmail.com"><Button class="BotonEnviarEmail"><span class="material-symbols-outlined">mail</span></Button></a>
    <header class="header" id="header">
        <div class="emergenteEditarUser activo mt-5"></div>
        <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
        <div class="header_img"> </div>
    </header>
    <div class="l-navbar" id="nav-bar">
      <nav class="nav">
          <div> 
            <a href="Inicio.php" class="nav_logo"> <img src="assets/logo.png" class="outerpharma"> <span class="nav_logo-name">OuterPharma</span> </a>
              <div class="nav_list">
                  <a href="Inicio.php" class="nav_link active"> <i class='bx bxs-home-alt-2 nav_icon'></i> <span class="nav_name">Inicio</span> </a>
                  <a href="ventas.php" class="nav_link"> <i class='bx bxs-dollar-circle nav_icon'></i> <span class="nav_name">Ventas</span></a> 
                  <a href="inventario.php" class="nav_link"> <i class='bx bxs-box nav_icon'></i> <span class="nav_name">Inventario</span> </a>
                  <a href="pedidos.php" class="nav_link"> <i class='bx bx-search nav_icon'></i> <span class="nav_name">Buscador</span> </a>
                  <a href="proveedores.php" class="nav_link"> <i class='bx bxs-user nav_icon'></i> <span class="nav_name">Proveedores</span> </a>
                  <a href="historialVentas.php" class="nav_link"> <i class='bx bxs-credit-card nav_icon'></i> <span class="nav_name">Historial Ventas</span> </a> 
                </div>
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
          </div> 
          <a href="#" class="nav_link salir"> <i class='bx bx-log-out nav_icon'></i> <span class=" signOut d-flex align-items-center"></span> </a>
      </nav>
    </div>
    <!--Container Main start-->
    <div class="bg-light mt-5">
      <div class="height-100 bg-light">
          <div class="container-fluid">
              <div class="row column-gap-3 row-gap-3 gap-0 rounded">
                <div class="contenedorTitulo">
                  <h2 class='titulo'>Inicio</h2>
                </div>
                

                <div class="p-2 col-sm-4">
                  <h4>Laboratorios top</h4>
                    <table class="table table-striped tablas">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody id="TablaLaboratorios">
                    </tbody>
                  </table>
                </div>
                
                <div class="p-2 col-sm-7">
                  <h4>Productos top</h4>
                  <form action="BaseDatos/devProductosMasVendidos.php" method="GET">
                    <select name="fecha" class="selectFecha">
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                    
                  </form>
                  <canvas id="graficoCircular"></canvas>
                </div>
                <div class="p-2 col-sm-7">
                  <h4>Compras Ventas</h4>
                  <canvas id="myChart"></canvas>
                </div>
                <div class="p-2 col-sm-4" style="position: relative;">
                  <h4>Historial diario</h4>
                  <table class="table table-striped tablas">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody id="TablaHistorial">

                    </tbody>
                  </table>
                </div>
                <div class="col-12 carousel-container">
                  <div class="carousel">

                  </div>
                  <div class="carousel-btn prev-btn"><</div>
                  <div class="carousel-btn next-btn">></div>
                </div>
              </div>
            </div>
      </div>
  </div>
    <!--Container Main end-->
</body>
</html>