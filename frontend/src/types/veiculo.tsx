export interface Veiculo {
  id: number;
  placa: string;
  chassi: string;
  modelo: string;
  ano: number;
  clienteId?: number | null;
  cliente?: {
    id: number | null;
    nome: string;
    cpf: string;
  };
}