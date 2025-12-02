export type Agendamento = {
  id: number;
  motivo: string;
  descricao?: string | null;
  veiculoId: number;
  clienteId: number;
  createdAt: string;

  veiculo?: {
    id: number;
    modelo: string;
    placa: string;
  };

  cliente?: {
    id: number;
    nome: string;
    cpf: string;
  };
};