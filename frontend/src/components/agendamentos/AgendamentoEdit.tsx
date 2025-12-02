import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  useTheme
} from "@mui/material";
import { updateAgendamentoSchema } from "../../schemas/agendamentoSchema";
import type { Veiculo } from "../../types/veiculo";
import { getVeiculos } from "../../services/veiculoService";

interface AgendamentoEditProps {
  open: boolean;
  handleClose: () => void;
  agendamento: {
    id: number;
    motivo: string;
    descricao?: string | null;
    veiculoId: number;
  };
  onSave: (id: number, dados: any) => Promise<void>;
}

export const AgendamentoEdit = ({
  open,
  handleClose,
  agendamento,
  onSave,
}: AgendamentoEditProps) => {
  const [formData, setFormData] = useState({
    motivo: "",
    descricao: "",
    veiculoId: 0,
  });

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (agendamento) {
      setFormData({
        motivo: agendamento.motivo,
        descricao: agendamento.descricao || "",
        veiculoId: agendamento.veiculoId,
      });
    }
  }, [agendamento]);

  useEffect(() => {
    getVeiculos().then(setVeiculos);
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setErrors({});

    const result = updateAgendamentoSchema.safeParse({
      ...formData,
      veiculoId: Number(formData.veiculoId),
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    setSalvando(true);
    try {
      await onSave(agendamento.id, {
        motivo: formData.motivo,
        descricao: formData.descricao || "",
        veiculoId: Number(formData.veiculoId),
      });

      handleClose();
    } finally {
      setSalvando(false);
    }
  };

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
        Editar Agendamento
      </DialogTitle>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>       
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>

          <TextField            
            label="Motivo"
            name="motivo"        
            fullWidth
            value={formData.motivo}
            onChange={(e) => handleChange("motivo", e.target.value)}
            placeholder="Digite o Motivo"
            required
            error={!!errors.motivo}
            helperText={errors.motivo}
            multiline 
            rows={2}
            sx={InputTheme}
          />

          <TextField
            label="Descrição (opcional)"
            name="descricao"
            fullWidth
            value={formData.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            placeholder="Descrição"
            error={!!errors.descricao}
            helperText={errors.descricao}
            multiline
            rows={3}                    
            sx={InputTheme}
          />

          <TextField          
            label="Veículo"
            name="veiculo"
            fullWidth
            select
            value={formData.veiculoId}
            onChange={(e) => handleChange("veiculoId", Number(e.target.value))}
            error={!!errors.veiculoId}
            helperText={errors.veiculoId}
            sx={InputTheme}
          >
            <MenuItem value={0}>Selecione um veículo</MenuItem>
            {veiculos.map((v) => (
              <MenuItem key={v.id} value={v.id}>
                {v.modelo} - {v.placa}
              </MenuItem>
            ))}
          </TextField>     
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
                <CircularProgress size={20} sx={{ mr: 1, color: "inherit"}} />
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

export default AgendamentoEdit;
