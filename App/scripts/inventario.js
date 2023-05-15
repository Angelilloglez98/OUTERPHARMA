window.onload = () => {

    traerDatos();       

    const form = document.querySelectorAll('form[role="search"]');

    form.forEach( formularios => {
        formularios.addEventListener('submit', (e) => {
            e.preventDefault();
        })
    })

    const ordenar = document.querySelectorAll('.busqueda');

    let ultimaDireccion = 'ASC';

    ordenar.forEach(botones => {
        botones.addEventListener('click', function(e) {
            const buscar = e.target.value;
            const padre = e.target.parentNode;
        
            var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.setAttribute("width", "11");
            svgElement.setAttribute("height", "11");
            svgElement.setAttribute("fill", "#2e2d31");
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
        
        var url = `./BaseDatos/buscarProducto.php?datos=${datos}`;
        
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
    
                // console.log(element);
                for (const i in element) {

                    try {
                        fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${element[i].CodigoNacional}`)
                        .then(res=>res.json())
                        .then(resultadoApi=>{
                            vaciarDatos();
                            if(resultadoApi.fotos===undefined){
                                carta('./assets/pastillica.webp',element[i].NombreProducto, element[i].CodigoNacional, element[i].Cantidad, element[i].Precio, element[i].presMedica, element[i].pActivo, element[i].Laboratorio, element[i].vAdmin);
                            }else{
                                carta(resultadoApi.fotos[0].url, element[i].NombreProducto, element[i].CodigoNacional, element[i].Cantidad, element[i].Precio, element[i].presMedica, element[i].pActivo, element[i].Laboratorio, element[i].vAdmin);
                            }
                        });
                    } catch (error) {
                        vaciarDatos();
                        carta('./assets/pastillica.webp',element[i].NombreProducto, element[i].CodigoNacional, element[i].Cantidad, element[i].Precio, element[i].presMedica, element[i].pActivo, element[i].Laboratorio, element[i].vAdmin);
                    }
                    
                }
    
            })
    
        }
        
    };
}

async function traerDatos(orden, direc) {
    console.log("Hola");
    try {
        const res = await fetch(`./BaseDatos/devInfo.php?orden=${orden}&direccion=${direc}`);
        const resultado = await res.json();

        for (const inventario of resultado) {
            const cn = inventario.CodigoNacional;

            try {
                const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`);
                const resultadoApi = await resApi.json();


                if (resultadoApi.fotos === undefined) {
                    carta('./assets/pastillica.webp', inventario.NombreProducto, cn, inventario.Cantidad, inventario.Precio, inventario.presMedica, inventario.pActivo, inventario.Laboratorio, inventario.vAdmin);
                } else {
                    carta(resultadoApi.fotos[0].url, inventario.NombreProducto, cn, inventario.Cantidad, inventario.Precio, inventario.presMedica, inventario.pActivo, inventario.Laboratorio, inventario.vAdmin);
                }
            } catch (error) {
                carta('./assets/pastillica.webp', inventario.NombreProducto, cn, inventario.Cantidad, inventario.Precio, inventario.presMedica, inventario.pActivo, inventario.Laboratorio, inventario.vAdmin);
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
            fetch(`./BaseDatos/QuitarStock.php?CodigoNacional=${codigo}&cantidad=${cantidad}`)
            vaciarDatos();
            traerDatos();
            
        }
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
    Precio.appendChild(document.createTextNode("Precio: " + precio + "€"));
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
    textSpan.textContent = 'Borrar';

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

    if (!medicamentoExistente) {
        const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`);
        const resultadoApi = await resApi.json();

        var nombre = resultadoApi.nombre;
        var pactivo = resultadoApi.pactivos;
        var laboratorio = resultadoApi.labtitular;
        var vAdmin = resultadoApi.viasAdministracion[0].nombre;
        var pres = resultadoApi.cpresc;

        if(pres == "Sin Receta") {
            pres = 'N';
        } else {
            pres = 'S';
        } 
    }
    
    let precioNumerico;

    precioNumerico = await new Promise((resolve) => {
    PrecioProducto(cn, (resultado) => {
        if (resultado) {
            let tmp = resultado.split(' ');
            let precio = parseFloat(tmp[1]);
            resolve(precio); 
        }

        resolve(resultado)
        
    });
    });
    

    const precio = precioNumerico ?? '';
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
                
            },
            inputValidator: (stock) => {
                if (!stock) {
                    return 'Este campo es obligatorio'
                }
            }
        })
    } else {
        const { value: formValues } = await Swal.fire({
            title: 'Precio y Stock a añadir del medicamento',
            html:
            `<input id="swal-input1" type="number" class="swal2-input" value=${precio}>
            <input id="swal-input2" type="number" class="swal2-input" placeholder="Stock">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    Precio = document.getElementById('swal-input1').value,
                    stock = document.getElementById('swal-input2').value
                ]
            },
            inputValidator: (Precio, stock) => {
                if (!Precio) {
                    return 'Este campo es obligatorio'
                }

                if (!stock) {
                    return 'Este campo es obligatorio'
                }
            }
        })
    }
    

    if (medicamentoExistente) {
        fetch(`./BaseDatos/añadirStock.php?cn=${cn}&stock=${stock}`);
    } else {
        fetch(`./BaseDatos/insertarProductos.php?cn=${cn}&nombre=${nombre}&pactivo=${pactivo}&lab=${laboratorio}
        &via=${vAdmin}&pres=${pres}&precio=${Precio}&stock=${stock}`);
    }   
    
    vaciarDatos();
    traerDatos();
    location.reload();
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
            fetch(`./BaseDatos/QuitarStock.php?CodigoNacional=${cn}&cantidad=${cantidad}`)
            vaciarDatos();
            traerDatos();
            
        }
      })
}

async function comprobarMedicamento(cn){
    let coincidencia = false;
    try {
        const response = await fetch('./BaseDatos/devInventario.php');
        const elementos = await response.json();
        
        elementos.forEach(elemento => {
            if (cn == elemento.CodigoNacional) {
                coincidencia = true;
            }
        });
        return coincidencia;
    } catch (error) {
        return coincidencia;
    }
    
}

async function mostrarMedicamento(cn) {
    console.log("mostrar");
    const estaDisponible = await comprobarMedicamento(cn);
    let datos = document.querySelector(".pedirCN");
    let insertar = document.querySelector("#insertar");
    let borrar = document.querySelector("#borrar");
    insertar.disabled = true;
    borrar.disabled = true;

    datos.removeChild(datos.lastChild)
    let dato = document.createElement("div");
    dato.classList.add("medicamento")
    if (cn.length == 6) {
        if (estaDisponible) {
            try {
                const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`);
                resultadoApi = await resApi.json();
                

                let nombre = document.createElement("p")
                nombre.classList.add("nombreMed")
                nombre.appendChild(document.createTextNode(resultadoApi.nombre));
                dato.appendChild(nombre);

                let img = new Image();

                if(resultadoApi.fotos===undefined){
                    img.src = './assets/pastillica.webp';
                }else{
                    img.src = resultadoApi.fotos[0].url;
                }
                img.classList.add('imagen_foto');

                dato.appendChild(img);

                const res = await fetch(`./BaseDatos/devProducto.php?codigo=${cn}`);
                resultado = await res.json();

                if (resultado[0].Cantidad == 0) {
                    borrar.disabled = true;    
                } else {
                    borrar.disabled = false;
                }
                insertar.disabled = false;
                

            } catch (error) {
                const res = await fetch(`./BaseDatos/devProducto.php?codigo=${cn}`);
                resultado = await res.json();

                let nombre = document.createElement("p")
                nombre.classList.add("nombreMed")
                nombre.appendChild(document.createTextNode(resultado[0].NombreProducto));
                dato.appendChild(nombre);

                let img = new Image();

                img.src = './assets/pastillica.webp';
                img.classList.add('imagen_foto');

                dato.appendChild(img);

                if (resultado[0].Cantidad == 0) {
                    borrar.disabled = true;    
                } else {
                    borrar.disabled = false;
                }
                insertar.disabled = false;
            }
            
        } else {
            try {
                const resApi = await fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${cn}`);
                resultadoApi = await resApi.json();
                

                let nombre = document.createElement("p")
                nombre.classList.add("nombreMed")
                nombre.appendChild(document.createTextNode(resultadoApi.nombre));
                dato.appendChild(nombre);

                let img = new Image();

                if(resultadoApi.fotos===undefined){
                    img.src = './assets/pastillica.webp';
                }else{
                    img.src = resultadoApi.fotos[0].url;
                }
                img.classList.add('imagen_foto');

                dato.appendChild(img);

                insertar.disabled = false;
                borrar.disabled = true;
                

            } catch (error) {
                let nombre = document.createElement("p")
                nombre.classList.add("noMedic")
                nombre.appendChild(document.createTextNode("Este medicamento no existe, por lo cual no se pudo cargar la información del medicamento"));
                let aniadir = document.createElement("button");
                aniadir.appendChild(document.createTextNode("¿Quieres darlo de alta?"))
                aniadir.addEventListener('click', async function() {
                    var nombre;
                    var precio;
                    var pactivo;
                    var laboratorio;
                    var vAdmin;
                    var pres;
                    Swal.fire({
                        title: 'Nombre y Precio del producto a dar de alta',
                        html:
                        `<form class="nuevo d-flex flex-column">
                            <input id="swal-input0" type="number" class="swal2-input" value=${cn} disabled>  
                            <input id="swal-input1" type="text" class="swal2-input" placeholder="Nombre" required>
                            <input id="swal-input2" type="number" class="swal2-input" placeholder="Precio" required>
                            <input id="swal-input3" type="text" class="swal2-input" placeholder="Principio Activo">
                            <input id="swal-input4" type="text" class="swal2-input" placeholder="Laboratorio">
                            <input id="swal-input5" type="text" class="swal2-input" placeholder="Via de Administración"> 
                            <input id="swal-input6" type="text" class="swal2-input" placeholder="Prescripción Médica">
                        </form>`,
                        focusConfirm: false,
                    }).then((result) => {
                        

                        if (result.isConfirmed) {
                            nombre = document.getElementById('swal-input1').value,
                            precio = document.getElementById('swal-input2').value,
                            pactivo = document.getElementById('swal-input3').value,
                            laboratorio = document.getElementById('swal-input4').value,
                            vAdmin = document.getElementById('swal-input5').value,
                            pres = document.getElementById('swal-input6').value

                            if (!validarNombreMed(nombre)) {
                                Swal.showValidationMessage('El nombre es inválido');
                            } else if (!validarNum(precio)) {
                                Swal.showValidationMessage('El precio es inválido');
                            }

                            
                        }

                        if (pactivo) {
                            pactivo = pactivo
                        } else {
                            pactivo = "Sin datos";
                        }
    
                        if (laboratorio) {
                            laboratorio = laboratorio
                        } else {
                            laboratorio = "Sin datos";
                        }
    
                        if (vAdmin) {
                            vAdmin = vAdmin
                        } else {
                            vAdmin = "Sin datos";
                        }
    
                        if (pres) {
                            pres = pres
                        } else {
                            pres = "N";
                        }
    
                        fetch(`./BaseDatos/insertarProductos.php?cn=${cn}&nombre=${nombre}&pactivo=${pactivo}&lab=${laboratorio}
                        &via=${vAdmin}&pres=${pres}&precio=${precio}&stock=${0}`)
                        
                    });

                    
                })
                // Mostrar un mensaje indicando que el medicamento no está disponible
                dato.appendChild(nombre);
                dato.appendChild(aniadir);

                let img = new Image();

                img.src = './assets/pastillica.webp';

                img.classList.add('imagen_foto');

                dato.appendChild(img);
            }
        }

        vaciarDatos();
        traerDatos();
    } else {
        
        dato.classList.add("noMedic");
        dato.appendChild(document.createTextNode("Ponga los numeros correctos del Codigo Nacional"));
    }

    datos.appendChild(dato);
}

const PrecioProducto = async (codigo, callback) => {
    const url = 'https://nomenclator.org/buscar?q='+codigo;


    fetch(url)
    .then(response => {
        return response.text();
    })
    .then(html => {

        const dom = new DOMParser().parseFromString(html, 'text/html');

        const linkElement = dom.querySelector('.search-results > a');
        if (linkElement) {
            const enlace = linkElement.href;
            fetch(enlace)
            .then(response=>{
                return response.text();
            })
            .then(html2=>{
                const dom2 = new DOMParser().parseFromString(html2, 'text/html');
                const markElement = dom2.querySelector('p mark');
                const markTextContent = markElement ? markElement.textContent : null;
                callback(markTextContent);

            })
        } else {
            callback(null);
        }

        
        
    })
    .catch(error => {
        console.error(error);
        callback(null)
    });
}

function validarNombreMed(nombre) {
    let validarN = true;
    // Verificar que el nombre no esté vacío o tenga solo espacios en blanco
    if (!nombre || /^\s*$/.test(nombre)) {
      alert("El nombre no puede estar vacío.");
      validarN = false;
    }

    // Verificar que el nombre contenga de 1 a 3 palabras
    const palabras = nombre.trim().split(/\s+/);
    if (palabras.length > 3) {
      alert("El nombre no puede tener más de 3 palabras.");
      validarN = false;
    }

    // Convertir la primera letra de cada palabra en mayúscula y unir las palabras
    const nombreFormateado = palabras.map(palabra => palabra.charAt(0).toUpperCase());

    if (validarN) {
        return true;

    } else {
        return false;
    }
}

function validarNum(stock) {
    // Verificar si el campo no está vacío
    const expresionRegular = /^[0-9]{1,6}$/;
    if (stock.trim() === '') {
      return false;
    } else {
      return true;
    }
}
let precioProducto;