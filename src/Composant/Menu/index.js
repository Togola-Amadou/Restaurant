import React, { useState, useEffect } from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, TextField,
  Box
} from '@mui/material';

import Accuil from '../Acceuil';

const Menu = ({ panier, setPanier }) => {
  const [menu, setMenu] = useState([]);
  const [selectionItem, setSelectionItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const API_URL = "https://apirestaurant-54hu.onrender.com";

  useEffect(() => {
      fetch("https://apirestaurant-54hu.onrender.com/Restau/Produit/")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error(err));
  }, []);

  const OuvertureDialog = (item) => {
    setSelectionItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const FermetureDialog = () => {
    setOpen(false);
    setSelectionItem(null);
  };

  const ajouterAuPanier = () => {
    if (selectionItem && quantity <= selectionItem.quantite) {
      const newItem = {
        product_id: selectionItem.id,
        nom: selectionItem.nom,
        prix: selectionItem.prix,
        quantite: quantity
      };
      setPanier([...panier, newItem]);
      console.log("✅ Panier :", [...panier, newItem]);
      FermetureDialog();
    } else {
      alert("❌ Quantité demandée supérieure au stock disponible !");
    }
  };

  return (
    <>
      <Box><Accuil /></Box>

      <Container sx={{ marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom>Menu du Restaurant</Typography>
        <Grid container spacing={4}>
          {menu.map((dish) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
  component="img"
  height="140"
  image={`https://apirestaurant-54hu.onrender.com${dish.image_url}`}
  alt={dish.nom}
/>


                <CardContent>
                  <Typography variant="h6">{dish.nom}</Typography>
                  <Typography variant="body2">Prix : {dish.prix} FCFA</Typography>
                  <Typography variant="body2" color={dish.quantite > 0 ? "text.primary" : "error"}>
                    Stock : {dish.quantite > 0 ? dish.quantite : "Rupture de stock"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => OuvertureDialog(dish)}>Voir</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* DIALOG */}
        <Dialog open={open} onClose={FermetureDialog} maxWidth="sm" fullWidth>
          {selectionItem && (
            <>
              <DialogTitle>{selectionItem.nom}</DialogTitle>
              <DialogContent>
                <img
                  src={`${API_URL}${selectionItem.image_url}`}
                  alt={selectionItem.nom}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <Typography variant="body1" mt={2}>{selectionItem.prix} FCFA</Typography>
                <Typography variant="body2" mt={1}>{selectionItem.description}</Typography>
                <Typography variant="body2" mt={1}>
                  Stock disponible : {selectionItem.quantite}
                </Typography>
                <TextField
                  type="number"
                  label="Quantité"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  inputProps={{ min: 1, max: selectionItem.quantite }}
                  sx={{ mt: 2 }}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button variant='contained' onClick={ajouterAuPanier}>Commander</Button>
                <Button variant='outlined' onClick={FermetureDialog}>Fermer</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default Menu;
