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
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Agendamento } from "../../types/agendamento";

interface AgendamentosTableProps {
  agendamentos: Agendamento[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (agendamentos: Agendamento) => void;
}

const AgendamentoTable: React.FC<AgendamentosTableProps> = ({
  agendamentos,
  deletingId,
  onDelete,
  onEdit,
}) => {

  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const colunas: string[] = [
    "Motivo",
    "Descrição",
    "Data",
    "Veículo",
    "Cliente",
    "Ações",
  ];

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
          <TableRow sx={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}>
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
          {agendamentos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colunas.length}
                align="center"
                sx={{ py: 6, color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)", fontSize: "18px" }}
              >
                Nenhum agendamento encontrado.
              </TableCell>
            </TableRow>
          ) : (
            agendamentos.map((agendamento) => (
              <TableRow 
                key={agendamento.id} 
                sx={{
                  "&:hover": { 
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)" 
                  },  
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                  transition: "background-color 0.2s"
                }}
              >

                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{agendamento.motivo}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{agendamento.descricao}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{formatDate(agendamento.createdAt)}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{agendamento.veiculo?.modelo || 'N/A'}</TableCell>
                <TableCell align="center" sx={{ fontSize: "15px", color: isDark ? "white" : "black" }}>{agendamento.cliente?.nome || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(agendamento)}
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
                        onClick={() => onDelete(agendamento.id)}
                        disabled={deletingId === agendamento.id}
                        aria-label={`remover-${agendamento.id}`}
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

export default AgendamentoTable;