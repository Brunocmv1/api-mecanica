import { Box, Button, Paper, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bg from '../assets/bg.jpg';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const buttonStyle = {
    backgroundColor: isDark ? "rgba(0, 0, 0, 0.52)" : "rgba(255, 255, 255, 0.42)",
    color: isDark ? "white" : "black",
    
    width: 250,
    height: 240,
    borderRadius: 6,
    fontSize: "1.1rem",
    fontWeight: 600,
    boxShadow: "0 8px 22px rgba(0, 0, 0, 0.4)",
    transition: "all 0.3s ease",
    
    "&:hover": {
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
      color: isDark ? "black" : "white",
      transform: "scale(1.02)",
      boxShadow: isDark 
        ? "0 8px 22px rgba(255, 255, 255, 0.2)" 
        : "0 8px 22px rgba(255, 255, 255, 0.4)",
    },
  };

  return (
    <Box position="relative" minHeight="100vh" width="100vw">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${bg})`,
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: "all 0.3s ease"
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            width: 620,
            height: 600,
            borderRadius: 5,
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.42)",
            color: isDark ? "white" : "black",       
            backdropFilter: "blur(4px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.55)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "background-color 0.3s ease"
          }}  
        >
          <Box 
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={5}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/clientes")}
              sx={buttonStyle}
            >
              Clientes
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/veiculos")}
              sx={buttonStyle}
            >
              Veículos
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/agendamentos")}
              sx={buttonStyle}
            >
              Agendamentos
            </Button>
            
            {/* Se quiser adicionar um 4º botão para fechar o grid (ex: Relatórios ou Sair) */}
            {/* <Button variant="contained" sx={buttonStyle}>Sair</Button> */}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;    