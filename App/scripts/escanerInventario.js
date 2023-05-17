let boton=document.querySelector('#codigoBarra');
    
function Activar(params) {
    
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: document.querySelector('#Escaner')
        },
        decoder : {
            readers : ["ean_reader"]
        }
        }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Lector de códigos de barras iniciado correctamente");
            Quagga.start();
        });
        
            Quagga.onDetected(function(result) {
            
                // insertarProducto(result.codeResult.code.substring(6,12));
                const mostrar = document.querySelector("#cn");
                mostrar.value = result.codeResult.code.substring(6,12);

                const estaDisponible = comprobarMedicamento(mostrar.value);

                if (estaDisponible) {
                    insertarProducto(mostrar.value);
                } else {
                    insertarNoApi(mostrar.value)
                }
                // const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
                // mostrar.dispatchEvent(enterKeyEvent);
                // const aniadir = document.querySelector("#aniadir");
                // aniadir.click();
                
                resetear();
            });
        document.querySelector('#Escaner').style.position='relative';
}

boton.addEventListener('click', function() {
    if (!boton.classList.contains('Active')) {
        Activar();
        boton.classList.add('Active');
    }else{
        boton.classList.remove('Active');
        EliminarCodigoBarra(); 
    }
})
    


function EliminarCodigoBarra() {
    Quagga.offDetected();
    Quagga.stop();
    document.querySelector('#Escaner').innerHTML='';
    document.querySelector('#Escaner').style.position='absolute';
}

function resetear() {
    Quagga.offDetected();
    Quagga.stop(); 
    Activar();  
}