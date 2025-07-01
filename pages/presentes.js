import React, { useEffect, useState } from 'react';
import api from '../app/api/actions';
import PropTypes from 'prop-types';
import { styled, ThemeProvider } from '@mui/material/styles';
import QRCode from 'react-qr-code';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import { fontTheme } from '@/app/page';
import { Fleur_De_Leah } from 'next/font/google';

import { 
  Modal, 
  Box, 
  TextField, 
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';

const fleurDeLeah = Fleur_De_Leah({
  variable: "--font-fleur-de-leah",
  subsets: ["latin"],
  weight: "400",
});

const giftTheme = {
  ...fontTheme,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '10px',
          borderRadius: '20px', // Example: rounded corners
          fontWeight: 'bold',   // Example: bold text
          textTransform: 'none', // Example: normal case
          // Add more custom styles as needed
        },
        containedPrimary: {
          backgroundColor: '#e2f0f1', // Custom primary color
          color: '#704526', // Custom text color
        },
      },
    },
  },
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  fontFamily: 'Arial, sans-serif',
  backgroundColor: theme.palette.background.default,
}));

const Presentes = ({onGiftClick}) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const data = await api.get('/gifts');
        setGifts(data.data); // Adjust if your API returns data in a different structure
      } catch (err) {
        setError('Erro ao carregar presentes!');
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );

  return (
    <ThemeProvider theme={giftTheme}>
      <StyledGrid container spacing={3}>
        <Grid item size={{ xs: 12 }}>
          <Typography variant="h3" sx={{fontSize: '40pt'}} gutterBottom align='center'>
            Presentes
          </Typography>
        </Grid>
        {gifts.map((gift) => (
          <Grid item size={{ xs: 12, md: 6 }} key={gift.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={
                  gift.link ||
                  'https://placehold.co/600x400?text=Imagem+Indisponível'
                }
                alt={gift.name}
              />
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="h6" component="div">
                      {gift.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {gift.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ marginTop: 1 }}>
                      <strong>Preço:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} container justifyContent="center" alignItems="center">
                    {gift.bought_by ? (
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        <strong>Comprado por:</strong><br/> {gift.bought_by}
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: '10px' }}
                        onClick={() => {onGiftClick(gift)}}
                      >
                        Presentear
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </StyledGrid>
    </ThemeProvider>
  );
};

Presentes.defaultProps = {
  onGiftClick: () => {},
};

Presentes.propTypes = {
  onGiftClick: PropTypes.func,
};

// export default Presentes;

const GiftModal = ({ open, onClose, gift }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('TEST-65ba5db5-d043-4748-9939-469dafa14cad')

  const onSubmitOrder = async (gift, guest) => {
    const data = await api.post('/preference', { 
      gift_id: gift.id,
      guest_name: guest.name,
      guest_last_name: guest.lastName,
      email: guest.email,
     });

    if (data.status === 200) {
      console.log('Order created successfully:', data.data);
      // setQrCode(data.data.qrcode);
      console.log(data);
      setPreferenceId(data.data.preference.id);
    }
  }

  const handleSubmit = () => {
    onSubmitOrder({id: gift.id}, { name, lastName, email });
    // setName('');
    // setEmail('');
    // onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80vw', md: '400px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          justifyItems: 'center',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Presentear: {gift.name}
        </Typography>
        <TextField
          fullWidth
          label="Seu Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Seu Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <div style={{ width: '300px' }}>
        { preferenceId &&
          <Wallet initialization={{ preferenceId: preferenceId }} 
            locale='pt-BR'
          />
        }
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Confirmar
        </Button>

        {qrCode && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Escaneie para confirmar com PIX:
            </Typography>
            <QRCode value={qrCode} />
            <TextField
              fullWidth
              label="Ou copie o código"
              value={qrCode}
              slotProps={{
                input: { readOnly: true },
              }}
              margin="normal"
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigator.clipboard.writeText(qrCode)}
              sx={{ mt: 2 }}
            >
              Copiar Código
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

const PresentesWithModal = () => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (gift) => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGift(null);
  };

  return (
    <>
      <Presentes onGiftClick={handleOpenModal} />
      {selectedGift && (
        <GiftModal
          open={modalOpen}
          onClose={handleCloseModal}
          gift={selectedGift}
        />
      )}
    </>
  );
};

export default PresentesWithModal;