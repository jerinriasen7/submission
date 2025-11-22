import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const roles = user?.roles || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Banking Aggregator
        </Typography>

        {/* Always visible pages */}
        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
        <Button color="inherit" onClick={() => navigate("/about")}>About</Button>
        <Button color="inherit" onClick={() => navigate("/contact")}>Contact</Button>
        <Button color="inherit" onClick={() => navigate("/faq")}>FAQ</Button>

        {/* User-specific pages */}
        {user && !roles.includes("Admin") && (
          <>
            <Button color="inherit" onClick={() => navigate("/accounts")}>Accounts</Button>
            <Button color="inherit" onClick={() => navigate("/transactions")}>Transactions</Button>
          </>
        )}

        {/* Admin-only pages */}
        {user && roles.includes("Admin") && (
          <>
            <Button color="inherit" onClick={() => navigate("/manage-users")}>Manage Users</Button>
            <Button color="inherit" onClick={() => navigate("/manage-banks")}>Manage Banks</Button>
          </>
        )}

        {user ? (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
