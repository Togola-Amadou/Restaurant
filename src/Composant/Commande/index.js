import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button,
  List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel, Box
} from '@mui/material';
import axios from 'axios';
import Accuil from '../Acceuil';

const Commande = ({ panier, setPanier }) => {
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('En cours'); // valeur par défaut
  const [derniereCommande, setDerniereCommande] = useState(null);

  const handleSubmit = async () => {
    if (panier.length === 0) {
      alert('❌ Votre panier est vide.');
      return;
    }

    const orderData = {
      client_name: clientName,
      tel: phone,
      table: tableNumber,
      statuts: status,
      items: panier.map(item => ({
        product_id: item.product_id,
        quantite: item.quantite
      }))
    };

    try {
      const response = await axios.post('https://apirestaurant-54hu.onrender.com/Restau/orders/', orderData);
      alert("✅ Commande enregistrée avec succès !");
      setDerniereCommande(orderData); // stocke la commande envoyée (ou response.data si tu veux la réponse)
      // Reset formulaire et panier
      setPanier([]);
      setClientName('');
      setTableNumber('');
      setPhone('');
      setStatus('En cours');
    } catch (err) {
      console.error("❌ Erreur Axios :", err.response?.data || err.message);
      alert("❌ Erreur lors de l'enregistrement !");
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('print-section').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      <Box>
        <Accuil />
      </Box>
      <Container sx={{ mt: 4, marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom>🧾 Nouvelle Commande</Typography>

        <List>
          {panier.length === 0 ? (
            <Typography variant="body2">Panier vide</Typography>
          ) : (
            panier.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Produit ${item.product_id} - ${item.nom} x ${item.quantite}`}
                  secondary={`Prix unitaire : ${item.prix} FCFA`}
                />
              </ListItem>
            ))
          )}
        </List>

        <TextField
          label="Nom du client"
          fullWidth
          margin="normal"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <TextField
          label="Numéro de table"
          fullWidth
          margin="normal"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <TextField
          label="Téléphone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Statut</InputLabel>
          <Select
            labelId="status-label"
            label="Statut"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="En cours">En cours</MenuItem>
            <MenuItem value="Servi">Servi</MenuItem>
            <MenuItem value="À emporter">À emporter</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={panier.length === 0}
        >
          ✅ Valider Commande
        </Button>

        {derniereCommande && (
          <Box mt={4}>
            <div id="print-section">
              <Typography variant="h6">Dernière commande</Typography>
              <p>Nom : {derniereCommande.client_name}</p>
              <p>Téléphone : {derniereCommande.tel}</p>
              <p>Table : {derniereCommande.table}</p>
              <p>Statut : {derniereCommande.statuts}</p>
              <h4>Articles :</h4>
              <ul>
                {derniereCommande.items.map((item, index) => (
                  <li key={index}>
                    Produit {item.product_id} × {item.quantite}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="outlined" onClick={handlePrint}>Imprimer</Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Commande;
