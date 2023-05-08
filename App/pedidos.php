<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css"/>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href='https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="styles/header.css">
    <script src="scripts/header.js"></script>
    <script src="scripts/pedidos.js"></script>
    <link rel="stylesheet" href="./styles/pedidos.css">
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
                  <a href="ventas.php" class="nav_link"> <i class='bx bxs-dollar-circle nav_icon'></i> <span class="nav_name">Ventas</span></a> 
                  <a href="inventario.php" class="nav_link"> <i class='bx bxs-box nav_icon'></i> <span class="nav_name">Inventario</span> </a>
                  <a href="pedidos.php" class="nav_link active"> <i class='bx bx-search nav_icon'></i> <span class="nav_name">Buscador</span> </a>
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
        <div class="bg-light mt-5 buscadorMed container-fluid">
            <h4>Buscador</h4>

            <div class="input-group rounded">
                <input type="search" class="form-control rounded" placeholder="Buscar" aria-label="Search" aria-describedby="search-addon" />
                <span class="input-group-text border-0" id="search-addon">
                    <i class='bx bx-search'></i>
                </span>
                <select id="filtro">
                    <option value="nombre">Nombre</option>
                    <option value="cn">Codigo Nacional</option>
                    <option value="vtm">Principip Activo</option>
                </select>
            </div>
            <div class="mt-3 contenedor">

               <table id="myTable" class="display">
                    <thead >
                        <tr>
                            <th class="imgNone">#</th>
                            <th >Nombre</th>
                            <th class="sobra">Laboratorio</th>
                            <th >Prescripcion</th>
                            <th >Docs</th>
                            <th >Via Administracion</th>
                            <th class="sobra">Forma</th>
                            <th class="sobra">Principio activo</th>
                        </tr>
                    </thead>
                    <tbody id="buscarMed">
                    </tbody>
               </table>

            </div>

        </div>

    </body>
</html>