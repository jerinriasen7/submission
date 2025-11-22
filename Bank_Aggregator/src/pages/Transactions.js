// src/pages/Transactions.js
import React, { useState } from 'react';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Navbar from '../components/Navbar';

export default function Transactions() {
  const [transactions] = useState([
    { id: 1, date: '2025-11-20', type: 'Deposit', amount: 500, from: 'N/A', to: '80232800' },
    { id: 2, date: '2025-11-21', type: 'Withdraw', amount: 200, from: '80232800', to: 'N/A' },
    { id: 3, date: '2025-11-22', type: 'Transfer', amount: 100, from: '80232800', to: '78797382' },
  ]);

  return (
    <Container sx={{ mt: 5 }}>
      <Navbar />
      <Typography variant="h4" sx={{ mb: 3 }}>Transactions</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>From Account</TableCell>
              <TableCell>To Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(txn => (
              <TableRow key={txn.id}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell>{txn.amount}</TableCell>
                <TableCell>{txn.from}</TableCell>
                <TableCell>{txn.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
