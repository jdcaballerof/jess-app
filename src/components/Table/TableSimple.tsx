import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
//@ts-ignore
import { ColDef } from 'ag-grid-community/core';


interface Props {
    cols,
    data: Record<string, any>[]
}
// Row Data Interface
interface IRow {
    make: string;
    model: string;
    price: number;
    electric: boolean;
}


export const TableSimple = ({ cols, data }: Props) => {
    const defaultColDef = {
        flex: 1,
    }

    return (
        // wrapping container with theme & size
        <div
        className="ag-theme-quartz-dark" // applying the grid theme
        style={{ width: '100%', height: '20rem' }} // the grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={data}
                columnDefs={cols}
                defaultColDef={defaultColDef}
            />
        </div>
    )
}
