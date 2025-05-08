import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { getSessionToken } from '@/app/api/session';
import api from '@/app/api/actions';

const NewGuest = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    // Fetch guests from the API
    api.get('/guests')
      .then((response) => {
        setGuests(response.data); // Adjust if your API returns data in a different structure
      })
      .catch((error) => {
        console.error('Error fetching guests:', error);
      });
  }, []);

  const handleAddNewGuest = () => {
    setNewGuest({ first_name: '', last_name: '', email: '', rsvpStatus: '' });
  };

  const handleSaveNewGuest = () => {
    api.post('/guests', newGuest)
      .then((response) => {
        setGuests([...guests, response.data]); // Add the new guest to the list
        setNewGuest(null); // Clear the form
      })
      .catch((error) => {
        console.error('Error saving new guest:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuest({ ...newGuest, [name]: value });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddNewGuest}>
        Add New Guest
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>RSVP Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.first_name}</TableCell>
                <TableCell>{guest.last_name}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>{guest.rsvpStatus}</TableCell>
              </TableRow>
            ))}
            {newGuest && (
              <TableRow>
                <TableCell>
                  <TextField
                    name="first_name"
                    value={newGuest.first_name}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="last_name"
                    value={newGuest.last_name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="email"
                    value={newGuest.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="rsvpStatus"
                    value={newGuest.rsvpStatus}
                    onChange={handleInputChange}
                    placeholder="RSVP Status"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={handleSaveNewGuest}>
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

export default NewGuest;