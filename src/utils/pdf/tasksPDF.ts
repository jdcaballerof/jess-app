import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Task } from "../../App";



export const tasksToPDF = (tasks: Task[], cols) => {
    console.log(tasks)
    console.log(cols)

    // Crear el PDF
    const doc = new jsPDF();

    //@ts-ignore
    doc.autoTable({
        columns: cols.map( c => ({header: c.header || c.field, dataKey: c.field})),
        body: tasks,
        headStyles: {
            //? fillColor: headerColor,
            fontSize: 8,
            // overflow: "ellipsize",
            cellWidth: "auto",
            minCellWidth: 15, 
            cellPadding: { top: 1.4, right: 2, bottom: 0.7, left: 2 },
            //? ...tableHeaderStyle
        },

        didDrawCell: function (data) {
            // console.log(data)
            if ( data?.row.section != "head" && data?.column.dataKey == "image" && data.cell.raw) {
                doc.addImage(data.cell.raw.url, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.raw.width, data.cell.raw.height);
            }
        },
        didParseCell: function (data) {
            // Ajustar la altura de la fila para la imagen
            if (data?.row.section != "head" && data?.column.dataKey == "image" && data.cell.raw) {
              data.cell.styles.cellPadding = 2; // Ajusta el padding de la celda
              data.row.height = Math.max(data.row.height, data.cell.raw.height + 4); // Ajusta la altura de la fila
            }
            
            // Evitar mostrar [object Object] antes de la imagen
            if (typeof data.cell.raw === "object") {
                data.cell.text = ""; // Vaciar el contenido de la celda
            }
        },
    });

    // doc.save('table_with_images.pdf');
    const url = doc.output('bloburl');
    window.open( url, '_blank' )
}


// [
//     {"field": "title"},
//     {"field": "input"},
//     {"field": "image"}
// ]

[
    {
        "title": "a",
        "input": "2",
        "image": { "url": "data:image/jpeg;base64,/9j/" }
    },
    {
        "title": "a",
        "input": "3",
        "image": { "url": "data:image/jpeg;base64,/9j/" }
    },
    {
        "title": "a",
        "input": "1",
        "image": { "url": "data:image/png;base64,iVBORw0KGgoAAAANSU" }
    }
]