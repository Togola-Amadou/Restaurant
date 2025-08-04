import React, { useEffect, useState } from 'react';
import {
  Box, Button, Container, Paper, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, Switch, FormControlLabel
} from '@mui/material';
import axios from 'axios';
import Accuil from '../Acceuil';

const AjouterPlat = () => {
  const [produit, setProduit] = useState([]);
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    dispo: true,
    image_url: '',
    quantite: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    chargerProduit();
  }, []);

  const chargerProduit = () => {
    fetch("https://apirestaurant-54hu.onrender.com/Restau/Produit/")
      .then(res => res.json())
      .then(data => setProduit(data));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpload = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("file", imageFile);
    const res = await axios.post("https://apirestaurant-54hu.onrender.com/upload-image/", formData);
    return res.data.url; // <- "url" correspond à la clé retournée par /upload-image/
  };

  const ajouter = async () => {
    let imageUrl = form.image_url;
    if (imageFile) {
      imageUrl = await handleUpload();
    }

    const nouveau = {
      ...form,
      prix: parseInt(form.prix),
      quantite: parseInt(form.quantite),
      image_url: imageUrl
    };

    axios.post("https://apirestaurant-54hu.onrender.com/Restau/Produit/", nouveau)
      .then((res) => {
        setProduit([...produit, res.data]);
        setForm({
          nom: '',
          description: '',
          prix: '',
          dispo: true,
          image_url: '',
          quantite: ''
        });
        setImageFile(null);
        alert("✅ Plat ajouté avec image !");
      })
      .catch(err => {
        console.error(err);
        alert("❌ Erreur !");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer ?")) return;
    axios.delete(`https://apirestaurant-54hu.onrender.com/Restau/Produit/${id}`)
      .then(() => {
        alert("🗑️ Supprimé !");
        chargerProduit();
      });
  };

  return (
    <>
      <Accuil />
      <Container  maxWidth='lg'  sx={{ mt: 12, px:2 ,marginTop: '100px',ml:'300px' }}>
        <Typography variant="h4" color="primary">Ajouter un Plat</Typography>
        
        <Stack direction="row" spacing={3} mt={3} mb={2}>
          <TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
          <TextField label="Prix" name="prix" type="number" value={form.prix} onChange={handleChange} />
          <TextField label="Quantité" name="quantite" type="number" value={form.quantite} onChange={handleChange} />
          <FormControlLabel
            control={<Switch checked={form.dispo} name="dispo" onChange={handleChange} />}
            label="Disponible"
          />
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </Stack>

        <Button variant="contained" onClick={ajouter}>Ajouter</Button>

        <TableContainer component={Paper} sx={{ mt: 4, maxHeight: "500px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {produit.map(p => {
  console.log("🖼️ image_url reçu :", p.image_url);

  return (
    <TableRow key={p.id}>
      <TableCell>{p.nom}</TableCell>
      <TableCell>{p.description}</TableCell>
      <TableCell>{p.prix} FCFA</TableCell>
      <TableCell>{p.quantite}</TableCell>
     <TableCell>
<img
  src={`https://apirestaurant-54hu.onrender.com${p.image_url}`}
  width="80"
  alt={p.nom}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/80";
  }}
/>

</TableCell>

      <TableCell>
        <Button color="error" onClick={() => handleDelete(p.id)}>Supprimer</Button>
      </TableCell>
    </TableRow>
  );
})}

            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AjouterPlat;
