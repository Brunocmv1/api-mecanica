import { z } from "zod";

const nonEmpyString = z.string().trim().min(1, "Este campo é obrigatório.");
const maxYear = new Date().getFullYear() + 1;

export const createVeiculoSchema = z.object({
  placa: nonEmpyString.pipe(
    z.string().regex(
      /^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/, 
      "Placa inválida. Formatos permitidos: ABC1234 ou ABC1D23"
    )
  ),

  chassi: nonEmpyString.pipe(
    z.string()
      //.length(17, "O Chassi deve ter exatamente 17 caracteres.")
      .regex(/^[A-Z0-9]+$/, "Chassi deve conter apenas letras maiúsculas e números")
  ),

  modelo: nonEmpyString.pipe(
    z.string()
      .min(2, "Modelo deve ter pelo menos 2 caracteres")
      .max(100, "Modelo deve ter no máximo 100 caracteres")
  ),

  ano: z
    .string()
    .min(1, "O Ano é obrigatório.")
    .transform((val, ctx) => {
      const num = parseInt(val, 10);
      if (isNaN(num)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ano inválido." });
        return z.NEVER;
      }
      return num;
    })
    .refine(num => num >= 1900, "Ano inválido.")
    .refine(num => num <= maxYear, `O ano não pode ser maior que ${maxYear}.`),
    
  clienteId: z
    .number()
    .nullable()
    .optional()
    .transform(val => val === undefined ? null : val),
});

export const updateVeiculoSchema = z.object({
  id: z.number().int().min(0, "ID inválido."),

  placa: z
    .string()
    .trim()
    .min(1, "Placa é obrigatória")
    .regex(
      /^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/,
      "Placa inválida"
    ),

  chassi: z
    .string()
    .trim()
    .min(1, "Chassi é obrigatório")
    .regex(/^[A-Z0-9]+$/, "Chassi inválido"),

  modelo: z.string().trim().min(2, "Modelo inválido"),

  ano: z
    .number()
    .min(1900, "Ano inválido.")
    .max(maxYear, `Ano não pode ser maior que ${maxYear}.`),

  clienteId: z
    .number()
    .nullable()
    .optional()
    .transform(val => val === undefined ? null : val),

});

export type CreateVeiculoInput = z.infer<typeof createVeiculoSchema>;
export type UpdateVeiculoInput = z.infer<typeof updateVeiculoSchema>;