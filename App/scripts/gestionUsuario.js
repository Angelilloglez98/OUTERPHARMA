window.onload=()=>{

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        Pintar(document.querySelector('.contenedorUser'),element.nombre)
        let add = document.querySelector("#add");
        let del = document.querySelector("#delete");
        let edit = document.querySelector("#edit");

        
        function Pintar(elemento, mensaje) {
            let div=document.createElement('div');
            div.classList.add('user');
            let p=document.createElement('p');
            let texto=document.createTextNode(mensaje);
            p.appendChild(texto);
            div.appendChild(p);
            elemento.appendChild(div);

            p.addEventListener('click',()=>{
                console.log("hola");
            })
            
        }

        function pintarRol(elemento) {

            

            let inputRol=document.createElement('input');
            inputRol.type='radio';
            inputRol.value='usuario'
            inputRol.name="rol"
            inputRol.id = 'usuarios';
            elemento.appendChild(inputRol);
            const label1 = document.createElement('label');
            label1.htmlFor = 'usuario';
            label1.appendChild(document.createTextNode('usuario'));
            element.body.appendChild(label1);
            let inputRol2=document.createElement('input');
            inputRol2.type='radio';
            inputRol2.value='administrador'
            inputRol2.name="rol"
            inputRol2.id = 'administradors';
            elemento.appendChild(inputRol2); 
            const label2 = document.createElement('label');
            label2.htmlFor = 'administrador';
            label2.appendChild(document.createTextNode('admin'));
            element.body.appendChild(label2);
        }
    
    }));

    add.onclick=()=>{console.log("hola");}
        add.addEventListener('click',()=>{
            console.log("hola");
        })
        del.addEventListener('click',()=>{
            pintarRol(div);
        })
        edit.addEventListener('click',()=>{
            pintarRol(div);
        })


 
}