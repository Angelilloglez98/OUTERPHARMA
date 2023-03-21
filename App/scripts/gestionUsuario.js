window.onload = () => {

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
    .then(response => response.json())
    .then(registro => registro.forEach(element => {
        Pintar(document.querySelector('.contenedorUser'), element.nombre)
    }));

    function Pintar(elemento, mensaje) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let texto = document.createTextNode(mensaje);
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
        beli.setAttribute("id", "delete");
        bedi.setAttribute("id", "edit");

        trash.addEventListener("click", function() {
            // Redirigir a la página de eliminar
            window.location.href = "gestionEliminar.html";
        });
        
        edit.addEventListener("click", function(element) {
            ventanaEmergente();

        });
    }

    function ventanaEmergente() {
        let div = document.createElement('div');
        div.setAttribute("id","emergente");
        div.classList.add("emergente");
        let pName = document.createElement('p');
        let txtName = document.createTextNode("Nombre:");
        pName.appendChild(txtName);
        div.appendChild(pName);
        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.value = "hola"
        div.appendChild(inputName);
        let pFarmacia = document.createElement('p');
        let txtFarmacia = document.createTextNode("Farmacia:");
        pFarmacia.appendChild(txtFarmacia);
        div.appendChild(pFarmacia);
        let inputFarmacia = document.createElement("input");
        inputFarmacia.type = "text";
        inputFarmacia.value = "Farmacia";
        div.appendChild(inputFarmacia);
        let pRol = document.createElement('p');
        let txtRol = document.createTextNode("Cargo:");
        pRol.appendChild(txtRol);
        div.appendChild(pRol);
        

        
        document.body.appendChild(div);
    }
}