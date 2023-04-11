document.addEventListener("DOMContentLoaded", function (event) {

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    function BuscarEmpleados() {
        fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
            .then(res => res.json())
            .then(resultados => {
                resultados.forEach(element => {
                    console.log(element);
                    AsignarFotoPerfil(element.nEmpleado,element.UrlEmpleado);
                    AsignarSignOut(element.nEmpleado,element.nombre)
                });
            });
    }
    BuscarEmpleados();
    function AsignarFotoPerfil(nEmpleado,urlImagen) {
        let perfilActivo = localStorage.getItem('perfil');
        if (perfilActivo == nEmpleado) {
            let imagen = document.createElement('img');
            imagen.src = urlImagen;
            document.querySelector('.header_img').appendChild(imagen);
            return;
        }
    }
    

    function AsignarSignOut(nEmpleado,nombre) {
        let perfilActivo = localStorage.getItem('perfil');
        if (perfilActivo == nEmpleado) {
            let p = document.createElement('p');
            p.classList.add('m-0');
            p.appendChild(document.createTextNode(nombre));
            document.querySelector('.signOut').appendChild(p);
            return;
        }
    }

    document.querySelector('.signOut').closest('.nav_link').onclick=()=>{
        Swal.fire({
            title: 'Cerrar Sesión',
            text: "Estas seguro de cerrar sesion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
                location.replace('./selecPerfil.html');
            }
          })
        
    }
});


