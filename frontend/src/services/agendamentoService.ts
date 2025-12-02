import axios from "axios";
import type { Agendamento } from "../types/agendamento";
import { API_ENDPOINTS } from "../config/api";

export const createAgendamento = async (dados: { motivo: string; descricao?: string; veiculoId: number }): Promise<Agendamento> => {
  const response = await axios.post(API_ENDPOINTS.AGENDAMENTOS, dados, {});
  return response.data;
};

export const getAgendamentos = async (): Promise<Agendamento[]> => {
  const response = await axios.get(API_ENDPOINTS.AGENDAMENTOS);
  return response.data;
};

export const deleteAgendamento = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.AGENDAMENTOS}/${id}`);
};

export const updateAgendamento = async (id: number, dados: Partial<Agendamento>): Promise<Agendamento> => {
  const response = await axios.put(`${API_ENDPOINTS.AGENDAMENTOS}/${id}`, dados, {});
  return response.data;
};

