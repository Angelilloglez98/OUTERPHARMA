    $(document).ready( function () {
        
        let table = new DataTable('#myTable');

        table.row.add([1,2,3,4]);
        table.row.add([1,2,3,4]);
        table.row.add([1,2,3,2]);
        table.row.add([1,2,3,1]);
        table.row.add([1,2,3,7]);
        table.row.add([1,2,3,2]);

        table.draw();

    } );


