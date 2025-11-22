import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridTable({ columns, rows, pageSize = 5 }) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25]}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
}
