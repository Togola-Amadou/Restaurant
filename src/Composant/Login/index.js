import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button,Paper,Typography, TextField } from "@mui/material";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const handleConnexion = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, motDePasse)
      .then((userCredential) => {
        console.log("Connexion réussie :", userCredential.user);
        navigate('/Dashboard'); // ✅ Redirection correcte
      })
      .catch((error) => {
        console.error("Erreur de connexion :", error.message);
        alert("Email ou mot de passe incorrect !");
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        component="form"
        onSubmit={handleConnexion}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Connexion
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Se connecter
        </Button>
      </Paper>
    </Box>
 
  );
}

export default Connexion;
