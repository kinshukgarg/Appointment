import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AppointmentDialog from './AppointmentDialog';
import AppointmentList from './AppointmentList';
import Login from './Login';
import Register from './Register';
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from '../services/api';

const MainComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSetToken = (newToken) => {
    setToken(newToken);
    saveTokenToLocalStorage(newToken);
  };

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      {!token ? (
        showRegister ? (
          <Register setToken={handleSetToken} />
        ) : (
          <Login setToken={handleSetToken} />
        )
      ) : (
        <>
          <Button variant="outlined" onClick={handleDialogOpen}>
            Create Appointment
          </Button>
          <AppointmentDialog
            open={dialogOpen}
            handleClose={handleDialogClose}
            token={token}
          />
          <AppointmentList token={token} />
        </>
      )}
      {!token && (
        <Button
          variant="text"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
      )}
    </div>
  );
};

export default MainComponent;
