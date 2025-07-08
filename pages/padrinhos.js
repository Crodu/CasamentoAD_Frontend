import "../app/globals.css";
import { fontTheme } from '@/app/page';
import { Container, Typography, Box, Card, CardContent, ThemeProvider, createTheme } from '@mui/material';
import Image from 'next/image';

import { Fleur_De_Leah } from 'next/font/google';

const fleurDeLeah = Fleur_De_Leah({
  variable: "--font-fleur-de-leah",
  subsets: ["latin"],
  weight: "400",
});

// Create a custom theme with a custom font for titles
const theme = {
  ...fontTheme,
  typography: {
    ...fontTheme.typography,
    h1: {
      ...fontTheme.typography?.h1,
      color: '#007ac0', // Dark brown color for the title
      fontFamily: `${fleurDeLeah.style.fontFamily}, ${fontTheme.typography?.h1?.fontFamily || ''}`,
    },
    h6: {
      ...fontTheme.typography?.h6,
      color: '#007ac0',
      textAlign: 'left',
    },
    body2: {
      fontFamily: 'Arial, sans-serif',
      color: '#14384f',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          backgroundColor: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(6px)',
        },
      },
    },
  },
};

const Padrinhos = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
              maxHeight: '100vh',
              height: '100vh',
              backgroundImage: 'url("./padrinhos.jpg")',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
       }}>
        <Container
          maxWidth="xl"
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '25.00%' },
              mt: { xs: 2, md: 4 },
              ml: { xs: 0, md: 10 },
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h1" component="h1" gutterBottom align="center">
                  Instruções para os Padrinhos
                </Typography>
                <Typography variant="body2" paragraph>
                  Queridos padrinhos e madrinhas, é uma honra tê-los ao nosso lado neste momento tão especial!
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Paleta de Cores
                </Typography>
                <Image
                  src="/paletadecores.png"
                  alt="Paleta de cores"
                  width={400}
                  height={200}
                  style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #ddd', height: 'auto' }}
                />
                <Typography variant="body2" paragraph>
                  Pedimos que as madrinhas escolham vestidos dentro das cores acima. Evitem branco, preto e estampas muito chamativas.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Traje dos Padrinhos
                </Typography>
                <Typography variant="body2" paragraph>
                  Sugerimos terno preto, camisa branca e gravata azul (que recebeu no seu convite).
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Outras Informações
                </Typography>
                <Typography variant="body2" paragraph>
                  Cheguem com <b>30 minutos de antecedência na igreja</b>, tirem muitas fotos e aproveitem a festa!
                </Typography>
                <Typography variant="body2" align="center" mt={3}>
                  Contamos com sua presença e apoio!
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Padrinhos;