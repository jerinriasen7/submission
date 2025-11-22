import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

export default function AccountCard({ account, onDeposit, onWithdraw, onTransfer }) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{account.AccountNumber} - {account.AccountType}</Typography>
                <Typography>Balance: {account.Balance} {account.CurrencyCode}</Typography>
                <Typography>Branch: {account.BranchName} | Bank: {account.BankName}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button variant="contained" onClick={() => onDeposit(account)}>Deposit</Button>
                    <Button variant="outlined" onClick={() => onWithdraw(account)}>Withdraw</Button>
                    <Button variant="contained" color="secondary" onClick={() => onTransfer(account)}>Transfer</Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
