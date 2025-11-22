// src/pages/Accounts.js
import React, { useEffect, useState } from "react";
import { getAccounts, deposit, withdraw, transfer } from "../api/accountsApi";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Navbar from "../components/Navbar";

export default function Accounts() {
  const { user } = useAuth();
  const token = user?.token;

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Deposit/Withdraw state
  const [open, setOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [operation, setOperation] = useState(""); // "deposit" or "withdraw"

  // Transfer state
  const [transferOpen, setTransferOpen] = useState(false);
  const [fromAccountId, setFromAccountId] = useState(null);
  const [toAccountId, setToAccountId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // Fetch accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setError("");
      if (!token) {
        setError("No access token found. Please login.");
        setLoading(false);
        return;
      }
      const data = await getAccounts(token);
      if (data) setAccounts(data);
      else setError("Failed to fetch accounts.");
      setLoading(false);
    };
    fetchAccounts();
  }, [token]);

  // Open deposit/withdraw dialog
  const handleOpen = (acc, op) => {
    setCurrentAccount(acc);
    setOperation(op);
    setAmount("");
    setOpen(true);
    setError("");
  };

  // Handle deposit or withdraw
  const handleDepositWithdraw = async () => {
    setError("");
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    let success = false;
    if (operation === "deposit") {
      success = await deposit(currentAccount.accountId, numAmount, token);
    } else if (operation === "withdraw") {
      success = await withdraw(currentAccount.accountId, numAmount, token);
    }

    if (success) {
      const data = await getAccounts(token);
      if (data) setAccounts(data);
      setOpen(false);
    } else {
      setError("Operation failed. Check balance or amount.");
    }
  };

  // Handle transfer
  const handleTransfer = async () => {
    setError("");
    const numAmount = parseFloat(transferAmount);
    if (!toAccountId || isNaN(numAmount) || numAmount <= 0) {
      setError("Enter valid account and amount.");
      return;
    }

    const success = await transfer(fromAccountId, toAccountId, numAmount, token);
    if (success) {
      const data = await getAccounts(token);
      if (data) setAccounts(data);
      setTransferOpen(false);
    } else {
      setError("Transfer failed. Check account IDs or balance.");
    }
  };

  if (loading) return <div>Loading accounts...</div>;
  if (error && accounts.length === 0) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Navbar />
      <Typography variant="h4" sx={{ mb: 3 }}>My Accounts</Typography>

      {accounts.length === 0 ? (
        <Typography>No accounts found.</Typography>
      ) : (
        accounts.map((acc) => (
          <Paper key={acc.accountId} sx={{ p: 2, mb: 2 }}>
            <Typography><strong>Account Number:</strong> {acc.accountNumber}</Typography>
            <Typography><strong>Balance:</strong> {acc.balance} {acc.currencyCode}</Typography>
            <Typography><strong>Bank:</strong> {acc.bankName} - {acc.branchName}</Typography>
            <Box sx={{ mt: 1 }}>
              <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleOpen(acc, "deposit")}>Deposit</Button>
              <Button variant="contained" color="warning" sx={{ mr: 1 }} onClick={() => handleOpen(acc, "withdraw")}>Withdraw</Button>
              <Button variant="contained" color="secondary" onClick={() => {
                setFromAccountId(acc.accountId);
                setTransferOpen(true);
                setTransferAmount("");
                setToAccountId("");
                setError("");
              }}>Transfer</Button>
            </Box>
          </Paper>
        ))
      )}

      {/* Deposit/Withdraw Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{operation === "deposit" ? "Deposit" : "Withdraw"} Amount</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDepositWithdraw}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={transferOpen} onClose={() => setTransferOpen(false)}>
        <DialogTitle>Transfer Amount</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Amount"
            fullWidth
            sx={{ mb: 2 }}
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <TextField
            label="To Account ID"
            fullWidth
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferOpen(false)}>Cancel</Button>
          <Button onClick={handleTransfer}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
