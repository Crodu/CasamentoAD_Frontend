import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSessionToken } from '@/app/api/session';
import AdminLayout from '@/pages/admin/layout';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material';

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <Box>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <List>
          <ListItem>
            <Button variant="contained" color="primary" component={Link} href="/admin/guests">
              New Guest
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="secondary" component={Link} href="/admin/gifts">
              New Gift
            </Button>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}