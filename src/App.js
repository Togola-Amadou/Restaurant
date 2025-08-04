import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Composant/Menu';
import AjouterPlat from './Composant/AjouterPlat';
import Commande from './Composant/Commande';
import Dashboard from './Composant/Dashboard';
import Login from './Composant/Login';
import Stock from './Composant/Stock';
import Message from './Composant/Notification';
import Parametre from './Composant/Parametre';
const App = () => {
  const [panier, setPanier] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Menu' element={<Menu panier={panier} setPanier={setPanier} />} />
        <Route path='/AjouterPlat' element={<AjouterPlat />} />
        <Route path='/Commande' element={<Commande panier={panier} setPanier={setPanier} />} />
        <Route path='/Stock' element={<Stock />} />
        <Route path='/message' element={<Message />} />
        <Route path='/Parametre' element={<Parametre />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
