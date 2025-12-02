import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import AgendamentoCreate from "../components/agendamentos/AgendamentoCreate";
import AgendamentoEdit from "../components/agendamentos/AgendamentoEdit";
import AgendamentoTable from "../components/agendamentos/AgendamentoTable";
import type { Agendamento } from "../types/agendamento";
import bg from '../assets/bg.jpg';
import {
  getAgendamentos,
  deleteAgendamento,
  updateAgendamento,
  createAgendamento,
} from "../services/agendamentoService";

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

const AgendamentosPage = () => {
  const navigate = useNavigate();

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>(SNACKBAR_DEFAULT);
  const [AgendamentoEditando, setAgendamentoEditando] = useState<Agendamento | null>(null);
  const [abrirModalCriar, setAbrirModalCriar] = useState(false);

  useEffect(() => {
    const loadAgendamentos = async () => {
      setLoading(true);
      try {
        const data = await getAgendamentos();
        setAgendamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setSnackbar({ open: true, message: "Erro ao buscar agendamentos.", severity: "error", });
        setAgendamentos([]);
      } finally {
        setLoading(false);
      }
    };
    loadAgendamentos();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.toLowerCase());
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const agendamentosFiltrados = agendamentos.filter((a) => {
    if (!debouncedSearchTerm) return true;

    return (
      a.motivo.toLowerCase().includes(debouncedSearchTerm) ||
      a.descricao?.toLowerCase().includes(debouncedSearchTerm) ||
      a.veiculo?.modelo.toLowerCase().includes(debouncedSearchTerm)
    );
  });

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      await deleteAgendamento(id);
      setAgendamentos((prev) => prev.filter((a) => a.id !== id));
      setSnackbar({ open: true, message: "Agendamento removido.", severity: "success", });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao deletar agendamento.", severity: "error", });
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleSaveEdit = async (
    id: number,
    dados: { motivo: string; descricao?: string; veiculoId: number }
  ) => {
    try {
      const atualizado = await updateAgendamento(id, dados);

      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? atualizado : a))
      );

      setSnackbar({
        open: true,
        message: "Agendamento atualizado com sucesso.",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Erro ao atualizar agendamento.",
        severity: "error",
      });
    }
  };

  const handleSaveCreate = async (dados: {
    motivo: string;
    descricao?: string;
    veiculoId: number;
  }) => {
    try {
      const novoAgendamento = await createAgendamento(dados);
      setAgendamentos((prev) => [...prev, novoAgendamento]);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
          Agendamentos
        </Typography>

        <Box mb={4}>
          <TextField
            fullWidth
            placeholder="Buscar por Motivo, Descrição ou Veículo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={InputStyle}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon/></InputAdornment>
                ),
              },
            }}
          />

          {debouncedSearchTerm && (
            <Box mt={2} display="flex" alignItems="center" gap={1} ml={1}>
              <Typography variant="body1" fontWeight={600} color="inherit">
                Resultados encontrados:
              </Typography>

              <Chip 
                label={agendamentosFiltrados.length}
                size="small" 
                sx={{
                  backgroundColor: isDark ? "white" : "black", 
                  color: isDark ? "black" : "white", 
                  fontWeight: "bold"
                }}
              />

              {agendamentosFiltrados.length !== agendamentos.length && (
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  de {agendamentos.length} total
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (    
            <AgendamentoTable
              agendamentos={agendamentosFiltrados}
              deletingId={deletingId}
              onDelete={handleDelete}
              onEdit={setAgendamentoEditando}
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
            Novo Agendamento
          </Button>
        </Box>        
      </Paper>

      {AgendamentoEditando && (
        <AgendamentoEdit
          open={!!AgendamentoEditando}
          agendamento={AgendamentoEditando}
          handleClose={() => setAgendamentoEditando(null)}
          onSave={handleSaveEdit}
        />
      )}

      {abrirModalCriar && (
        <AgendamentoCreate
          open={abrirModalCriar}
          handleClose={() => setAbrirModalCriar(false)}
          onSave={handleSaveCreate}
        />
      )}  
    </Box>
  );
};

export default AgendamentosPage;