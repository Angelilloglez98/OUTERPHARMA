    $(document).ready( function () {
        
       let table = new DataTable('#myTable');

        const BuscarDatos = async () => {
        return fetch('http://localhost/OuterPharma/App/BaseDatos/devHistorialVentas.php')
            .then(res => res.json())
            .then(resultado => { return resultado });
        }

        BuscarDatos().then((res) => {
        res.forEach(element => {
            
            let datos = [
            element['IdVenta'],
            element['NombreEmpleado'],
            element['Fecha'],
            element['Total']
            ];
            pintarDatos(datos, element, res);
        });
        });

        function pintarDatos(datos, element, res) {
        const enlace = generarEnlace(datos, element, res);
        datos.push(enlace);
        table.row.add(datos);
        table.draw();
        }

        function generarEnlace(datos, element, res) {
        const pdf = GenerarPDF(datos, element, res);
        const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        return `<a href="${url}" target="_blank">Descargar PDF</a>`;
        }


        function GenerarPDF(datos, element, res) {

            const ventaId = element['IdVenta'];
            const productos = res.filter(e => e['IdVenta'] === ventaId).map(e => ({
                
                nombre: e['NombreProducto'],
                cantidad: e['Cantidad'],
                PVP: e['PVP'],
                Total: e['Total']
            })
            );

            const ticketWidth = 3.25;
            const ticketHeight = 5.5;

            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: [ticketWidth, ticketHeight]
            });

            doc.setFont('courier', 'normal');
            doc.setFontSize(8);

            doc.setLineWidth(0.01);
            doc.setDrawColor(0);

            doc.rect(0.05, 0.05, 3.15, 5.35);

            doc.text('OuterPharma', 0.2, 1.6);
            doc.text(`Venta: ${ventaId}`, 0.2, 1.9);
            doc.text(`Fecha: ${element['Fecha']}`, 0.2, 2.15);

            doc.text('Producto         Cantidad         Precio', 0.2, 2.9);
            doc.line(0.1, 3.0, 3.15, 3.0);

            let y = 3.25;
            productos.forEach(p => {
                doc.text(`${p.nombre.padStart(10, ' ')}          ${p.cantidad}              ${p.PVP}  `, 0.2, y);
                y += 0.25;
            });

            doc.line(0.1, y, 3.15, y);
            doc.text(`Total                               ${element['Total']}`, 0.2, y + 0.2);
            doc.line(0.1, y + 0.3, 3.15, y + 0.3);
            doc.text('Gracias por su compra!', 0.9, 4.75);

            return doc;
        }
        
} );


