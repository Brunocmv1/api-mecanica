import { z } from "zod";

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
    .int("ID do veículo deve ser inteiro")
    .positive("ID do veículo deve ser positivo"),
});

export const updateAgendamentoSchema = createAgendamentoSchema.partial();
