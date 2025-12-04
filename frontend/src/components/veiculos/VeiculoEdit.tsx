import { useState, useEffect, useCallback } from "react";
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
import { updateVeiculo } from "../../services/veiculoService";
import { getClientes } from "../../services/clienteService";
import { validateUpdateVeiculo } from "../../schemas/validation";
import type { UpdateVeiculoInput } from "../../schemas/veiculoSchema";

interface EditarVeiculoModalProps {
  open: boolean;
  veiculo: Veiculo | null;
  onClose: () => void;
  onSave: (veiculoAtualizado: Veiculo) => void;
}

export const VeiculoEdit = ({open, veiculo, onClose, onSave,}: EditarVeiculoModalProps) => {
  const EMPTY_FORM: UpdateVeiculoInput = {
    id: 0,
    modelo: "",
    ano: 0,
    placa: "",
    chassi: "",
    clienteId: null,
  };

  const [formData, setFormData] = useState<UpdateVeiculoInput>(EMPTY_FORM);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);
  const [loadingClientes] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        console.error("Erro carregando clientes:", err);
      }
    };
    if (open) fetchClientes();
  }, [open]);

  useEffect(() => {
    if (open && veiculo) {
      setFormData({
        id: veiculo.id,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        placa: veiculo.placa,
        chassi: veiculo.chassi,
        clienteId: veiculo.clienteId ?? null,
      });

      if (veiculo.clienteId) {
        const encontrado = clientes.find(c => c.id === veiculo.clienteId) || null;
        setClienteSelecionado(encontrado);
      } else {
        setClienteSelecionado(null);
      }
      setErrors({});
    }
  }, [open, veiculo, clientes]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleClienteChange = (_: any, novoCliente: Cliente | null) => {
    setClienteSelecionado(novoCliente);

    setFormData(prev => ({
      ...prev,
      clienteId: novoCliente ? novoCliente.id : null
    }));

    if (errors.clienteId) {
      setErrors(prev => ({ ...prev, clienteId: "" }));
    }
  };

  const handleSubmit = useCallback(async () => {
    const payload: UpdateVeiculoInput = {
      ...formData,
      ano: Number(formData.ano),
      clienteId: formData.clienteId ?? null,
    };

    const validation = validateUpdateVeiculo(payload);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setSalvando(true);

    try {
      const atualizado = await updateVeiculo(payload.id!, validation.data);
      onSave(atualizado);
      onClose();
      setErrors({});

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
  }, [formData, onSave, onClose]);

  if (!open) return null;

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
      onClose={onClose} 
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
      <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem", textAlign: "center", pb: 1 }}>
        Editar Veículo
      </DialogTitle>     
        
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>       
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>

          {errors.submit && (
            <Box
              sx={{
                mb: 1,
                p: 2,
                borderRadius: "8px",
                textAlign: "center",
                bgcolor: "#d32f2f",
                color: "white",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(211, 47, 47, 0.4)"
              }}
            >
              {errors.submit}
            </Box>
          )}
        
          <TextField
            label="Modelo"
            name="modelo"
            fullWidth
            value={formData.modelo || ''}
            onChange={handleInputChange}
            error={!!errors.modelo}
            helperText={errors.modelo}
            disabled={salvando}
            sx={InputTheme} 
          />

          <TextField
            label="Ano"
            name="ano"
            type="number"
            fullWidth
            value={formData.ano || ''}
            onChange={handleInputChange}
            error={!!errors.ano}
            helperText={errors.ano}
            disabled={salvando}
            sx={InputTheme}
          />

          <TextField
            label="Placa"
            name="placa"
            fullWidth
            value={formData.placa || ''}
            onChange={handleInputChange}
            error={!!errors.placa}
            helperText={errors.placa}
            disabled={salvando}
            sx={InputTheme}
          />

          <TextField
            label="Chassi"
            name="chassi"
            fullWidth
            value={formData.chassi || ''}
            onChange={handleInputChange}
            error={!!errors.chassi}
            helperText={errors.chassi}
            disabled={salvando}
            sx={InputTheme}
          />

          <Autocomplete
            options={clientes}       
            loading={loadingClientes}
            value={clienteSelecionado}
            onChange={handleClienteChange}
            getOptionLabel={(option) => option.nome}
            isOptionEqualToValue={(a, b) => a.id === b.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cliente (Opcional)"
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
            onClick={onClose} 
            color="inherit" 
            disabled={salvando}
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
            type="submit"
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

export default VeiculoEdit;
