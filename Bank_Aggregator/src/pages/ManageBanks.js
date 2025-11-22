import React, { useEffect, useState } from 'react';
import { Container, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DataGridTable from '../components/DataGridTable';
import Navbar from '../components/Navbar';
import { getBanks } from '../api/banksApi';
import axios from 'axios';

export default function ManageBanks() {
    const [banks, setBanks] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ bankName: '', headOfficeAddress: '', ifscCode: '' });

    useEffect(() => {
        fetchBanks();
    }, []);

    const fetchBanks = async () => {
        const data = await getBanks();
        setBanks(data);
    };

    const handleAdd = async () => {
        await axios.post('https://localhost:5001/api/banks', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setOpen(false);
        fetchBanks();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'bankName', headerName: 'Bank Name', width: 200 },
        { field: 'headOfficeAddress', headerName: 'Address', width: 250 },
        { field: 'ifscCode', headerName: 'IFSC', width: 150 },
    ];

    const rows = banks.map((b, i) => ({ id: i+1, ...b }));

    return (
        <Container sx={{ mt: 5 }}>
            <Navbar />
            <Button variant="contained" onClick={() => setOpen(true)}>Add Bank</Button>
            <DataGridTable columns={columns} rows={rows} />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Bank</DialogTitle>
                <DialogContent>
                    {['bankName','headOfficeAddress','ifscCode'].map(f => (
                        <TextField key={f} label={f} fullWidth margin="dense" value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
