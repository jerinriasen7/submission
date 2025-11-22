// src/pages/FAQ.js
import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';

const faqs = [
    { q: "What is Banking Aggregator?", a: "It is a platform to view and manage all your bank accounts in one place." },
    { q: "How do I create an account?", a: "Register using your email and follow the instructions to create a new account." },
    { q: "Is my data secure?", a: "Yes, we use industry-standard encryption and security practices." },
    { q: "How can I deposit money?", a: "Use the Deposit button on your account page to add funds." },
    { q: "Can I withdraw funds?", a: "Yes, use the Withdraw option for any of your accounts." },
    { q: "How to transfer between accounts?", a: "Use the Transfer button, select the accounts and enter the amount." },
    { q: "Who can access my account?", a: "Only you or users with granted power of attorney can access your accounts." },
    { q: "Can I close my account?", a: "Yes, navigate to your account and choose the Close Account option." },
    { q: "What if I forget my password?", a: "Use the Reset Password option on the login page to recover it." },
    { q: "How do I contact support?", a: "Use the Contact Us page to send us a message." },
];

export default function FAQ() {
    return (
        <Container sx={{ mt: 5, mb: 5 }}>
            <Navbar />
            <Typography variant="h3" gutterBottom align="center">
                Frequently Asked Questions
            </Typography>

            {faqs.map((faq, i) => (
                <Accordion key={i} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{faq.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.a}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}
