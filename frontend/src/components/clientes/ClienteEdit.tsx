import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import type { Cliente } from "../../types/cliente";
import { updateCliente } from "../../services/clienteService";
import { validateUpdateCliente } from "../../schemas/validation";
import type { UpdateClienteInput } from "../../schemas/clienteShema";

interface EditarClienteModalProps {
  open: boolean;
  cliente: Cliente | null;
  onClose: () => void;
  onSave: (clienteAtualizado: Cliente) => void;
}

export const ClienteEdit = ({open, cliente, onClose, onSave,}: EditarClienteModalProps) => {
  const EMPTY_FORM: UpdateClienteInput = {
    id: 0,
    nome: "",
    cpf: "",
    telefone: "",
  };

  const [formData, setFormData] = useState<UpdateClienteInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (cliente && open) {
      setFormData({...cliente});
      setErrors({});
    }
  }, [cliente, open]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  },
    []
  );

  const handleSubmit = useCallback(async () => {
    const validation = validateUpdateCliente(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setSalvando(true);

    try {
      const atualizado = await updateCliente(validation.data.id!, validation.data);
      onSave(atualizado);
      setErrors({});
      onClose();
            
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      const errorMessage =
      (error as any)?.response?.data?.message ||
      (error as any)?.response?.data?.error ||
      "Erro ao criar cliente. Tente novamente.";

      setErrors({ submit: errorMessage });
      
    } finally {
      setSalvando(false);
    }

  }, [formData, onSave, onClose]);

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
      <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem", textAlign: "center", pb: 1}}>
        Editar Cliente
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
            label="Nome"
            name="nome"
            fullWidth
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome completo"
            required
            error={!!errors.nome}
            helperText={errors.nome}
            sx={InputTheme}
          />
          <TextField            
            label="CPF"
            name="cpf"
            fullWidth
            value={formData.cpf}
            onChange={handleInputChange}
            placeholder="Digite o CPF"
            required
            error={!!errors.cpf}
            helperText={errors.cpf}
            sx={InputTheme}
          />

          <TextField          
            label="Telefone"
            name="telefone"
            fullWidth
            value={formData.telefone}
            onChange={handleInputChange}           
            placeholder="Digite o telefone"
            required
            error={!!errors.telefone}
            helperText={errors.telefone}
            sx={InputTheme}
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

export default ClienteEdit;
