let formularios=document.querySelector('#formularios');
let btnregistrar=document.querySelector('#moverRegister');
let btnLogin=document.querySelector('#moverLogin');

btnregistrar.onclick=()=>{
    console.log('caca');
    activarRegistrar();
}
btnLogin.onclick=()=>{
    activarLogin();
}


function activarRegistrar() {
    formularios.style.transform='translateX(-50%)';    
}

function activarLogin() {
    formularios.style.transform='translateX(0)';
}

