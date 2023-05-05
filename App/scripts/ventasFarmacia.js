cargarDatos();
let formulario = document.querySelector('form');

formulario.onsubmit = (e) => {
    e.preventDefault();
    let valorInput = document.querySelector('#AnadirPorCN');
    BuscarMedicamento(valorInput.value);
    guardarLocalStorage();
}

async function BuscarMedicamento(cn) {
    let existe=false;
    let filaExistente;
    await fetch('./BaseDatos/devInventario.php')
        .then(res => res.json())
        .then(elementos => {
            elementos.forEach(elemento => {

                //si el codigoNacional que ha puesto el usuario existe en la base de datos de la farmacia 
                //y hay existencias se añade a la lista para vender
                if (elemento.CodigoNacional == cn && elemento.Cantidad > 0) {
                    
                    fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${elemento.CodigoNacional}`)
                        .then(res => res.json())
                        .then(resultadoApi => {

                            let filas = document.querySelectorAll("#venta > tr ");
                            
                            filas.forEach(element => {
                                let Cns = element.querySelector('.cn')
                                
                                if (Cns.textContent == cn) {
                                    existe=true
                                    filaExistente=element.querySelector('.cantidad> input');
                                }
                            });


                            if (existe && parseInt(filaExistente.value)<parseInt(elemento.Cantidad)) {
                                filaExistente.value++;
                                ActualizarPrecioFila();
                                actualizarPrecioTotal();
                            }else if(existe && parseInt(filaExistente.value)==parseInt(elemento.Cantidad)){
                                
                                return;
                            }else{
                                if (resultadoApi.fotos === undefined) {
                                    PintarTabla('sin datos', resultadoApi.nombre, elemento.CodigoNacional, elemento.Precio, elemento.Cantidad);
                                } else {
                                    PintarTabla(resultadoApi.fotos[0].url, resultadoApi.nombre, elemento.CodigoNacional, elemento.Precio, elemento.Cantidad);
                                }
                            }

                        });

                } else {
                    console.log('No existe en base datos');
                }

            });
        })
}


function PintarTabla(Urlfoto, Nombre, CN, Precio, cantidadMaxima,CantidadActual) {
    let tabla = document.querySelector('#venta');
    let fila = document.createElement('tr');
    fila.classList.add('filaVenta')
    let colfoto = document.createElement('td');
    colfoto.classList.add('fotoProducto');
    let nombre = document.createElement('td');
    nombre.classList.add('nombre');
    let CodigoNacional = document.createElement('td');
    CodigoNacional.classList.add('cn');
    let financiacion = document.createElement('td');
    financiacion.classList.add('financiacion');
    let precio = document.createElement('td');
    precio.classList.add('precio')
    let cantidad = document.createElement('td');
    cantidad.classList.add('cantidad');
    let total = document.createElement('td');
    total.classList.add('totalfila');
    let foto = document.createElement('img');
    let papeleratd=document.createElement('td');
    let papeleraDiv=document.createElement('div');
    papeleratd.appendChild(papeleraDiv);
    papeleratd.classList.add('containerPapelera');
    papeleraDiv.classList.add('papelera');
    financiacion.innerHTML = `<select>
        <option value="1">sin financiacion</option>
        <option value="0.9">10%</option>
        <option value="0.7">30%</option>
        <option value="0.6">40%</option>
        <option value="0.5">50%</option>
        <option value="0.3">70%</option>
        </select>`;
    foto.src = Urlfoto;
    colfoto.appendChild(foto);
    nombre.appendChild(document.createTextNode(Nombre));
    CodigoNacional.appendChild(document.createTextNode(CN));
    precio.appendChild(document.createTextNode(Precio));
    let valorCantidad;
    if (CantidadActual!==undefined) {
        valorCantidad=CantidadActual;
    }else{
        valorCantidad=1;
    }
    cantidad.innerHTML = `<input type="number" value="${valorCantidad}" step="1" min="1" max="${cantidadMaxima}" />`;
    total.appendChild(document.createTextNode(Precio * cantidad.textContent));
    fila.appendChild(papeleratd);
    fila.appendChild(colfoto);
    fila.appendChild(nombre);
    fila.appendChild(CodigoNacional);
    fila.appendChild(financiacion);
    fila.appendChild(precio);
    fila.appendChild(cantidad);
    fila.appendChild(total);
    tabla.appendChild(fila);

    document.querySelectorAll('.papelera').forEach(papelera=>{
        papelera.addEventListener('click',(e)=>{
            EliminarFila(e.target.closest('tr'));
            
        });
    })

    ActualizarPrecioFila();
    actualizarPrecioTotal();
    guardarLocalStorage();
    
}


function actualizarPrecioTotal() {
    let total = document.querySelector('.total');
    total.disabled=true;
    total.style.textAlign='center';
    let totales = document.querySelectorAll('.totalfila');
    let sumatorio = 0;
    totales.forEach(costeFila => {
        sumatorio += parseFloat(costeFila.textContent);
    });
    total.value = sumatorio.toFixed(2);
}

function ActualizarPrecioFila() {
    
    let financiacion = document.querySelectorAll('.financiacion');
    let precio = document.querySelectorAll('.precio');
    let cantidad = document.querySelectorAll('.cantidad');
    let total = document.querySelectorAll('.totalfila');
    let preciototal = [];

    for (let i = 0; i < financiacion.length; i++) {
        let valor = (cantidad[i].firstChild.value * precio[i].textContent) *  financiacion[i].firstChild.value;
        preciototal.push(valor.toFixed(2))
    }

    total.forEach((element, i) => {
        element.innerHTML = '';
        element.appendChild(document.createTextNode(preciototal[i]));
    })

    document.querySelectorAll('select,input[type="number"]').forEach(element => {
        element.onchange = () => {

            ActualizarPrecioFila();
            actualizarPrecioTotal();
        };
    });
    guardarLocalStorage();
}

function devuelta() {
    document.querySelector('.devuelta').innerHTML='';
    let inputVuelta=parseFloat(document.querySelector('.dinero').value);
    let total=parseFloat(document.querySelector('.total').value);
    if (!isNaN(total)){
        if (inputVuelta>=total){
            let totaldevuelto=inputVuelta-total;
            document.querySelector('.devuelta').appendChild(document.createTextNode(totaldevuelto.toFixed(2)+' Euros'));
        }else{
            document.querySelector('.devuelta').appendChild(document.createTextNode('No hay suficiente dinero'));
        }
    }
}

document.querySelector('.dinero').onchange=()=>{devuelta()}

function EliminarFila(tr) {
    tr.remove();
    actualizarPrecioTotal();
    guardarLocalStorage();
}

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

function VenderProductos() {

    let filas = document.querySelectorAll("#venta > tr");
    let Productos=[];
    let PrecioTotalFactura;
    filas.forEach(fila=>{

        let cn=fila.querySelector('.cn').textContent;
        let cantidad=fila.querySelector('.cantidad >input').value;
        fetch(`./BaseDatos/QuitarStock.php?cantidad=${cantidad}&CodigoNacional=${cn}`);
        
    })

    filas.forEach(fila=>{
        let cn=fila.querySelector('.cn').textContent;
        let cantidad=fila.querySelector('.cantidad >input').value;
        let pvp=fila.querySelector('.precio').textContent;
        let TotalFila=fila.querySelector('.totalFila').textContent;
        
        let productosJson={
            CodigoNacional:cn,
            PVP:pvp,
            precioFila:TotalFila,
            Cantidad:cantidad,
        }
        Productos.push(productosJson);
        PrecioTotalFactura=document.querySelector('.total').value;
        
    })
    let nEmpleado=localStorage.getItem('perfil');
    
    fetch(`./BaseDatos/anadirVenta.php?Productos=${JSON.stringify(Productos)}&nEmpleado=${nEmpleado}&PTotal=${PrecioTotalFactura}`)

    filas.forEach(fililla=>{
        EliminarFila(fililla);
    })
}

function guardarLocalStorage() {
    localStorage.setItem("ProductosVenta",'');
    let tr=document.querySelectorAll('#venta > tr');
    let productos=[];
    tr.forEach(fila=>{
        let tdfoto=fila.querySelector('.fotoProducto');
        let tdNombre=fila.querySelector('.nombre');
        let tdCn=fila.querySelector('.cn');
        let tdFinanciacion=fila.querySelector('.financiacion');
        let tdPrecioVenta=fila.querySelector('.precio');
        let tdCantidad=fila.querySelector('.cantidad');
        let tdTotal=fila.querySelector('.totalfila');
        let jsonProducto={
            fotourl:tdfoto.querySelector('img').src,
            nombre:tdNombre.textContent,
            cn:tdCn.textContent,
            financiacion:tdFinanciacion.querySelector('select').value,
            precio:tdPrecioVenta.textContent,
            cantidad:tdCantidad.querySelector('input').value,
            total:tdTotal.textContent
        }
        productos.push(jsonProducto);
    });
    localStorage.setItem("ProductosVenta",JSON.stringify(productos));
}

function cargarDatos() {

    let jsonFilas=JSON.parse(localStorage.getItem('ProductosVenta'));
    if (jsonFilas !== null){
        jsonFilas.forEach(fila=>{
            PintarTabla(fila.fotourl,fila.nombre,fila.cn,fila.precio,100,fila.cantidad);
        })
    }
}