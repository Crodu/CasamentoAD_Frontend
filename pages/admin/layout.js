import React from 'react';
import { Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, Typography, Box } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f5f5f5' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} href="/admin/dashboard" sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} href="/admin/guests" sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <ListItemText primary="Guests" />
            </ListItem>
            <ListItem button component={Link} href="/admin/gifts" sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <ListItemText primary="Gifts" />
            </ListItem>
            <ListItem disabled sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f4f4f4',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;