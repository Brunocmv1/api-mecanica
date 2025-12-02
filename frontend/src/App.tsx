import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Veiculos from "./pages/Veiculos";
import Clientes from "./pages/Clientes";
import Agendamentos from "./pages/Agendamentos";
import { NavBar } from "./components/NavBar"; 
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { useState, useMemo } from "react";

const AppContent = ({ 
  toggleColorMode, 
  mode 
}: { 
  toggleColorMode: () => void, 
  mode: "light" | "dark" 
}) => {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  return (
    <Box>
      {showNavBar && <NavBar toggleColorMode={toggleColorMode} mode={mode} />} 
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
      </Routes>
    </Box>
  );
};

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => createTheme({ 
    palette: { 
      mode,
      ...(mode === 'dark' ? {
        background: {
          default: "#121212",
          paper: "#1e1e1e"
        }
      } : {
        background: {
          default: "#f5f5f5",
        }
      })
    } 
  }), [mode]);

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent toggleColorMode={toggleColorMode} mode={mode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;