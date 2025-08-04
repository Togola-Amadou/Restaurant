import React, { useEffect, useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Paper, TextField, Button
} from "@mui/material";
import Accuil from "../Acceuil";

const Stock = () => {
  const [produits, setProduits] = useState([]);
  const [quantites, setQuantites] = useState({});

  useEffect(() => {
    fetch("https://apirestaurant-54hu.onrender.com/Restau/Produit/")
      .then(res => res.json())
      .then(data => {
        setProduits(data);
        const q = {};
        data.forEach(p => {
          q[p.id] = p.quantite;
        });
        setQuantites(q);
      });
  }, []);

  const handleChange = (id, value) => {
    setQuantites(prev => ({
      ...prev,
      [id]: parseInt(value)
    }));
  };

  const updateQuantite = (id) => {
    const nouvelleQuantite = quantites[id];

    if (nouvelleQuantite === "" || nouvelleQuantite < 0) {
      alert("❌ Quantité invalide !");
      return;
    }

    fetch(`https://apirestaurant-54hu.onrender.com/Restau/Produit/${id}/stock?quantite=${nouvelleQuantite}`, {
      method: "PATCH"
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur");
        return res.json();
      })
      .then(data => {
        alert(data.message);
        // Recharge les produits pour mettre à jour le stock actuel
        return fetch("https://apirestaurant-54hu.onrender.com/Restau/Produit/");
      })
      .then(res => res.json())
      .then(data => {
        setProduits(data);
      })
      .catch(() => alert("❌ Erreur lors de la mise à jour"));
  };

  return (
    <>
      <Accuil />
      <Container sx={{ mt: 4, marginTop: '100px' }}>
        <Typography variant="h4" color="primary" gutterBottom>📦 Gestion du Stock</Typography>

        <TableContainer component={Paper} sx={{ maxHeight: '600px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>
                <TableCell>Quantité actuelle</TableCell>
                <TableCell>Nouvelle quantité</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produits.map(p => (
                <TableRow key={p.id} style={{ backgroundColor: p.quantite <= 3 ? "#ffebee" : "white" }}>
                  <TableCell>{p.nom}</TableCell>
                  <TableCell>{p.quantite}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={quantites[p.id] || ""}
                      onChange={(e) => handleChange(p.id, e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => updateQuantite(p.id)}>
                      Mettre à jour
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Stock;
