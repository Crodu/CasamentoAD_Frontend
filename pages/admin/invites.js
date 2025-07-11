import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { getSessionToken } from '@/app/api/session';
import api from '@/app/api/actions';
import AdminLayout from './layout';

const NewInvite = () => {
  const [invites, setInvites] = useState([]);
  const [newInvite, setNewInvite] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    // Fetch invites from the API
    api.get('/invites/all')
      .then((response) => {
        setInvites(response.data); // Adjust if your API returns data in a different structure
      })
      .catch((error) => {
        console.error('Error fetching invites:', error);
      });
  }, []);

  const handleAddNewInvite = () => {
    setNewInvite({ uuid: crypto.randomUUID(), name: '' });
  };

  const handleSaveNewInvite = () => {
    api.post('/invites', newInvite)
      .then((response) => {
        setInvites([...invites, response.data]); // Add the new invite to the list
        setNewInvite(null); // Clear the form
      })
      .catch((error) => {
        console.error('Error saving new invite:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvite({ ...newInvite, [name]: value });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddNewInvite} sx={{ mb: 2 }}>
        Add New Invite
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell>{invite.uuid}</TableCell>
                <TableCell>
                  <a href={`/?id=${invite.uuid}`} target="_blank" rel="noopener noreferrer">
                    {`/?id=${invite.uuid}`}
                  </a>
                </TableCell>
                <TableCell>{invite.guest?.name}</TableCell>
                <TableCell>{invite.guest?.cpf}</TableCell>
              </TableRow>
            ))}
            {newInvite && (
              <TableRow>
                <TableCell>
                  <TextField
                    name="uuid"
                    value={newInvite.uuid}
                    onChange={handleInputChange}
                    placeholder="UUID"
                  />
                </TableCell>
                <TableCell>
                  Novo Convidado
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={handleSaveNewInvite}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default function Invites() {
  return (
    <AdminLayout>
      <NewInvite />
    </AdminLayout>
  );
}
