import { useEffect, useState, useCallback, useMemo } from "react";
import type { Cliente } from "../types/cliente";
import { getClientes, deleteCliente } from "../services/clienteService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ClienteTable from "../components/clientes/ClienteTable";
import ClienteEdit from "../components/clientes/ClienteEdit";
import ClienteCreate from "../components/clientes/ClienteCreate";
import { useDebounce } from "../hooks/useDebounce";
import bg from '../assets/bg.jpg';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const SNACKBAR_DEFAULT: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
};

export const Clientes = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>(SNACKBAR_DEFAULT);
  const [ClienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [abrirModalCriar, setAbrirModalCriar] = useState(false);

  useEffect(() => {
    const carregarClientes = async () => {
      setLoading(true);
      try {
        const data = await getClientes();
        setClientes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        setSnackbar({ open: true, message: "Erro ao buscar clientes.", severity: "error", });
        setClientes([]);
      } finally {
        setLoading(false);
      }
    };
    carregarClientes();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      await deleteCliente(id);
      setClientes((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({ open: true, message: "Cliente removido.", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao deletar Cliente.", severity: "error" });
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleSaveCliente = useCallback((clienteAtualizado: Cliente) => {
    setClientes((prev) =>
      prev.map((p) => (p.id === clienteAtualizado.id ? clienteAtualizado : p))
    );
    setSnackbar({ open: true, message: "Atualizado com sucesso.", severity: "success" });
  }, []);

  const handleSucessoCriarCliente = useCallback(
    (novoCliente: Cliente) => {
      setClientes((prev) => [...prev, novoCliente]);
      setSnackbar({ open: true, message: "Cadastrado com sucesso.", severity: "success" });
    }, 
    []
  );

  const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase(), 300);

  const clientesFiltrados = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return clientes;
    return clientes.filter((c) => {
        return (
            c?.nome?.toLowerCase().includes(debouncedSearchTerm) ||
            c?.cpf?.toLowerCase().includes(debouncedSearchTerm) ||
            c?.telefone?.toLowerCase().includes(debouncedSearchTerm)
        );
    });
  }, [clientes, debouncedSearchTerm]);

  const InputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "18px",
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.4)",
      color: isDark ? "white" : "black",
      boxShadow: "0 8px 22px rgba(0, 0, 0, 0.2)",
      "& fieldset": { borderColor: "transparent" },
      "&.Mui-focused fieldset": {
        borderColor: isDark ? "white" : "black",
        borderWidth: "2px",
        boxShadow: "none"
      },
    },
    "& .MuiInputBase-input": { color: isDark ? "white" : "black" },
    "& .MuiSvgIcon-root": { color: isDark ? "white" : "black" }
  };

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      sx={{
        backgroundImage: `url(${bg})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: "all 0.3s ease"
      }}
    >
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 10 }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: "100%", fontSize: "17px", borderRadius: 3, 
            boxShadow: '0 8px 12px rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(144, 143, 143, 0.26)', color: "#fff"
          }}            
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Paper 
        elevation={3}
        sx={{
          width: "100%", maxWidth: 1100, p: 4, position: "relative",
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.42)",
          color: isDark ? "white" : "black",
          backdropFilter: "blur(4px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.55)",
          borderRadius: 4,
          transition: "background-color 0.3s ease, color 0.3s ease"
        }}
      >
        <IconButton
          onClick={() => navigate("/home")}
          size="small"
          sx={{ position: "absolute", left: 16, top: 16, color: isDark ? "white" : "black" }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h4" fontWeight={700} mb={4} textAlign="center"
          sx={{ textShadow: isDark ? "0 2px 10px rgba(0,0,0,1)" : "0 6px 22px rgba(255, 255, 255, 1)" }}
        >
          Clientes
        </Typography>

        <Box mb={4}>
          <TextField
            fullWidth
            placeholder="Buscar por Nome, CPF, Telefone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={InputStyle}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon /></InputAdornment>
                ),
              },
            }}
          />

          {debouncedSearchTerm && (
            <Box mt={2} display="flex" alignItems="center" gap={1} ml={1}>
              <Typography variant="body1" fontWeight={600}>Resultados:</Typography>
              <Chip
                label={clientesFiltrados.length}
                size="small"
                sx={{
                  backgroundColor: isDark ? "white" : "black", 
                  color: isDark ? "black" : "white", 
                  fontWeight: "bold"
                }}
              />
            </Box>
          )}
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
            <ClienteTable
              clientes={clientesFiltrados}
              deletingId={deletingId}
              onDelete={handleDelete}
              onEdit={(cliente: Cliente) => setClienteEditando(cliente)}
            />
        )}

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={() => setAbrirModalCriar(true)}
            sx={{                
              width: "50%",
              backgroundColor: isDark ? "white" : "black",
              color: isDark ? "black" : "white",
              borderRadius: "999px",
              paddingY: "12px",
              fontWeight: 600,
              fontSize: "16px",
              boxShadow: "0 8px 22px rgba(0, 0, 0, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isDark ? "#e0e0e0" : "#333",
                transform: "scale(1.02)"
              },
            }}
          >
            Novo Cliente
          </Button>
        </Box>       
      </Paper>

      <ClienteEdit
        open={ClienteEditando !== null}
        cliente={ClienteEditando}
        onClose={() => setClienteEditando(null)}
        onSave={handleSaveCliente}
      />

      <ClienteCreate
        open={abrirModalCriar}
        onClose={() => setAbrirModalCriar(false)}
        onSuccess={handleSucessoCriarCliente}
      />
    </Box>
  );
};

export default Clientes;