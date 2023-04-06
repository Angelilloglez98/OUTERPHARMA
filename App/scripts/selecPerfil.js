window.onload=()=>{

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        Pintar(document.querySelector('.contenedorUser'),element.nombre,element.UrlEmpleado)

        function Pintar(elemento, mensaje,url){
            
            let div=document.createElement('div');
            div.classList.add('user');
            let imgPerfil=document.createElement('img');
            imgPerfil.src=url;
            let p=document.createElement('p');
            let texto=document.createTextNode(mensaje);
            p.appendChild(texto);
            div.appendChild(imgPerfil);
            div.appendChild(p);
            
            elemento.appendChild(div);
    
            imgPerfil.addEventListener('click',()=>{
                pintarContrasena(div);
            })
        }
    
        function pintarContrasena(elemento) {
            eliminarForms();
            let form =document.createElement("form");
            let inputPassword=document.createElement('input');
            let button=document.createElement('input');
            button.classList.add('btn','btn-check');
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
            if (contrasenaReal===contrasenaInput){
                if (rol==='Admin') {
                    localStorage.setItem("password",contrasenaReal)
                    location.replace('./InicioAdmin.html');
                }else{
                    location.replace('./Inicio.html');
                }
                localStorage.setItem('perfil',element.nempleado);
            }
            
        }
    }));
}