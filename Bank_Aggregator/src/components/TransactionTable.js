import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function TransactionTable({ transactions }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Type', headerName: 'Type', width: 130 },
        { field: 'Amount', headerName: 'Amount', width: 130 },
        { field: 'FromAccount', headerName: 'From', width: 150 },
        { field: 'ToAccount', headerName: 'To', width: 150 },
        { field: 'TransactionDate', headerName: 'Date', width: 200 },
    ];

    const rows = transactions.map((t, index) => ({
        id: index + 1,
        Type: t.type,
        Amount: t.amount,
        FromAccount: t.fromAccount,
        ToAccount: t.toAccount,
        TransactionDate: new Date(t.transactionDate).toLocaleString(),
    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25]}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
}
