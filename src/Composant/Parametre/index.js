import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Avatar,
  Paper
} from '@mui/material';
import Accuil from '../Acceuil';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
const Parametre = () => {
  const [nom, setNom] = useState("Mon Restaurant");
  const [commandesActives, setCommandesActives] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [horaire, setHoraire] = useState("08:00 - 22:00");

  const [admin,setAdim] = useState('')
  const [password, setPassword] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
 const [erreur, setErreur] = useState(null);

  const handleInscription = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, admin, password);
      alert('Inscription réussie !');
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      setErreur(error.message);
    }
  };

  return (
    <>
    <Accuil />
    <Container  maxWidth='lg'  sx={{ mt: 12, px:2 ,marginTop: '100px',ml:'300px' }}>
      <Typography variant="h4" gutterBottom>⚙️ Paramètres du Restaurant</Typography>

      <TextField
        label="Nom du restaurant"
        fullWidth
        margin="normal"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <FormControlLabel
        control={
          <Switch
            checked={commandesActives}
            onChange={(e) => setCommandesActives(e.target.checked)}
          />
        }
        label="Activer la prise de commande"
      />

      <TextField
        label="Horaires d’ouverture"
        fullWidth
        margin="normal"
        value={horaire}
        onChange={(e) => setHoraire(e.target.value)}
      />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>Logo / Image du restaurant :</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="outlined" component="label">
          Choisir un fichier
          <input hidden type="file" accept="image/*" onChange={handleImageChange} />
        </Button>
        {imagePreview && (
          <Avatar
            src={imagePreview}
            sx={{ width: 56, height: 56 }}
          />
        )}
      </Stack>
      <Stack direction='column' sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
         <Paper component='form' elevation={10} onSubmit={handleInscription} sx={{
        display:'flex',
        flexDirection:'column',
        width:'400px',
        padding:'4px',
         gap: 2,

      }}>
      <Typography variant="h5" align="center" gutterBottom>Inscription Nouvelle Login</Typography>
        <TextField
          type="email"
          label="Adresse e-mail"
          value={admin}
          onChange={(e) => setAdim(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">S'inscrire</Button>
      </Paper>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
 
      </Stack>
    </Container>
    </>
  );
};

export default Parametre;
