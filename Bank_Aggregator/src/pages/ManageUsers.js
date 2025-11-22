import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DataGridTable from '../components/DataGridTable';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API_URL = 'https://localhost:5001/api/users';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'User' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setUsers(res.data);
    };

    const handleAdd = async () => {
        await axios.post(`${API_URL}/register`, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setOpen(false);
        fetchUsers();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'userType', headerName: 'Role', width: 100 },
    ];

    const rows = users.map((u, i) => ({ id: i+1, ...u }));

    return (
        <Container sx={{ mt: 5 }}>
            <Navbar />
            <Button variant="contained" onClick={() => setOpen(true)}>Add User</Button>
            <DataGridTable columns={columns} rows={rows} />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    {['firstName','lastName','email','password'].map(f => (
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
