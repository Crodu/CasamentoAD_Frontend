import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, Tooltip, Typography, Card, CardContent, CardActions } from '@mui/material';
import { useRouter } from 'next/router';
import { getSessionToken } from '@/app/api/session';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import api from '@/app/api/actions';
import AdminLayout from './layout';
import { useMediaQuery } from '@mui/material';
import UploadImageComponent from '@/app/components/uploadFile';


const NewGift = () => {
  const [gifts, setGifts] = useState([]);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
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
    setGifts([...gifts, { id: -1, name: '', description: '', price: '', link: '', is_editing: true }]);
  };

  const handleSaveGift = (id, updatedGift) => {
    const giftIndex = gifts.findIndex((gift) => gift.id === id);
    if (giftIndex !== -1) {
      const updatedGifts = [...gifts];
      updatedGifts[giftIndex] = { ...updatedGift, is_editing: false };

      if (id < 0) {
        api.post('/gifts', updatedGift)
          .then((response) => {
            updatedGifts[giftIndex] = { ...response.data, is_editing: false };
            setGifts(updatedGifts);
          })
          .catch((error) => {
            console.error('Error saving new gift:', error);
          });
      } else {
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

  const EditableCard = ({ gift }) => {
    const [localGift, setLocalGift] = useState({ ...gift });

    const handleLocalChange = (e) => {
      const { name, value } = e.target;
      setLocalGift((prev) => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || '' : value,
      }));
    };

    return (
      <Card>
        <CardContent>
          <TextField
            name="name"
            value={localGift.name}
            onChange={handleLocalChange}
            placeholder="Name"
            fullWidth
            margin="dense"
          />
          <TextField
            name="description"
            value={localGift.description}
            onChange={handleLocalChange}
            placeholder="Description"
            fullWidth
            margin="dense"
          />
          <TextField
            name="price"
            value={localGift.price}
            onChange={handleLocalChange}
            placeholder="Price"
            fullWidth
            margin="dense"
          />
          <TextField
            name="link"
            value={localGift.link}
            onChange={handleLocalChange}
            placeholder="Link"
            fullWidth
            margin="dense"
          />
          <UploadImageComponent
            gift={localGift}
            setLocalGift={setLocalGift}
          >
            
          </UploadImageComponent>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSaveGift(gift.id, localGift)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleCancelEdit(gift.id)}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    );
  };

  const DisplayCard = ({ gift }) => {
    const truncateText = (text, maxLength) =>
      text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    const [copiedLink, setCopiedLink] = useState(null);

    const handleCopyLink = (link) => {
      navigator.clipboard.writeText(link).then(() => {
        setCopiedLink(link);
        setTimeout(() => setCopiedLink(null), 2000);
      }).catch((error) => {
        console.error('Error copying link:', error);
      });
    };

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{truncateText(gift.name, 50)}</Typography>
          <Typography variant="body2">{truncateText(gift.description, 100)}</Typography>
          <Typography variant="body1">Price: {gift.price}</Typography>
          <Typography variant="body2"></Typography>
            Link: {truncateText(gift.link, 50)}
            <Tooltip title={'Copied!'} open={copiedLink === gift.link}>
              <Button onClick={() => handleCopyLink(gift.link)}>
                <ContentCopyIcon />
              </Button>
            </Tooltip>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={() => handleEditGift(gift.id)}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteGift(gift.id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddNewGift} fullWidth={isMobile}>
        Add New Gift
      </Button>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {gifts.map((gift) =>
          <Grid item xs={12} sm={6} md={4} key={gift.id}>
            {gift.is_editing ? (
              <EditableCard gift={gift} />
            ) : (
              <DisplayCard gift={gift} />
            )}
          </Grid>
        )}
      </Grid>
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
