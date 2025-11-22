import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Navbar from '../components/Navbar';

export default function Landing() {
    const features = [
        { title: 'View Accounts', description: 'View all your bank accounts in one place' },
        { title: 'Transfer Funds', description: 'Transfer money between accounts securely' },
        { title: 'Track Transactions', description: 'View transaction history with date filters' },
        { title: 'Admin Management', description: 'Manage users and banks if you are an admin' },
    ];

    return (
        <Container sx={{ mt: 5 }}>
            <Navbar />
            <Typography variant="h3" align="center" gutterBottom>Welcome to Banking Aggregator</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {features.map((f, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{f.title}</Typography>
                                <Typography>{f.description}</Typography>
                                <Button sx={{ mt: 1 }} variant="outlined">Learn More</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
