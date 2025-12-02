import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Veiculo } from "../../types/veiculo";

interface VeiculosTableProps {
  veiculos: Veiculo[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (veiculos: Veiculo) => void; 
}

const VeiculosTable: React.FC<VeiculosTableProps> = ({
  veiculos,
  deletingId,
  onDelete,
  onEdit,
}) => {
  const colunas: string[] = [ "Modelo", "Ano", "Placa", "Chassi", "Cliente", "Ações", ];

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <TableContainer 
      component={Box}
      sx={{
        marginTop: 4,
        borderRadius: "18px", 
        backgroundColor: isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 22px rgba(0, 0, 0, 0.2)", 
        overflow: "hidden" ,
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
            {colunas.map((coluna) => (
              <TableCell
                key={coluna}
                align="center"
                sx={{
                  color: isDark ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)", 
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottom: "none"
                }}
              >
                {coluna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {veiculos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colunas.length}
                align="center"
                sx={{ py: 6, color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)", fontSize: "18px" }}
              >
                Nenhum veículo encontrado.
              </TableCell>
            </TableRow>
          ) : (
            veiculos.map((veiculo) => (
              <TableRow 
                key={veiculo.id} 
                sx={{
                  "&:hover": { 
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)" 
                  },  
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  transition: "background-color 0.2s"
                }}
              >
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{veiculo.modelo}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{veiculo.ano}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black"  }}>{veiculo.placa}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black"  }}>{veiculo.chassi}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black"  }}>{veiculo.cliente?.nome || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(veiculo)}
                        sx={{ 
                          color: isDark ? "white" : "black",
                          "&:hover": { backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton 
                        size="small"
                        onClick={() => onDelete(veiculo.id)}
                        disabled={deletingId === veiculo.id}
                        aria-label={`remover-${veiculo.id}`}
                        sx={{ 
                          color: "#d32f2f",
                          "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VeiculosTable;