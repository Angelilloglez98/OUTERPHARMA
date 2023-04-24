
let imagen = document.querySelector(".header_img")

let nempleado = localStorage.getItem("nEmpleado")
let nombre = localStorage.getItem("nombre")
let rol = localStorage.getItem("rol")
let correo = localStorage.getItem("correo")
console.log(correo);

imagen.addEventListener("click", function(){
    let ventana = document.querySelector(".emergenteEditarUser")
    ventana.classList.toggle("activo")
    if (ventana.classList.contains("activo")) {
        ventana.style.transform="translateY(0px)";
    }else{
        ventana.style.transform="translateY(500px)";

    }
    ventana.innerHTML=pintarForm(nombre,rol,correo)

})

function pintarForm(nombre,rol,correo,telefono) {
    const formulario = `<div class="contenedorEditarUsuario">
    <div class="contenedorImagenUser">
        <div class="imagenUser">
            <img src="./assets/A1.png" alt="" width=100%>
        </div>
    </div>
    <div class="contenerdorDatosUser">
        <div class="datosArriba">
            <div class="nombre">
                <input type="text" name="nombre" value="${nombre}" disabled>
            </div>
            <div class="rol">
            <input type="text" name="rol" value="${rol}" disabled>
            </div>
        </div>
        <div class="datosAbajo">
            <div class="correo">
                <input type="text" name="correo" value="${correo}" disabled>
                <img src="./assets/edit.svg" alt="" width=10%>
            </div>
            <div class="telefono">
                <input type="number" name="telefono" value="${telefono}" disabled>
                <img src="./assets/edit.svg" alt="" width=10%>
            </div>
            <div class="password">
                <input type="password" name="password" value="*********" disabled>
                <img src="./assets/edit.svg" alt="" width=10%>
            </div>
        </div>  
    </div>
    </div>`;
    return formulario;

}