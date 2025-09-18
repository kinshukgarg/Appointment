import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              School Appointment System
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Streamline your teacher-student meetings with our easy-to-use appointment system
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mr: 2, mb: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ mb: 2 }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h4" color="primary" gutterBottom>
                Features
              </Typography>
              <Grid container spacing={2}>
                {[
                  {
                    title: 'Easy Scheduling',
                    description: 'Book appointments with teachers in just a few clicks',
                  },
                  {
                    title: 'Availability Management',
                    description: 'Teachers can easily manage their available time slots',
                  },
                  {
                    title: 'Real-time Updates',
                    description: 'Get instant notifications about your appointments',
                  },
                  {
                    title: 'Secure Platform',
                    description: 'Your data is protected with industry-standard security',
                  },
                ].map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant="h6" color="text.primary">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              {
                step: '1',
                title: 'Register',
                description: 'Create your account as a student or teacher',
              },
              {
                step: '2',
                title: 'Set Availability',
                description: 'Teachers set their available time slots',
              },
              {
                step: '3',
                title: 'Book Appointments',
                description: 'Students book appointments with teachers',
              },
              {
                step: '4',
                title: 'Manage Meetings',
                description: 'Track and manage your appointments',
              },
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h2"
                    color="primary"
                    sx={{ mb: 2 }}
                  >
                    {step.step}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;