// src/Composant/Inscription/index.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const Inscription = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState(null);

  const handleInscription = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, motDePasse);
      alert('Inscription réussie !');
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      setErreur(error.message);
    }
  };

  return (
    <Box sx={{
      height:'100vh',
      backgroundColor: "#f5f5f5",
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:'40px'
    }}>
      <Paper component='form' elevation={10} onSubmit={handleInscription} sx={{
        display:'flex',
        flexDirection:'column',
        width:'400px',
        padding:'4px',
         gap: 2,
         height:'400px'

      }}>
      <Typography variant="h5" align="center" gutterBottom>Inscription</Typography>
        <TextField
          type="email"
          label="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <Button type="submit">S'inscrire</Button>
      </Paper>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
    </Box>
  );
};

export default Inscription;
