window.onload=()=>{

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        Pintar(document.querySelector('.contenedorUser'),element.nombre)
        
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
            let form =document.createElement("form");
            let inputPassword=document.createElement('input');
            let button=document.createElement('input');
            button.type='button';
            button.value='Enviar';
            inputPassword.type='password';
            form.appendChild(inputPassword);
            form.appendChild(button);
            button.onclick=()=>{
                ComprobarContrasena(element.contrasena,inputPassword.value,element.rol);
            }
            form.onsubmit=(e)=>{
                e.preventDefault();
                ComprobarContrasena(element.contrasena,inputPassword.value,element.rol);
            }
                
            
            
            elemento.appendChild(form);
                
        }
    
        function eliminarForms(){
            let users = document.querySelectorAll('.user');
            
            users.forEach(user => {
                let forms = user.querySelectorAll('form');
                forms.forEach(form => {
                form.remove();
                });
            });
            
        }
    
        function ComprobarContrasena(contrasenaReal,contrasenaInput,rol) {
            if (contrasenaReal=== contrasenaInput){
                if (rol==='Admin') {
                    location.replace('./InicioAdmin.html');
                }else{
                    location.replace('./Inicio.html');
                }
            }else{
                
            }
            
        }
    }));
}