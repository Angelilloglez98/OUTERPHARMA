window.onload=()=>{
    


    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        
        Pintar(document.querySelector('.contenedorUser'),element.nombre)
    }));


    function Pintar(elemento, mensaje) {
        let div=document.createElement('div');
        div.classList.add('user');
        let p=document.createElement('p');
        let texto=document.createTextNode(mensaje);
        p.appendChild(texto);
        div.appendChild(p);
        elemento.appendChild(div);

        p.addEventListener('click',()=>{
            pintarContrasena(div);
        })
    }

    function pintarContrasena(elemento) {
        eliminarForms();
        let form=document.createElement('form');
        let inputPassword=document.createElement('input');
        inputPassword.type='password';
        form.appendChild(inputPassword);
        elemento.appendChild(form);    
    }

    function eliminarForms(){
        let users=document.querySelectorAll('.user');
        
        users.forEach(element => {
            let users=document.querySelector('.user>form');
            element.removeChild(users);
        });
    }

    function ComprobarContrasena(contrasenaReal,contrasenaInput) {
        if (contrasenaReal===contrasenaInput) {
            return true;
        }
        return false;
    }
}


