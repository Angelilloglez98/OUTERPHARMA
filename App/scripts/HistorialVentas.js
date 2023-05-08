$(document).ready(function () {

    let table = new DataTable('#myTable');

    const BuscarDatos = async () => {
        return fetch('./BaseDatos/devHistorialVentas.php')
            .then(res => res.json())
            .then(resultado => { return resultado });
    }

    BuscarDatos().then((res) => {
        res.forEach(element => {

            let datos = [
                element['nVentas'],
                element['NombreEmpleado'],
                element['Fecha'],
                element['Total'],
                
            ];
            pintarDatos(datos, element, res);
        });
    });

    function pintarDatos(datos, element, res) {
        
        fetch(`./BaseDatos/devHistorialVentasProductos.php?nVentas=${datos[0]}`)
        .then(res=>res.json())
        .then((resultado)=>{
            let pdf=GenerarPDF(resultado);
            const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            let link=`<a href="${url}" target="_blank">Descargar Ticket</a>`;
            
            datos[datos.length]=link;
            table.row.add(datos);
            table.draw();
        });
        
    }

    function GenerarPDF(datosProductos) {

        const ticketWidth = 3.25;
        const ticketHeight = 5.5;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [ticketWidth, ticketHeight]
          });
          doc.setLineWidth(0.01);
        doc.text('OuterPharma', 0.2, 0.4);
        doc.setFontSize(13);
        doc.text(`${datosProductos[0].NombreF}`, 0.2, 1.35);
        doc.setFontSize(10);
        doc.text(`Tlf: ${datosProductos[0].nTelefono}`, 0.2, 1.65);
        doc.text(`IdVenta: ${datosProductos[0].nVentas}`, 0.2, 1.9);
        doc.text(`Direccion: ${datosProductos[0].Direccion}`, 0.2, 2.15);
        doc.text(`Fecha: ${datosProductos[0].Fecha}`, 0.2, 2.40);
        doc.line(0.1, 3, 3.15, 3);
        doc.text('Producto        Cantidad          PVP         Total', 0.2, 2.9);
        let y = 3.25;
        doc.setFont('Courier');
        datosProductos.forEach(producto=>{
            let cadena=producto.Nombre.padEnd(9, ' ').slice(0, 9);
            
            doc.text(`${cadena}    ${producto.Cantidad}       ${producto.PVP}    ${producto.PrecioProductos} `, 0.2, y);
            y += 0.25;
        })
        
            doc.line(0.1, y, 3.15, y);
            y+=0.25;
            doc.text(`TOTAL                       ${datosProductos[0].Total} `, 0.2, y);
        return doc;
    }

});


