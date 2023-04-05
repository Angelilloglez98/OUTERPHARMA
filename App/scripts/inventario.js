window.onload = () => {

    traerDatos();       

    const form = document.querySelector('form[role="search"]');

    form.addEventListener('submit', (r) => {
        r.preventDefault();
    });
    
    const busqueda = document.querySelector('#busqueda');
    
    const buscarMed = (datos) => {
        
        var url = `http://localhost/OuterPharma/App/BaseDatos/buscarProducto.php?datos=${datos}`;
        
        return fetch(url)
        .then(response => response.json())
        .then(medicamentos => {return medicamentos; })
        .catch(e => {console.error("ERROR: ", e.message)});
    }

    const btnInsertar = document.getElementById('insertar');
    const btnBorrar = document.getElementById('borrar');
    const codigoNacional = document.getElementById('cn');

    btnInsertar.addEventListener('click', function() {
        // Verificar si el botón de insertar está seleccionado
        if (btnInsertar.checked) {
            const codigo = codigoNacional.value;
            // Ejecutar la función de insertar
            insertarProducto(codigo);
        }
      });
      
      btnBorrar.addEventListener('click', function() {
        // Verificar si el botón de borrar está seleccionado
        if (btnBorrar.checked) {
            const codigo = codigoNacional.value;
            // Ejecutar la función de borrar
            borrarProducto(codigo);
        }
      });

    busqueda.onkeydown =  (event) => {

        if (event.key === 'Enter' && busqueda.value != '') {
    
            const tbody = document.querySelector("#buscarMed");
    
            var datos = busqueda.value;
            busqueda.value = "";
          
            buscarMed(datos).then((element) => {
    
                console.log(element);
                for (const i in element) {
                    fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${element[i].CodigoNacional}`)
                    .then(res=>res.json())
                    .then(resultadoApi=>{
                        vaciarDatos();
                        pintarDatos(resultadoApi.fotos[0].url,element[i].CodigoNacional, element[i].NombreProducto, element[i].Cantidad, element[i].Precio)
                    });
                    
                }
    
            })
    
        }
        
    };

    document.querySelector('#BotonVender').addEventListener('click',()=>{

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
        title: 'Realizar Venta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vender',
        cancelButtonText: 'cancelar',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            VenderProductos();
            swalWithBootstrapButtons.fire(
                'Vendido',
                'Los productos han sido vendidos',
                'success'
            )
        }
        })
    })
}

async function traerDatos() {
    try {
        const res = await fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php');
        const resultado = await res.json();

        for (const inventario of resultado) {
            
            console.log(inventario);
            const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${inventario.CodigoNacional}`);
            const resultadoApi = await resApi.json();

            if (resultadoApi.fotos === undefined) {
                pintarDatos('sin datos', inventario.CodigoNacional, inventario.NombreProducto, inventario.Cantidad, inventario.Precio);
            } else {
                pintarDatos(resultadoApi.fotos[0].url, inventario.CodigoNacional, inventario.NombreProducto, inventario.Cantidad, inventario.Precio);
            }
        }
    } catch (error) {
        console.error(error);
    }
}


function pintarDatos(foto, cn, nombre, cant, precio){

    let datos = document.querySelector(".datos");
    let medicamentos = document.createElement("div");
    medicamentos.classList.add("my-2", "col-3", "mx-4", "p-3", "medicamentos");
    medicamentos.dataset.name = nombre;
    medicamentos.dataset.codigo = cn;

    let medicamento = document.createElement("div");
    medicamento.classList.add("medicamento");

    let pFoto = new Image();
    pFoto.src = foto;
    pFoto.classList.add('imagen_foto');

    let pNombre = document.createElement("p");
    pNombre.classList.add('info_parrafo');
    let nombrePro = document.createTextNode(nombre)
    pNombre.appendChild(nombrePro);

    let pCn = document.createElement("p");
    pCn.classList.add('info_parrafo');
    let cnPro = document.createTextNode("CN: " + cn); 
    pCn.appendChild(cnPro);

    let pCantidad = document.createElement("p");
    let cantidadPro = document.createTextNode("Stock: " + cant)
    pCantidad.classList.add('info_parrafo');
    pCantidad.appendChild(cantidadPro); 

    let pPrecio = document.createElement("p");
    let precioPro = document.createTextNode("Precio: " + precio + "Euros")
    pPrecio.classList.add('info_parrafo');
    pPrecio.appendChild(precioPro);

    let botonBorrar = document.createElement("input");
    botonBorrar.classList.add("info_botonBorrar");
    botonBorrar.type = "button";
    botonBorrar.value = "Borrar";

    botonBorrar.addEventListener('click', function(e){
        borrar(e);
    });  

    medicamentos.appendChild(pFoto);
    medicamentos.appendChild(pNombre);
    medicamentos.appendChild(pCn);
    medicamentos.appendChild(pCantidad);
    medicamentos.appendChild(pPrecio);
    medicamentos.appendChild(botonBorrar);

    medicamentos.addEventListener('click', function(e){
        recibir(e);
    });

    

    datos.appendChild(medicamentos);
}

function borrar(e){

    var codigo = e.target.closest(".medicamentos").dataset.codigo;
    var cantidad;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Stock a borrar',
        icon: 'warning',
        showCancelButton: true,
        input: 'number',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'cancelar',
        inputValidator: (value) => {
            if(!value) {
                return 'Escribe una cantidad por favor';
            }
            cantidad = value;
        },
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            swalWithBootstrapButtons.fire(
                'Borrado',
                'Los productos han sido borrados correctamente',
                'success'
              )
            fetch(`http://localhost/OuterPharma/App/BaseDatos/QuitarStock.php?CodigoNacional=${codigo}&cantidad=${cantidad}`)
            vaciarDatos();
            traerDatos();
            
        }
      })

      
}

function pintarDatosCaja(foto, nombre, cn, cant, precio, pres, pAct, Lab, vAd){
    let datos = document.querySelector(".devDatos");
    datos.innerHTML="";
    let medicamentos = document.createElement("div");
    medicamentos.classList.add("medicamento");
    
    let imagen = document.createElement("div");
    imagen.classList.add("medicamento_imagen");

    let info = document.createElement('div');
    info.classList.add('medicamento_info');

    let pFoto = new Image();
    pFoto.src = foto;
    pFoto.classList.add('imagen_foto');

    let pNombre = document.createElement("p");
    pNombre.classList.add('info_parrafo', 'small');
    let nombrePro = document.createTextNode(nombre)
    pNombre.appendChild(nombrePro);

    let pCn = document.createElement("p");
    pCn.classList.add('info_parrafo', 'small');
    let cnPro = document.createTextNode("CN: " + cn)
    pCn.appendChild(cnPro);

    let pCantidad = document.createElement("p");
    let cantidadPro = document.createTextNode("Stock: " + cant)
    pCantidad.classList.add('info_parrafo', 'small');
    pCantidad.appendChild(cantidadPro); 

    let pPrecio = document.createElement("p");
    let precioPro = document.createTextNode("Precio: " + precio + " Euros")
    pPrecio.classList.add('info_parrafo', 'small');
    pPrecio.appendChild(precioPro);

    let pPresc = document.createElement("p");
    let presPro = document.createTextNode("Prescripcion: " + pres)
    pPresc.classList.add('info_parrafo', 'small');
    pPresc.appendChild(presPro);
        
    let pActivo = document.createElement("p");
    let activoPro = document.createTextNode("P.Activo: " + pAct)
    pActivo.classList.add('info_parrafo', 'small');
    pActivo.appendChild(activoPro);

    let pLab = document.createElement("p");
    let labPro = document.createTextNode("Laboratorio: " + Lab)
    pLab.classList.add('info_parrafo', 'small');
    pLab.appendChild(labPro);

    let pVia = document.createElement("p");
    let viaPro = document.createTextNode("Vía: " + vAd)
    pVia.classList.add('info_parrafo', 'small');
    pVia.appendChild(viaPro);

    medicamentos.appendChild(pFoto);
    medicamentos.appendChild(pNombre);
    medicamentos.appendChild(pCn);
    medicamentos.appendChild(pCantidad);
    medicamentos.appendChild(pPrecio);
    medicamentos.appendChild(pPresc);
    medicamentos.appendChild(pActivo);
    medicamentos.appendChild(pLab);
    medicamentos.appendChild(pVia);

    info.appendChild(medicamentos);

    imagen.appendChild(pFoto);

    datos.appendChild(imagen)
    datos.appendChild(info);
}

function vaciarDatos() {
    let datos = document.querySelector(".datos");

    while (datos.hasChildNodes()) {
        datos.removeChild(datos.firstChild);
    }
}

function recibir(e){
    if (e.target.classList.contains('info_botonBorrar')) {
        return;
    }

    var nombre = e.target.closest(".medicamentos").dataset.name;
    console.log(nombre);

    fetch(`http://localhost/OuterPharma/App/BaseDatos/devInfo.php?nombre=${nombre}`)
    .then(respuesta=>respuesta.json())
    .then(resultado=>{
        resultado.forEach(med => {
                   
            fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${med.CodigoNacional}`)
            .then(res=>res.json())
            .then(resultadoApi=>{
                if(resultadoApi.fotos===undefined){
                    pintarDatosCaja('sin datos',med.NombreProducto, med.CodigoNacional, med.Cantidad, med.Precio, med.presMedica, med.pActivo, med.Laboratorio, med.vAdmin);
                }else{
                    pintarDatosCaja(resultadoApi.fotos[0].url, med.NombreProducto, med.CodigoNacional, med.Cantidad, med.Precio, med.presMedica, med.pActivo, med.Laboratorio, med.vAdmin);
                }
                
            });
        
    })});
}

function insertarProducto(cn){
    fetch(`http://localhost/OuterPharma/App/BaseDatos/insertarProductos.php?cn=${cn}`)
    vaciarDatos();
    traerDatos(); 
}

function borrarProducto(cn){ 
    console.log(cn);

    var cantidad;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Stock a borrar',
        icon: 'warning',
        showCancelButton: true,
        input: 'number',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'cancelar',
        inputValidator: (value) => {
            if(!value) {
                return 'Escribe una cantidad por favor';
            }
            cantidad = value;
        },
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            swalWithBootstrapButtons.fire(
                'Borrado',
                'Los productos han sido borrados correctamente',
                'success'
              )
            fetch(`http://localhost/OuterPharma/App/BaseDatos/QuitarStock.php?CodigoNacional=${cn}&cantidad=${cantidad}`)
            vaciarDatos();
            traerDatos();
            
        }
      })
}