window.onload=()=>{

    fetch('BaseDatos/devEmpleados.php')
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
                ComprobarContrasena(inputPassword.value,element.rol,element.nEmpleado);
            }
            form.onsubmit=(e)=>{
                e.preventDefault();
                ComprobarContrasena(inputPassword.value,element.rol,element.nEmpleado);
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
    
        function ComprobarContrasena(contrasenaInput,rol,nEmpleado) {

            let pass = {'password':contrasenaInput};
            comprobarPass(pass,nEmpleado).then(result=>{
                if (result=="true") {
                    localStorage.setItem('nombre',element.nombre);
                    localStorage.setItem('rol',element.rol);
                    localStorage.setItem('correo',element.correopersonal);
                    localStorage.setItem("telefono",element.telefono)
                    localStorage.setItem("imagen",element.UrlEmpleado)
                    localStorage.setItem('perfil',element.nempleado);
                    localStorage.setItem("password",contrasenaInput)
                    if (rol==='Admin') {
                        location.replace('./Inicio.php');
                    }else{
                        location.replace('./Inicio.php');
                    }
                    
                } else {
                    console.log("error");
                }}
            )
   
        }
    }));

    //Parte de Juanjo

    const comprobarPass=async(password,nEmpleado)=>{
        var datos = {
            datos1: password,
            datos2: nEmpleado
        }
        const option={
          method:"POST",
          redirect:"follow",
          body:JSON.stringify(datos),
          Headers:{
            "Accept":"application/json"
          }
        }
        return fetch("BaseDatos/comprobarperfil.php",option)
        .then(response=>response.text())
        .then(result=>{return result})
        .catch(e=>{console.error("ERROR:" , e.message)})
      }


}