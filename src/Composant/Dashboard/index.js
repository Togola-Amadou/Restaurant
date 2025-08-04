import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Box, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Accueil from '../Acceuil'; // Assure-toi que le nom est bien Accueil ou Acceuil

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  // Charger les commandes au chargement du composant
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('https://apirestaurant-54hu.onrender.com/Restau/orders/')
      .then(res => {
        console.log("📊 Données reçues :", res.data);
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  };

  // Réinitialiser les commandes (vider la liste)
  const handleReset = () => {
    setOrders([]);
  };

  // Calculs pour les graphiques
  const dailySales = {};
  let totalVendu = 0;

  orders.forEach(order => {
    const key = `Commande ${order.id}`;
    order.items.forEach(item => {
      totalVendu += item.quantite;
      dailySales[key] = (dailySales[key] || 0) + item.quantite;
    });
  });

  const dailySalesData = Object.keys(dailySales).map(key => ({
    name: key,
    quantite: dailySales[key]
  }));

  const productSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const nom = `Produit ${item.product_id}`;
      productSales[nom] = (productSales[nom] || 0) + item.quantite;
    });
  });

  const productSalesData = Object.keys(productSales).map(nom => ({
    nom,
    value: productSales[nom]
  }));

  return (
    <>
      <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ p: 2 }}>
        <Accueil />
      </Box>

      <Container sx={{ mt: 2, marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom>📊 Tableau de Bord</Typography>
        <Typography variant="h6">✅ Quantité Totale Vendue : {totalVendu}</Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6} sx={{ width: '400px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Ventes par Commande</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySalesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantite" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '350px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Répartition par Produit</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productSalesData}
                    dataKey="value"
                    nameKey="nom"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {productSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Tableau récapitulatif */}
        <Typography variant="h5" sx={{ mt: 5 }}>🗂️ Détails des Commandes</Typography>
        <TableContainer component={Paper} sx={{ mt: 2, maxHeight: "300px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID Commande</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Plats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.client_name}</TableCell>
                  <TableCell>{order.tel}</TableCell>
                  <TableCell>{order.table}</TableCell>
                  <TableCell>{order.statuts}</TableCell>
                  <TableCell>
                    {order.items.map((item, index) => (
                      <Typography key={index}>
                        Produit {item.nom} : {item.quantite}
                      </Typography>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleReset}>
          Réinitialiser
        </Button>
      </Container>
    </>
  );
};

export default Dashboard;
