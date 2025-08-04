import React, { useState } from 'react';
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton,
  List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AjouterIcon from '@mui/icons-material/Add';
import CommandeIcon from '@mui/icons-material/ShoppingCart';
import BackIcon from '@mui/icons-material/Logout';
import StockIcon from '@mui/icons-material/Store';
import NotificationIcon from '@mui/icons-material/Notifications';
import ParametreIcon from '@mui/icons-material/Settings';

import avatarRstaurant from './1.jpg';

const drawerWidth = 240;

const Accuil = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 const drawerContent = (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Box>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <img src={avatarRstaurant} width={120} style={{ borderRadius: '50%' }} alt="Logo" />
      </Box>
      <Divider />
      <List>
        <ListItem component={Link} to="/Dashboard">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Accueil" />
        </ListItem>
        <ListItem component={Link} to="/Menu">
          <ListItemIcon><MenuIcon /></ListItemIcon>
          <ListItemText primary="Menu" />
        </ListItem>
        <ListItem component={Link} to="/AjouterPlat">
          <ListItemIcon><AjouterIcon /></ListItemIcon>
          <ListItemText primary="Ajouter un Plat" />
        </ListItem>
        <ListItem component={Link} to="/Commande">
          <ListItemIcon><CommandeIcon /></ListItemIcon>
          <ListItemText primary="Commandes" />
        </ListItem>
        <ListItem component={Link} to="/Stock">
          <ListItemIcon><StockIcon /></ListItemIcon>
          <ListItemText primary="Stock" />
        </ListItem>
      </List>
    </Box>

    {/* Déconnexion tout en bas */}
    <Box>
      <Divider />
      <ListItem button onClick={handleLogout}>
        <ListItemIcon><BackIcon color="error" /></ListItemIcon>
        <ListItemText primary="Déconnexion" />
      </ListItem>
    </Box>
  </Box>
);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar responsive */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: 'darkgreen' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Restaurant
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <IconButton component={Link} to="/Message" color="inherit">
              <NotificationIcon />
            </IconButton>
            <IconButton component={Link} to="/Parametre" color="inherit">
              <ParametreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
             width: 240,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: 240,
      boxSizing: 'border-box'
    }
  }}
  >
          {drawerContent}
        </Drawer>

        {/* Drawer PC */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Espace pour le contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Toolbar />
        {/* 👇 Ici tu mets le contenu de chaque page */}
      </Box>
    </Box>
  );
};

export default Accuil;
