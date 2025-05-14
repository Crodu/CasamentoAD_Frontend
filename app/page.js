 
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Container, Typography, Button, AppBar, Toolbar, Paper } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// The 'Image' component from 'next/image' is already imported in your file.
// You might need to install Material-UI: npm install @mui/material @emotion/react @emotion/styled
// Also, ensure fonts like "Great Vibes" and "Roboto" are loaded in your project.
// You can use Google Fonts, e.g., by adding to your global CSS or layout:
// @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300;400;500;700&display=swap');

// A romantic and elegant theme for the wedding website
let theme = createTheme({
  palette: {
    primary: {
      main: '#8D6E63', // A warm, sophisticated brownish-pink
    },
    secondary: {
      main: '#FFF8E1', // A very light, creamy off-white
    },
    background: {
      default: '#F5F5F5', // Light grey for overall background
      paper: '#FFFFFF',    // White for paper elements
    },
    text: {
      primary: '#4E342E', // Dark brown for primary text
      secondary: '#795548', // Lighter brown for secondary text
    },
    },
    typography: {
    fontFamily: '"Times New Roman", "Georgia", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 400,
      color: '#e2f0f1', // Blue-ish color for main heading
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 400,
      color: '#e2f0f1',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      color: '#704526',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      color: '#e2f0f1',
    },
    body1: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Times New Roman", serif',
      fontWeight: 500,
      textTransform: 'none', // Keep button text case as is
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded buttons
        },
        containedPrimary: {
          color: '#FFFFFF', // White text on primary buttons
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for paper elements
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Barra de Navegação Opcional */}

        {/* Seção Hero */}
        <Box
          className={styles.hero}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '3.5rem', md: '5rem' } }}>
            André & Diovana
          </Typography>
          <Typography variant="h5" component="p" sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, mb: 4 }}>
            08/11/2025
          </Typography>
          <Button variant="contained" color="primary" size="large" href="#details" sx={{ mb: 2 }}>
            Saiba mais
          </Button>
          <Button variant="contained" color="primary" size="large" type="link" href="/presentes">
            Presentes
          </Button>
        </Box>

        {/* Área Principal de Conteúdo */}
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, px: {xs: 0, md: 4}, flexGrow: 1 }} id="details">
          <Paper elevation={3} sx={{ py: { xs: 3, md: 5 }, px: {xs: 0, md: 5}, backgroundColor: 'background.paper' }}>
            <Typography variant="h3" align="center" gutterBottom>
              Faça parte do nosso dia!
            </Typography>
            <Typography variant="body1" align="center" paragraph sx={{ color: 'text.primary', maxWidth: '700px', margin: '0 2rem 1.5rem 2rem' }}>
              Estamos muito felizes em convidá-lo para celebrar nosso casamento. Sua presença significa o mundo para nós enquanto embarcamos neste novo capítulo juntos.
              Encontre todos os detalhes que você precisa neste site e, por favor, não hesite em entrar em contato caso tenha alguma dúvida.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Box
                sx={{
                  width: { xs: "100vw", sm: 350, md: 400 },
                  height: { xs: 250, sm: 250, md: 300 },
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.8084781913876!2d-49.297570256826404!3d-28.844561495454627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9523d54cc7a71347%3A0xf8248fab24b3aa36!2sIgreja%20S%C3%A3o%20Jorge%20-%20Lagoa%20dos%20Esteves!5e0!3m2!1spt-BR!2sbr!4v1747183576285!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>

            <Typography variant="body1" align="center" sx={{ color: 'text.primary' }}>
              Com todo o nosso amor,
            </Typography>
            <Typography variant="h4" align="center" sx={{ mt: 1 }}>
              André & Diovana
            </Typography>
          </Paper>
        </Container>
        <Box component="footer" sx={{ py: 4, px: 2, backgroundColor: 'primary.main', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'secondary.main', fontFamily: '"Roboto", sans-serif' }}>
              © {new Date().getFullYear()} André & Diovana
            </Typography>
          </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
