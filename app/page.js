
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Container, Typography, Button, AppBar, Toolbar, Paper } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { ExpandMore, TextRotationAngledown } from "@mui/icons-material";
// import localFont from 'next/font/local';

// A romantic and elegant theme for the wedding website
let theme = createTheme({
  palette: {
    primary: {
      main: '#e2f0f1', // A warm, sophisticated brownish-pink
    },
    secondary: {
      main: '#FFF8E1', // A very light, creamy off-white
    },
    background: {
      default: '#fff9f0', // Light grey for overall background
      paper: '#FFFFFF',    // White for paper elements
    },
    text: {
      primary: '#8D6E63', // Dark brown for primary text
      secondary: '#795548', // Lighter brown for secondary text
    },
  },
  typography: {
    fontFamily: '"Times New Roman", "Georgia", serif',
    h1: {
      fontFamily: '"Fleur de Leah", cursive',
      fontWeight: 400,
      color: '#e2f0f1',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 400,
      color: '#e2f0f1',
    },
    h3: {
      fontFamily: '"Fleur de Leah", cursive',
      color: '#704526',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      color: '#704526',
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
          color: '#8D6E63',
          textShadow: 'none',
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

export const fontTheme = responsiveFontSizes(theme);

const Home = () => {

  const year = 2025;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Barra de Navegação Opcional */}

        {/* Seção Hero */}
        <Box
          className={styles.hero}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            minHeight: { xs: 350, md: 450 },
          }}
        >
          <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '3.5rem', md: '5rem' } }}>
            André & Diovana
          </Typography>
          <Typography variant="h5" component="p" sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, mb: 4 }}>
            08 . 11 . 2025
          </Typography>

          <Button variant="contained" color="primary" size="large" type="link" href="/padrinhos" sx={{ mb: 2 }}>
            Padrinhos
          </Button>
          <Button variant="contained" color="primary" size="large" type="link" href="/presentes" sx={{ mb: 2 }}>
            Presentes
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="#details"
            sx={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              mb: 0,
            }}
          >
            <ExpandMore sx={{
              animation: 'jump 1.2s infinite',
              '@keyframes jump': {
                '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
                '20%': { transform: 'translateX(-50%) translateY(-10px)' },
                '40%': { transform: 'translateX(-50%) translateY(0)' },
              },
            }} />
            Saiba mais
          </Button>
        </Box>
        {/* Área Principal de Conteúdo */}
        <Container maxWidth="md" sx={{
          py: { xs: 4, md: 8 },
          px: { xs: 0, md: 4 },
          flexGrow: 1,
          backgroundColor: '#fff9f0',
          backgroundImage: 'url(/leaves.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
        }} id="details">
          <Paper elevation={3} sx={{
            py: { xs: 3, md: 5 },
            px: { xs: 0, md: 5 },
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            backgroundImage: { xs: 'url(/setabaixo.png)', md: 'url(/seta.png)' },
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography variant="h3" align="center" gutterBottom>
              Detalhes do Casamento
            </Typography>
            <Typography variant="body1" align="center" paragraph sx={{ color: 'text.primary', maxWidth: '700px', margin: '0 2rem 1.5rem 2rem' }}>
              Iniciaremos nossas comemorações com uma cerimônia religiosa na Igreja São Jorge, localizada na Lagoa dos Esteves, em Balneário Rincão. A cerimônia será realizada no dia 08 de novembro de 2025, às 16h30.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Box
                sx={{
                  width: { xs: "100vw", sm: 350, md: 400 },
                  height: { xs: 250, sm: 250, md: 300 },
                  borderRadius: { xs: '0px', sm: "8px" },
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9091.962724846733!2d-49.294202!3d-28.844561!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9523d54cc7a71347%3A0xf8248fab24b3aa36!2sIgreja%20S%C3%A3o%20Jorge%20-%20Lagoa%20dos%20Esteves!5e1!3m2!1spt-BR!2sbr!4v1747703371406!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>
            <Typography variant="body1" align="center" paragraph sx={{ color: 'text.primary', maxWidth: '400px', margin: '0 2rem 1.5rem 2rem' }}>
              Findada a cerimônia religiosa, daremos início à recepção de convidados no salão de festas do condomínio Vila Suíça, iniciando-se às 18h.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Box
                sx={{
                  width: { xs: "100vw", sm: 350, md: 400 },
                  height: { xs: 250, sm: 250, md: 300 },
                  borderRadius: { xs: '0px', sm: "8px" },
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1136.4682151771915!2d-49.285728071444005!3d-28.847043823777096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUwJzQ5LjQiUyA0OcKwMTcnMDYuMyJX!5e1!3m2!1spt-BR!2sbr!4v1747703316053!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>

            <Image
              src="/AD.png"
              alt="Casamento"
              width={150}
              height={150}
              style={{ maxWidth: '100%', height: "80%", marginTop: '2rem' }}
            />

          </Paper>
        </Container>
        <Box sx={{ 
          py: 4, 
          px: 2, 
          flexGrow: 0,
          minHeight: '100vh',
          backgroundImage: 'url(/folha.jpg)',
          backgroundSize: 'cover',
          }}>
          
        </Box>
        <Box component="footer" sx={{ py: 4, px: 2, backgroundColor: '#ae9f84', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'black', fontFamily: '"Roboto", sans-serif' }}>
            © {year} Desenvolvido com 💖 por André e Diovana
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
