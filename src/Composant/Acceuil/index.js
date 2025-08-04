import React from 'react'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {  AppBar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Restaurant'
import HomeIcon from '@mui/icons-material/Home'
import AjouterIcon from '@mui/icons-material/Add'
import CommandeIcon from '@mui/icons-material/ShoppingCart'
import BackIcon from '@mui/icons-material/ArrowBack'
import StockIcon from '@mui/icons-material/Store'
import NoitificationIcon from '@mui/icons-material/Notifications'
import ParametreIcon from '@mui/icons-material/Settings'
import avatarRstaurant from './1.jpg'
const maxWidht = 240;
const Accuil = () => {

const navigate = useNavigate();
  

const handleLogout = async () => {
                  await signOut(auth);
                  navigate('/');
                };
  return (
    <Box>
      <Drawer variant='permanent'  sx={{width:maxWidht,boxShadow:'revert',boxSizing:'border-box'}}>
            <img src={avatarRstaurant} width={130} style={{paddingTop:'20px',paddingLeft:'30px'}} />
        <List sx={{paddingTop:10}}>
          <ListItem component={Link} to="/Dashboard">
            <ListItemIcon><HomeIcon></HomeIcon></ListItemIcon>
                <ListItemText>Acceuil</ListItemText>    
            </ListItem>
            <ListItem component={Link} to="/Menu">
            <ListItemIcon><MenuIcon></MenuIcon></ListItemIcon>
                <ListItemText>Menu</ListItemText>    
            </ListItem>
            <ListItem component={Link} to="/AjouterPlat">
            <ListItemIcon><AjouterIcon/></ListItemIcon>
                <ListItemText>Ajouter Un Plat</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/Commande">
            <ListItemIcon><CommandeIcon/></ListItemIcon>
                <ListItemText>Commande</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/Stock">
            <ListItemIcon><StockIcon/></ListItemIcon>
            <ListItemText>Stock</ListItemText>
            </ListItem>
            <ListItem sx={{paddingTop:'220px'}}>
             <IconButton onClick={handleLogout} color='error'><BackIcon/>Deconnexion</IconButton>
            </ListItem>
        </List>
      </Drawer>
            <AppBar sx={{paddingLeft:"240px" , backgroundColor:'darkgreen'}}>
              <List sx={{display:'flex'}}>
                <ListItem>
                  <ListItemText>Restaurant</ListItemText>
                </ListItem>
                <List>
                 <ListItem  component={Link} to='/Message' sx={{justifyContent:'flex-end'}}>
                  <ListItemIcon>
                    <NoitificationIcon/>
                </ListItemIcon>
                </ListItem>
                </List>
                <List>
                  <ListItem component={Link} to='/Parametre' sx={{justifyContent:'flex-end'}}>
                  <ListItemIcon>
                   <ParametreIcon/>
                </ListItemIcon>
                </ListItem>
                </List>
              </List>
              </AppBar>

      </Box>
  )
}

export default Accuil
