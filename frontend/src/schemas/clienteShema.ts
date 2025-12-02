import { z } from "zod";

export const createClienteSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome não pode ter mais de 255 caracteres"),

  cpf: z
    .string()
    .length(11, "CPF deve ter 11 caracteres")
    .regex(/^\d+$/, "CPF deve conter apenas números"),

  telefone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos")

});

export const updateClienteSchema = createClienteSchema.extend({
  id: z.number(),
});

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;