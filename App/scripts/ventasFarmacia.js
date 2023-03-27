
    let formulario=document.querySelector('form');
    
    //Formulario se envia

    formulario.onsubmit=(e)=>{
        e.preventDefault();
        let valorInput=document.querySelector('#AnadirPorCN');
        BuscarMedicamento(valorInput.value);      
    }

    async function BuscarMedicamento(cn) {
        await fetch('http://localhost/OuterPharma/App/BaseDatos/devInventario.php')
        .then(res=>res.json())
        .then(elementos=>{
            elementos.forEach(elemento => {
                
                //si el codigoNacional que ha puesto el usuario existe en la base de datos de la farmacia 
                //y hay existencias se añade a la lista para vender
                if (elemento.CodigoNacional==cn&& elemento.Cantidad>0) {
                   
                    fetch(`https://cima.aemps.es/cima/rest/medicamento?cn=${elemento.CodigoNacional}`)
                    .then(res=>res.json())
                    .then(resultadoApi=>{
                        if(resultadoApi.fotos===undefined){
                            PintarTabla('sin datos',resultadoApi.nombre,elemento.CodigoNacional,elemento.Precio,elemento.Cantidad);
                        }else{
                            PintarTabla(resultadoApi.fotos[0].url,resultadoApi.nombre,elemento.CodigoNacional,elemento.Precio,elemento.Cantidad);
                        }
                        
                    });
                    
                }else{
                    console.log('No existe en base datos');
                }
                
            });
        })
    }
   


    function PintarTabla(Urlfoto,Nombre,CN,Precio,cantidadMaxima) {
        let tabla=document.querySelector('#venta');
        let fila=document.createElement('tr');
        let colfoto=document.createElement('td');
        colfoto.classList.add('fotoProducto');
        let nombre=document.createElement('td');
        let CodigoNacional=document.createElement('td');
        let financiacion=document.createElement('td');
        financiacion.classList.add('financiacion');
        let precio=document.createElement('td');
        precio.classList.add('precio')
        let cantidad=document.createElement('td');
        cantidad.classList.add('cantidad');
        let total=document.createElement('td');
        total.classList.add('total');
        let foto=document.createElement('img');
        
        financiacion.innerHTML=`<select>
        <option value="0">sin financiacion</option>
        <option value="0.1">10%</option>
        <option value="0.3">30%</option>
        <option value="0.4">40%</option>
        <option value="0.5">50%</option>
        <option value="0.7">70%</option>
        </select>`;
        foto.src=Urlfoto;
        colfoto.appendChild(foto);
        nombre.appendChild(document.createTextNode(Nombre));
        CodigoNacional.appendChild(document.createTextNode(CN));
        precio.appendChild(document.createTextNode(Precio));
        cantidad.innerHTML=`<input type="number" value="1" step="1" min="1" max="${cantidadMaxima}" />`;
        total.appendChild(document.createTextNode(Precio*cantidad.textContent));
        fila.appendChild(colfoto);
        fila.appendChild(nombre);
        fila.appendChild(CodigoNacional);
        fila.appendChild(financiacion);
        fila.appendChild(precio);
        fila.appendChild(cantidad);
        fila.appendChild(total);
        tabla.appendChild(fila);
        ActualizarPrecio();
    }

    function ActualizarPrecio() {
        let financiacion=document.querySelectorAll('.financiacion');
        let precio=document.querySelectorAll('.precio');
        let cantidad=document.querySelectorAll('.cantidad');
        let total=document.querySelectorAll('.total');
        let preciototal=[];
        for (let i = 0; i < financiacion.length; i++) {
            let valor=(cantidad[i].firstChild.value*precio[i].textContent)-(precio[i].textContent*financiacion[i].firstChild.value);
            preciototal.push(valor.toFixed(2)+' Euros')
            
        }
        
        total.forEach((element,i)=>{
           element.innerHTML='';
           element.appendChild(document.createTextNode(preciototal[i]));
        })

        document.querySelectorAll('select,input[type="number"]').forEach(element=>{
            element.onchange=()=>{
                
                ActualizarPrecio();
            };
        });
    }
