import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container sx={{ mt: 5, maxWidth: 600 }}>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <TextField label="Message" name="message" multiline rows={4} value={form.message} onChange={handleChange} required />
        <Button type="submit" variant="contained">Send Message</Button>
      </Box>
    </Container>
  );
}
