import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";

const team = [
  { name: "Alice Smith", role: "Frontend Developer", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Bob Johnson", role: "Backend Developer", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Charlie Lee", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/men/46.jpg" },
];

export default function About() {
  return (
    <Container sx={{ mt: 5 }}>
      <Navbar />
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        We are a team dedicated to providing a seamless banking aggregation experience.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {team.map((member, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardMedia
                component="img"
                height="180"
                image={member.image}
                alt={member.name}
                sx={{ borderRadius: "50%", width: "180px", margin: "auto" }}
              />
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography>{member.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
