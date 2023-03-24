window.onload = () => {

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        Pintar(document.querySelector('.contenedorUser'), element.nombre,element.rol)
        document.querySelectorAll(".edit").forEach(resultado =>{
            resultado.addEventListener("click", function(elemento) {
                ventanaEmergente(elemento.path[2].innerText,resultado.rol);
                console.log(elemento);
                
            });
        })
    }));
    
    function ventanaEmergente(nombre) {
        let div = document.createElement('div');
        div.setAttribute("id","emergente");
        div.classList.add("emergente");
        let pName = document.createElement('p');
        let txtName = document.createTextNode("Nombre:");
        pName.appendChild(txtName);
        div.appendChild(pName);
        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.value = nombre;
        div.appendChild(inputName); 
        let pNacimiento = document.createElement('p');
        let txtNacimiento = document.createTextNode("Fecha de nacimiento:");
        pNacimiento.appendChild(txtNacimiento);
        div.appendChild(pNacimiento);
        let inputNacimiento = document.createElement("input");
        inputNacimiento.classList.add("inputs");
        div.appendChild(inputNacimiento);


        let buttonAccept = document.createElement('button')
        let buttonCancel = document.createElement('button')
        console.log(nombre);
        document.body.appendChild(div);
    }

    function Pintar(elemento, nombre, rol) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let texto = document.createTextNode(nombre);
        let beli = document.createElement('button');
        let bedi = document.createElement('button');
        let trash = document.createElement('i');
        let edit = document.createElement('i');

        beli.appendChild(trash);
        bedi.appendChild(edit);
        p.appendChild(texto);
        p.appendChild(beli);
        p.appendChild(bedi);
        div.appendChild(p);
        elemento.appendChild(div);
        
        trash.classList.add("bx", "bxs-trash");
        edit.classList.add("bx", "bxs-edit");
        beli.setAttribute("class", "delete");
        bedi.setAttribute("class", "edit");

        trash.addEventListener("click", function() {
        });
        
        
        
    }

    
}