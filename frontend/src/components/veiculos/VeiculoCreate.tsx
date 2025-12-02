import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Autocomplete,
  useTheme
} from "@mui/material";

import type { Veiculo } from "../../types/veiculo";
import type { Cliente } from "../../types/cliente";
import { createVeiculo } from "../../services/veiculoService";
import { getClientes } from "../../services/clienteService";
import { validateCreateVeiculo } from "../../schemas/validation";

interface VeiculoCreateProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (novoVeiculo: Veiculo) => void;
}

export const VeiculoCreate = ({ open, onClose, onSuccess }: VeiculoCreateProps) => {
  const INITIAL_FORM_DATA = {
    placa: "",
    chassi: "",
    modelo: "",
    ano: "",
    clienteId: undefined as number | undefined,
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
      }
    };

    if (open) fetchClientes();
  }, [open]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(async () => {
    const validation = validateCreateVeiculo(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setSalvando(true);
    try {
      const novoVeiculo = await createVeiculo(validation.data);
      onSuccess(novoVeiculo);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      onClose();

    } catch (error) {
      console.error("Erro ao criar veículo:", error);
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as any)?.response?.data?.error ||
        "Erro ao criar veículo. Tente novamente.";

      setErrors({ submit: errorMessage });
    } finally {
      setSalvando(false);
    }
  }, [formData, onSuccess, onClose]);

  const handleClose = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    onClose();
  }, [onClose]);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const InputTheme = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "18px",
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
      color: isDark ? "white" : "black",
      "& fieldset": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: isDark ? "white" : "black",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": { 
      color: isDark ? "white" : "black" 
    },
    "& .MuiSvgIcon-root": {
      color: isDark ? "white" : "black"
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
            color: isDark ? "white" : "black",          
            p: 1
          }
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem", textAlign: "center" }}>
        Novo Veículo 
      </DialogTitle>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>       
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>

          {errors.submit && (
            <Box
              sx={{
                mb: 1,
                p: 2,
                borderRadius: "8px",
                bgcolor: "#d32f2f",
                color: "white",
                fontWeight: 600,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(211, 47, 47, 0.4)"
              }}
            >
              {errors.submit}
            </Box>
          )}         
          
          <TextField           
            label="Placa"
            name="placa"
            fullWidth
            value={formData.placa}
            onChange={handleInputChange}
            placeholder="ABC1234 ou ABC1D23"
            required
            error={!!errors.placa}
            helperText={errors.placa}
            sx={InputTheme}
          />

          <TextField           
            label="Chassi"
            name="chassi"
            fullWidth
            value={formData.chassi}
            onChange={handleInputChange}
            placeholder="Digite o chassi"
            required
            error={!!errors.chassi}
            helperText={errors.chassi}
            sx={InputTheme}
          />

          <TextField           
            label="Modelo"
            name="modelo"
            fullWidth
            value={formData.modelo}
            onChange={handleInputChange}
            placeholder="Ex: BMW M4"
            required
            error={!!errors.modelo}
            helperText={errors.modelo}
            sx={InputTheme}
          />

          <TextField           
            label="Ano"
            name="ano"
            fullWidth
            value={formData.ano}
            onChange={handleInputChange}
            placeholder="YYYY"
            required
            error={!!errors.ano}
            helperText={errors.ano}
            sx={InputTheme}
          />

          <Autocomplete
            options={clientes}
            getOptionLabel={(c) => `${c.nome} - ${c.cpf}`}
            onChange={(_, value) =>
            setFormData((prev) => ({...prev, clienteId: value?.id,}))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cliente"
                name="cliente"
                placeholder="Selecione o Cliente"
                error={!!errors.clienteId}
                helperText={errors.clienteId}
                sx={InputTheme}
              />
            )}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: isDark ? "#1e1e1e" : "white",
                  color: isDark ? "white" : "black",
                }
              }
            }}            
          />   
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleClose}
            color="inherit"
            sx={{
              fontWeight: 600,
              color: isDark ? "#aaa" : "#555",
              textTransform: "none",
              fontSize: "1rem"
            }}
          >
            Cancelar
          </Button>

          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={salvando}
            sx={{
              backgroundColor: isDark ? "white" : "black",
              color: isDark ? "black" : "white",
              borderRadius: "999px",
              paddingX: 5,
              paddingY: 1.2,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
              "&:hover": {
                backgroundColor: isDark ? "#e0e0e0" : "#333",
                boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
              },
              "&.Mui-disabled": {
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                  color: "rgba(0, 0, 0, 0.26)"
              }
            }}
          >
            {salvando ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                <span>Salvando...</span>
              </Box>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default VeiculoCreate;
