window.onload = () => {

    traerDatos();       

    const form = document.querySelector('form[role="search"]');

    form.addEventListener('submit', (r) => {
        r.preventDefault();
    });

    const ordenar = document.querySelectorAll('.busqueda');

    let ultimaDireccion = 'ASC';

    ordenar.forEach(botones => {
        botones.addEventListener('click', function(e) {
            const buscar = e.target.value;
            const padre = e.target.parentNode;
        
            var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.setAttribute("width", "16");
            svgElement.setAttribute("height", "16");
            svgElement.setAttribute("fill", "currentColor");
            svgElement.setAttribute("viewBox", "0 0 16 16");
        
            var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("fill-rule", "evenodd");
        
            svgElement.appendChild(pathElement);
        
            if (ultimaDireccion === 'ASC') {
                svgElement.setAttribute("class", "bi bi-arrow-up"); 
                pathElement.setAttribute("d", "M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z");
        
            } else if (ultimaDireccion === 'DESC') {
                svgElement.setAttribute("class", "bi bi-arrow-down");
                pathElement.setAttribute("d", "M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z");
        
            }
        
            // Eliminar el elemento SVG anterior, si existe
            if (padre.querySelector('svg')) {
                padre.removeChild(padre.querySelector('svg'));
            }
        
            padre.appendChild(svgElement);
        
            vaciarDatos();
            const direccion = ultimaDireccion === 'ASC' ? 'DESC' : 'ASC'; // alterna la dirección de ordenamiento
            traerDatos(buscar, direccion); // incluye la dirección en la llamada a la función
            ultimaDireccion = direccion; // actualiza la variable global
        })
        
    });

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
    
    const busqueda = document.querySelector('#busqueda');
    
    const buscarMed = (datos) => {
        
        var url = `http://localhost/OuterPharma/App/BaseDatos/buscarProducto.php?datos=${datos}`;
        
        return fetch(url)
        .then(response => response.json())
        .then(medicamentos => {return medicamentos; })
        .catch(e => {console.error("ERROR: ", e.message)});
    }

    const mostrar = document.querySelector("#cn");

    mostrar.onkeyup = () => {
        mostrarMedicamento(mostrar.value)
    }
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
                        if(resultadoApi.fotos===undefined){
                            carta('http://localhost/OuterPharma/App/assets/pastillica.webp',element[i].NombreProducto, element[i].CodigoNacional, element[i].Cantidad, element[i].Precio, element[i].presMedica, element[i].pActivo, element[i].Laboratorio, element[i].vAdmin);
                        }else{
                            carta(resultadoApi.fotos[0].url, element[i].NombreProducto, element[i].CodigoNacional, element[i].Cantidad, element[i].Precio, element[i].presMedica, element[i].pActivo, element[i].Laboratorio, element[i].vAdmin);
                        }
                    });
                    
                }
    
            })
    
        }
        
    };
}

async function traerDatos(orden, direc) {
    try {
        const res = await fetch(`http://localhost/OuterPharma/App/BaseDatos/devInfo.php?orden=${orden}&direccion=${direc}`);
        const resultado = await res.json();

        for (const inventario of resultado) {
            console.log(inventario);
            
            const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${inventario.CodigoNacional}`);
            const resultadoApi = await resApi.json();


            if(resultadoApi.fotos===undefined){
                carta('http://localhost/OuterPharma/App/assets/pastillica.webp',inventario.NombreProducto, inventario.CodigoNacional, inventario.Cantidad, inventario.Precio, inventario.presMedica, inventario.pActivo, inventario.Laboratorio, inventario.vAdmin);
                // carta('http://localhost/OuterPharma/App/assets/pastillica.webp',inventario.NombreProducto, inventario.CodigoNacional, inventario.Cantidad, inventario.Precio);
            }else{
                carta(resultadoApi.fotos[0].url, inventario.NombreProducto, inventario.CodigoNacional, inventario.Cantidad, inventario.Precio, inventario.presMedica, inventario.pActivo, inventario.Laboratorio, inventario.vAdmin);
                // carta(resultadoApi.fotos[0].url, inventario.NombreProducto, inventario.CodigoNacional, inventario.Cantidad, inventario.Precio);
            }
            
        }
    } catch (error) {
        console.error(error);
    }
}

function borrar(e){

    var codigo = e.target.closest(".carta").dataset.codigo;
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

function cartaBonita(foto, nombre, cn, cant, precio, pres, pAct, Lab, vAd){
    let divPrincipal = document.querySelector(".datos");

    // Creación de la carta principal
    let card = document.createElement("div");
    card.classList.add("carta");
    card.dataset.name = nombre; // Añadir el dataset de nombre
    card.dataset.codigo = cn; // Añadir el dataset de codigo

    // Creación de la carta por delante
    let cardF = document.createElement("div");
    cardF.classList.add("front", "face");
    

    // Crear el div que contiene la imagen
    let image = document.createElement("div");
    image.classList.add("drug-card__image")

    // Crear la imagen 
    let img = new Image();
    img.src = foto;
    img.classList.add('imagen_foto');

    image.appendChild(img); // Meter la imagen en el div
    cardF.appendChild(image); // Meter el div de la imagen en el div de la carta

    // Poner el nombre del medicamento
    let name = document.createElement("div");
    name.classList.add("drug-card__name");
    var nom = nombre.split(" ")[0];
    name.appendChild(document.createTextNode(nom));

    cardF.appendChild(name); // Meter el nombre en la carta

    // Hacer los recuadros 
    let datos = document.createElement("div");
    datos.classList.add("drug-card__datos")

    // Meterle el codigo nacional
    let recuadro1 = document.createElement("div"); // Crear div del dato
    recuadro1.classList.add("one-third");
    let CN = document.createElement("div"); // Contenido del dato
    CN.classList.add("dato_num")
    CN.appendChild(document.createTextNode(cn)); // Meter el texto
    let CNt = document.createElement("div"); // Contenido del dato
    CNt.classList.add("dato")
    CNt.appendChild(document.createTextNode("C. Nacional")); // Meter el texto
    recuadro1.appendChild(CN); // Meter el texto en el div del dato
    recuadro1.appendChild(CNt); // Meter el texto en el div del dato
    datos.appendChild(recuadro1); // Meter el dato en el div de los tres datos

    // Meterle el Stock nacional
    let recuadro2 = document.createElement("div"); // Crear div del dato
    recuadro2.classList.add("one-third");
    let Stock = document.createElement("div"); // Contenido del dato
    Stock.classList.add("dato_num")
    Stock.appendChild(document.createTextNode(cant)); // Meter el texto
    let Stockt = document.createElement("div"); // Contenido del dato
    Stockt.classList.add("dato")
    Stockt.appendChild(document.createTextNode("Stock")); // Meter el texto
    recuadro2.appendChild(Stock); // Meter el texto en el div del dato
    recuadro2.appendChild(Stockt); // Meter el texto en el div del dato
    datos.appendChild(recuadro2); // Meter el dato en el div de los tres datos

    // Meterle el Precio nacional
    let recuadro3 = document.createElement("div"); // Crear div del dato
    recuadro3.classList.add("one-third");
    let Precio = document.createElement("div"); // Contenido del dato
    Precio.classList.add("dato_num")
    Precio.appendChild(document.createTextNode(precio)); // Meter el texto
    let Preciot = document.createElement("div"); // Contenido del dato
    Preciot.classList.add("dato")
    Preciot.appendChild(document.createTextNode("Precio")); // Meter el texto
    recuadro3.appendChild(Precio); // Meter el texto en el div del dato
    recuadro3.appendChild(Preciot); // Meter el texto en el div del dato
    datos.appendChild(recuadro3); // Meter el dato en el div de los tres datos

    cardF.appendChild(datos);

    let cardB = document.createElement("div");
    cardB.classList.add("back", "face");
    // cardB.appendChild(document.createTextNode(nombre));
    let cardCont = document.createElement("div");
    cardCont.classList.add("contenedor");

    let pPresc = document.createElement("div");
    let presPro = document.createTextNode("Prescripcion: " + pres)
    pPresc.classList.add('info_parrafo', 'small');
    pPresc.appendChild(presPro);
    cardCont.appendChild(pPresc);
        
    let pActivo = document.createElement("div");
    let activoPro = document.createTextNode("P.Activo: " + pAct)
    pActivo.classList.add('info_parrafo', 'small');
    pActivo.appendChild(activoPro);
    cardCont.appendChild(pActivo);

    let pLab = document.createElement("div");
    let labPro = document.createTextNode("Laboratorio: " + Lab)
    pLab.classList.add('info_parrafo', 'small');
    pLab.appendChild(labPro);
    cardCont.appendChild(pLab);

    let pVia = document.createElement("div");
    let viaPro = document.createTextNode("Vía: " + vAd)
    pVia.classList.add('info_parrafo', 'small');
    pVia.appendChild(viaPro);
    cardCont.appendChild(pVia);

    let botonBorrar = document.createElement("input");
    botonBorrar.classList.add("info_botonBorrar", "btn", "btn-rounded");
    botonBorrar.type = "button";
    botonBorrar.value = "Borrar";

    botonBorrar.addEventListener('click', function(e){
        borrar(e);
    });

    cardB.appendChild(cardCont);
    cardB.appendChild(botonBorrar);

    card.appendChild(cardF);
    card.appendChild(cardB);

    // let carta = document.createElement("div")
    // carta.classList.add("carta")

    // carta.appendChild(card)
    divPrincipal.appendChild(card); // Meter la carta en el div de datos

    divPrincipal.addEventListener('click', (e) => {
        var div = e.target.closest(".carta");
        div.classList.toggle('clicked');
    })
}

function carta(foto, nombre, cn, cant, precio, pres, pAct, lab, vAd) {

    let divPrincipal = document.querySelector(".datos");

    let carta = document.createElement("article");
    carta.classList.add("carta");
    carta.dataset.name = nombre; // Añadir el dataset de nombre
    carta.dataset.codigo = cn; // Añadir el dataset de codigo


    let temp = document.createElement("div");
    temp.classList.add("temporary_text");
    var nom = nombre.split(" ")[0];
    temp.appendChild(document.createTextNode(nom));
    

    let img = new Image();
    img.src = foto;
    img.classList.add('imagen_foto');

    temp.appendChild(img);

    carta.appendChild(temp)

    let content = document.createElement("div");
    content.classList.add("card_content");

    let title = document.createElement("span");
    title.classList.add('card_title');
    title.appendChild(document.createTextNode("Codigo Nacional"));
    content.appendChild(title);

    let subtitle = document.createElement("span");
    subtitle.classList.add('card_subtitle');
    subtitle.appendChild(document.createTextNode(cn));
    content.appendChild(subtitle);

    let Cantidad = document.createElement("p");
    Cantidad.classList.add('card_description');
    Cantidad.appendChild(document.createTextNode("Stock: " + cant));
    content.appendChild(Cantidad);

    let Precio = document.createElement("p");
    Precio.classList.add('card_description');
    Precio.appendChild(document.createTextNode("Precio: " + precio + "euros"));
    content.appendChild(Precio);

    let Pres = document.createElement("p");
    Pres.classList.add('card_description');
    Pres.appendChild(document.createTextNode("Prescipcion médica: " + pres));
    content.appendChild(Pres);

    let PAct = document.createElement("p");
    PAct.classList.add('card_description');
    PAct.appendChild(document.createTextNode("Principio activo: " + pAct));
    content.appendChild(PAct);

    let Lab = document.createElement("p");
    Lab.classList.add('card_description');
    Lab.appendChild(document.createTextNode("Laboratorio: " + lab));
    content.appendChild(Lab);

    let VAd = document.createElement("p");
    VAd.classList.add('card_description');
    VAd.appendChild(document.createTextNode("Via de administración: " + vAd));
    content.appendChild(VAd);

    // Create a new button element
    let button = document.createElement('button');

    // Set the class of the button element
    button.className = 'noselect';

    // Create the first span element and set its class and text content
    let textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = 'Delete';

    // Create the second span element and set its class
    let iconSpan = document.createElement('span');
    iconSpan.className = 'icon';

    // Create the SVG element and set its attributes
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');

    // Create the path element and set its attribute
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z');

    // Append the path element to the SVG element
    svg.appendChild(path);

    // Append the SVG element to the icon span element
    iconSpan.appendChild(svg);

    // Append the two span elements to the button element
    button.appendChild(textSpan);
    button.appendChild(iconSpan);

    button.addEventListener('click', function(e){
        borrar(e);
    });

    // Add the button element to the DOM (replace "parent" with the appropriate parent element)
    content.appendChild(button);

    // let botonBorrar = document.createElement("input");
    // botonBorrar.classList.add("info_botonBorrar", "btn", "btn-rounded");
    // botonBorrar.type = "button";
    // botonBorrar.value = "Borrar";

    // botonBorrar.addEventListener('click', function(e){
    //     borrar(e);
    // });

    // content.appendChild(botonBorrar)

    carta.appendChild(content);

    divPrincipal.appendChild(carta); 

}

function vaciarDatos() {
    let datos = document.querySelector(".datos");

    while (datos.hasChildNodes()) {
        datos.removeChild(datos.firstChild);
    }
}

async function insertarProducto(cn){
    const medicamentoExistente = await comprobarMedicamento(cn);
     
        const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`);
        const resultadoApi = await resApi.json();

        let nombre = resultadoApi.nombre;
        let pactivo = resultadoApi.pactivos;
        let laboratorio = resultadoApi.labtitular;
        let vAdmin = resultadoApi.viasAdministracion[0].nombre;
        let pres = resultadoApi.cpresc;

        if(pres == "Sin Receta") {
            pres = 'N';
        } else {
            pres = 'S';
        }

        
        let Precio;
        let stock;
        
        if (medicamentoExistente) {
            const { value: formValues } = await Swal.fire({
                title: 'Stock a añadir del medicamento',
                html:
                '<input id="swal-input2" type="number" class="swal2-input" placeholder="Stock">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        stock = document.getElementById('swal-input2').value,
                    ]
                }
            })
        } else {
            const { value: formValues } = await Swal.fire({
                title: 'Precio y Stock a añadir del medicamento',
                html:
                '<input id="swal-input1" type="number" class="swal2-input" placeholder="Precio">' + 
                '<input id="swal-input2" type="number" class="swal2-input" placeholder="Stock">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        Precio = document.getElementById('swal-input1').value,
                        stock = document.getElementById('swal-input2').value
                    ]
                }
            })
        }
        

        if (medicamentoExistente) {
            fetch(`http://localhost/OuterPharma/App/BaseDatos/añadirStock.php?cn=${cn}&stock=${stock}`);
        } else {
            fetch(`http://localhost/OuterPharma/App/BaseDatos/insertarProductos.php?cn=${cn}&nombre=${nombre}&pactivo=${pactivo}&lab=${laboratorio}
            &via=${vAdmin}&pres=${pres}&precio=${Precio}&stock=${stock}`);
        }
        
    
    vaciarDatos();
    traerDatos(); 
}

function borrarProducto(cn){ 

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

async function comprobarMedicamento(cn){
    const response = await fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php');
    const elementos = await response.json();
    let coincidencia = false;
    elementos.forEach(elemento => {
        if (cn == elemento.CodigoNacional) {
            coincidencia = true;
        }
    });
    return coincidencia;
}

function mostrarMedicamento(cn) {
    let datos = document.querySelector(".pedirCN")

    datos.removeChild(datos.lastChild)
    let dato = document.createElement("div");
    dato.classList.add("medicamento")

    if (cn.length < 6) {
        dato.classList.add("noMedic");
        dato.appendChild(document.createTextNode("Ponga todos los numeros del Codigo Nacional"));
    } else {
        fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`)
        .then(res=>res.json())
        .then(resultadoApi=>{
            console.log(resultadoApi);

            let nombre = document.createElement("p")
            nombre.classList.add("nombreMed")
            nombre.appendChild(document.createTextNode(resultadoApi.nombre));
            dato.appendChild(nombre);

            let img = new Image();

            if(resultadoApi.fotos===undefined){
                img.src = 'http://localhost/OuterPharma/App/assets/pastillica.webp';
            }else{
                img.src = resultadoApi.fotos[0].url;
            }
            img.classList.add('imagen_foto');

            dato.appendChild(img);

        });
    }

    datos.appendChild(dato)
}

let formulario = document.querySelector('form[class="codigo"]');

formulario.onsubmit = (e) => {
    e.preventDefault();
    let valorInput = document.querySelector('#cn').value;
    insertarProducto(valorInput);
}
// TODO:Cuando se pone el medicameno en el lector de barra te aparezca el nombre y la foto justo abajo

// TODO: Controlar que si no estan todos los digitos en el campo de codigo de barra no se pinte, diga que no existe y se desabiliten los botones

// TODO: Si existe el medicamento en la base de datos se activan los 2 botones, si no existe se activa el de insertar y si no existe en la api que no se active ninguno