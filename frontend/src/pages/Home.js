import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to School Appointment System
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Book appointments with your teachers easily
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                For Teachers
              </Typography>
              <Typography paragraph>
                Manage your availability and view your appointments.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/teacher')}
              >
                Go to Teacher Dashboard
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                For Students
              </Typography>
              <Typography paragraph>
                Book appointments with your teachers and manage your schedule.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/student')}
              >
                Go to Student Dashboard
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 