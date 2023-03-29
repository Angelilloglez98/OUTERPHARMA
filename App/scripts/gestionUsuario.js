window.onload = () => {

    fetch('http://localhost/OuterPharma/App/BaseDatos/devEmpleados.php')
        .then(response => response.json())
        .then(registro => registro.forEach(element => {
            Pintar(document.querySelector('.contenedorUser'), element.nombre, element.correopersonal, element.telefono, element.nempleado)

        }));

    function ventanaEmergente(nombre, correo, telefono,nempleado) {
        let div = document.createElement('div');
        div.setAttribute("id", "emergente");
        div.classList.add("emergente");

        let pName = document.createElement('p');
        let txtName = document.createTextNode("Nombre:");
        pName.appendChild(txtName);
        div.appendChild(pName);
        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.value = nombre;
        div.appendChild(inputName);
        let p4 = document.createElement('p');
        let txtnempleado = document.createTextNode(nempleado);
        p4.hidden=true;
        p4.appendChild(txtnempleado);
        div.appendChild(p4)

        let pTelefono = document.createElement('p');
        let txtTelefono = document.createTextNode("Telefono:");
        pTelefono.appendChild(txtTelefono);
        div.appendChild(pTelefono);
        let inputTelefono = document.createElement("input");
        inputTelefono.classList.add("inputs");
        inputTelefono.value = telefono;
        div.appendChild(inputTelefono);

        let pCorreo = document.createElement('p');
        let txtCorreo = document.createTextNode("Correo personal:");
        pCorreo.appendChild(txtCorreo);
        div.appendChild(pCorreo);
        let inputCorreo = document.createElement("input");
        inputCorreo.classList.add("inputs");
        inputCorreo.value = correo;
        div.appendChild(inputCorreo);

        let buttonAccept = document.createElement('button')
        buttonAccept.classList.add("aceptar")
        let textAccept = document.createTextNode("Aceptar")
        buttonAccept.appendChild(textAccept);
        let buttonCancel = document.createElement('button')
        buttonCancel.classList.add("cancel")
        let textCancel = document.createTextNode("Cancel")
        buttonCancel.appendChild(textCancel);
        div.appendChild(buttonAccept);
        div.appendChild(buttonCancel);
        document.body.appendChild(div);
    }
    
    function cerrarVentana() {
        let cerrar = document.querySelector(".emergente")
        document.body.removeChild(cerrar)
    }

    function Pintar(elemento, nombre, correo, telefono,nempleado) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let txtNombre = document.createTextNode(nombre);
        let beli = document.createElement('button');
        let bedi = document.createElement('button');
        let trash = document.createElement('i');
        let p2 = document.createElement('p');
        let txtCorreo = document.createTextNode(correo);
        let p3 = document.createElement('p');
        let txtTelefono = document.createTextNode(telefono);
        let p4 = document.createElement('p');
        let txtnempleado = document.createTextNode(nempleado);


        
        p4.appendChild(txtnempleado);
        beli.appendChild(trash);
        p.appendChild(txtNombre);
        p2.appendChild(txtCorreo);
        p3.appendChild(txtTelefono);

        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(beli);
        div.appendChild(bedi);
        elemento.appendChild(div);

        p4.hidden=true;
        // bedi.style.backgroundImage = "url('https://www.shutterstock.com/image-vector/recycle-bin-icon-trash-can-260nw-1687424971.jpg')";
        trash.classList.add("bx", "bxs-trash", "cerrar");
        // edit.classList.add("bx", "bxs-edit");
        beli.setAttribute("class", "delete");
        bedi.setAttribute("class", "edit");
        bedi.addEventListener("click", function (elemento) {
            if (elemento.target.nodeName === "BUTTON" || document.querySelector(".emergente") === null) {
                ventanaEmergente(elemento.target.parentNode.firstChild.textContent, elemento.target.parentNode.firstChild.nextSibling.textContent, elemento.target.parentNode.firstChild.nextSibling.nextSibling.textContent, elemento.target.parentNode.lastChild.previousSibling.previousSibling.textContent);
                console.log(elemento.target.parentNode.lastChild.previousSibling.previousSibling.textContent);
                console.log(document.querySelector(".emergente"));
                let a = document.querySelectorAll(".cancel")
                a.forEach(a1 => {
                    a1.addEventListener("click", () => { cerrarVentana() })
                })
            } else {
                console.log(document.querySelector(".emergente"));
                ventanaEmergente(elemento.target.parentNode.parentNode.firstChild.textContent, elemento.target.parentNode.parentNode.firstChild.nextSibling.textContent, elemento.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.textContent,elemento.target.parentNode.parentNode.lastChild.textContent);

                let a = document.querySelectorAll(".cancel")
                a.forEach(a1 => {
                    a1.addEventListener("click", () => { cerrarVentana() })
                })
            }
        });





    }


}