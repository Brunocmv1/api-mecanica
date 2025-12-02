import axios from "axios";
import type { Veiculo } from "../types/veiculo";
import { API_ENDPOINTS } from "../config/api";

export const getVeiculos = async (): Promise<Veiculo[]> => {
  const res = await axios.get<Veiculo[]>(API_ENDPOINTS.VEICULOS);
  return res.data;
};

export const deleteVeiculo = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.VEICULOS}/${id}`);
};

export const updateVeiculo = async (id: number, dados: Veiculo): Promise<Veiculo> => {
  const res = await axios.put<Veiculo>(`${API_ENDPOINTS.VEICULOS}/${id}`, dados);
  return res.data;
};

export const createVeiculo = async (dados: Omit<Veiculo, "id">): Promise<Veiculo> => {
  const res = await axios.post<Veiculo>(API_ENDPOINTS.VEICULOS, dados);
  return res.data;
};

export default {
  getVeiculos,
  deleteVeiculo,
  updateVeiculo,
  createVeiculo,
};