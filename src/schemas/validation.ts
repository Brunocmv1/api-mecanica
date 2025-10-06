import { z } from "zod";

export const createClienteSchema = z.object({
  cpf: z
    .string()
    .length(11, "CPF deve ter 11 caracteres")
    .regex(/^\d+$/, "CPF deve conter apenas números"),

  nome: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome pode ter no máximo 100 caracteres"),

  telefone: z
    .string()
    .min(9, "Telefone deve ter pelo menos 9 dígitos")
    .max(15, "Telefone inválido"),
});

export const updateClienteSchema = createClienteSchema.partial();

export const createVeiculoSchema = z.object({
  placa: z
    .string()
    .regex(/^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/, "Placa inválida. Formato permitido: ABC1234 ou ABC1D23"),
  
  chassi: z
    .string()
    //.length(17, "Chassi deve ter 17 caracteres")
    .regex(/^[A-Z0-9]+$/, "Chassi deve conter apenas letras maiúsculas e números"),

  modelo: z
    .string()
    .min(2, "Modelo deve ter pelo menos 2 caracteres")
    .max(100, "Modelo deve ter no máximo 100 caracteres"),

  ano: z
    .number()
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear() + 1, "Ano inválido")
    .optional(),

  clienteId: z
    .number()
    .int("ID do cliente deve ser um número inteiro")
    .positive("ID do cliente deve ser positivo")
    .optional(),
});

export const updateVeiculoSchema = createVeiculoSchema.partial();

export const createAgendamentoSchema = z.object({
  motivo: z
    .string()
    .min(2, "Motivo deve ter pelo menos 2 caracteres")
    .max(255, "Motivo deve ter no máximo 255 caracteres"),

  descricao: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),

  veiculoId: z
    .number()
    .int("ID do paciente deve ser um número inteiro")
    .positive("ID do paciente deve ser positivo"),

  clienteId: z
    .number()
    .int("ID do paciente deve ser um número inteiro")
    .positive("ID do paciente deve ser positivo"),
});

export const updateAgendamentoSchema = createAgendamentoSchema.partial();

export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

export type CreateClienteData = z.infer<typeof createClienteSchema>;
export type UpdateClienteData = z.infer<typeof updateClienteSchema>;
export type CreateVeiculoData = z.infer<typeof createVeiculoSchema>;
export type UpdateVeiculoData = z.infer<typeof updateVeiculoSchema>;
export type CreateAgendamentoData = z.infer<typeof createAgendamentoSchema>;
export type UpdateAgendamentoData = z.infer<typeof updateAgendamentoSchema>;

export type IdParam = z.infer<typeof idParamSchema>;