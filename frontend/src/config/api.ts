export const getApiUrl = (): string => {
  
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (import.meta.env.PROD) {
    return "";
  }

  return "http://localhost:3333";
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  VEICULOS: `${API_BASE_URL}/veiculos`,
  CLIENTES: `${API_BASE_URL}/clientes`,
  AGENDAMENTOS: `${API_BASE_URL}/agendamentos`,
};