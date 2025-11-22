import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import Navbar from "../components/Navbar";

const features = [
  {
    title: "View Accounts",
    description: "Access all your bank accounts in one place securely.",
    button: "Go to Accounts",
  },
  {
    title: "Transfer Funds",
    description: "Transfer money between accounts with ease and safety.",
    button: "Make a Transfer",
  },
  {
    title: "Track Transactions",
    description: "Monitor your transaction history with detailed filters.",
    button: "View Transactions",
  },
  {
    title: "Admin Management",
    description: "Manage users and banks if you are an admin.",
    button: "Admin Panel",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Welcome to Banking Aggregator
            </Typography>
            <Typography variant="h6" gutterBottom>
              Seamlessly manage all your bank accounts, transactions, and transfers in one place.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
            >
              Explore Features
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
              alt="Banking Hero"
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Grid>
        </Grid>

        {/* Features Section */}
        <Typography variant="h4" sx={{ mt: 8, mb: 3 }}>
          Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardContent>
                  <Typography variant="h6">{f.title}</Typography>
                  <Typography sx={{ mt: 1 }}>{f.description}</Typography>
                </CardContent>
                <Button variant="outlined" sx={{ m: 2 }}>
                  {f.button}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
