import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { getSessionToken } from '@/app/api/session';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import api from '@/app/api/actions';
import AdminLayout from './layout';

const NewGift = () => {
  const [gifts, setGifts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    // Fetch gifts from the API
    api.get('/gifts')
      .then((response) => {
        setGifts(response.data.map(
          gift => ({ ...gift, is_editing: false })
        ));
      })
      .catch((error) => {
        console.error('Error fetching gifts:', error);
      });
  }, []);

  const handleAddNewGift = () => {
    setGifts([...gifts, { id: Date.now(), name: '', description: '', price: '', link: '', is_editing: true }]);
  };

  const handleSaveGift = (id, updatedGift) => {
    const giftIndex = gifts.findIndex((gift) => gift.id === id);
    if (giftIndex !== -1) {
      const updatedGifts = [...gifts];
      updatedGifts[giftIndex] = { ...updatedGift, is_editing: false };

      if (id < 0) {
        // New gift (temporary ID), save to API
        api.post('/gifts', updatedGift)
          .then((response) => {
            updatedGifts[giftIndex] = { ...response.data, is_editing: false };
            setGifts(updatedGifts);
          })
          .catch((error) => {
            console.error('Error saving new gift:', error);
          });
      } else {
        // Existing gift, update API
        api.put(`/gifts/${id}`, updatedGift)
          .then(() => {
            setGifts(updatedGifts);
          })
          .catch((error) => {
            console.error('Error updating gift:', error);
          });
      }
    }
  };

  const handleEditGift = (id) => {
    setGifts(gifts.map((gift) =>
      gift.id === id ? { ...gift, is_editing: true } : gift
    ));
  };

  const handleCancelEdit = (id) => {
    if (id < 0) {
      // Remove unsaved new gift
      setGifts(gifts.filter((gift) => gift.id !== id));
    } else {
      setGifts(gifts.map((gift) =>
        gift.id === id ? { ...gift, is_editing: false } : gift
      ));
    }
  };

  const handleDeleteGift = (id) => {
    api.delete(`/gifts/${id}`)
      .then(() => {
        setGifts(gifts.filter((gift) => gift.id !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert('This gift is already assigned to a guest and cannot be deleted.');
        } else {
          console.error('Error deleting gift:', error);
        }
      });
  };

  const handleInputChange = (id, name, value) => {
    setGifts(gifts.map((gift) =>
      gift.id === id ? { ...gift, [name]: name === 'price' ? parseFloat(value) || '' : value } : gift
    ));
  };

  const EditableRow = ({ gift }) => (
    <TableRow>
      <TableCell>
        <TextField
          name="name"
          value={gift.name}
          onChange={(e) => handleInputChange(gift.id, e.target.name, e.target.value)}
          placeholder="Name"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="description"
          value={gift.description}
          onChange={(e) => handleInputChange(gift.id, e.target.name, e.target.value)}
          placeholder="Description"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="price"
          value={gift.price}
          onChange={(e) => handleInputChange(gift.id, e.target.name, e.target.value)}
          placeholder="Price"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="link"
          value={gift.link}
          onChange={(e) => handleInputChange(gift.id, e.target.name, e.target.value)}
          placeholder="Link"
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => handleSaveGift(gift.id, gift)}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={() => handleCancelEdit(gift.id)}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );

  const DisplayRow = ({ gift }) => {
    const truncateText = (text, maxLength) => 
      text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    const [copiedLink, setCopiedLink] = useState(null);

    const handleCopyLink = (link) => {
      navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(link);
      setTimeout(() => setCopiedLink(null), 2000); // Reset after 2 seconds
      }).catch((error) => {
      console.error('Error copying link:', error);
      });
    };

    return (
      <TableRow>
      <TableCell>{truncateText(gift.name, 50)}</TableCell>
      <TableCell>{truncateText(gift.description, 50)}</TableCell>
      <TableCell>{gift.price}</TableCell>
      <TableCell>
        {truncateText(gift.link, 50)}
        <Tooltip title={'Copied!'} open={copiedLink === gift.link}>
        <Button onClick={() => handleCopyLink(gift.link)}>
          <ContentCopyIcon />
        </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => handleEditGift(gift.id)}>
        Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => handleDeleteGift(gift.id)}>
        Delete
        </Button>
      </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddNewGift}>
        Add New Gift
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gifts.map((gift) =>
              gift.is_editing ? (
                <EditableRow key={gift.id} gift={gift} />
              ) : (
                <DisplayRow key={gift.id} gift={gift} />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default function AdminGifts() {
  return (
    <AdminLayout>
      <NewGift />
    </AdminLayout>
  );
}