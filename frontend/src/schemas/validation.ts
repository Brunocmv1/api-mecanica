import { z } from "zod";
import { createVeiculoSchema, updateVeiculoSchema } from "./veiculoSchema";
import { createClienteSchema, updateClienteSchema } from "./clienteShema";
import { loginSchema } from "./loginSchema";
import { createAgendamentoSchema, updateAgendamentoSchema } from "./agendamentoSchema";

export const validateCreateVeiculo = (data: unknown) => {
  try {
    const validatedData = createVeiculoSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateUpdateVeiculo = (data: unknown) => {
  try {
    const validatedData = updateVeiculoSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateCreateCliente = (data: unknown) => {
  try {
    const validatedData = createClienteSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateUpdateCliente = (data: unknown) => {
  try {
    const validatedData = updateClienteSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateLogin = (data: unknown) => {
  try {
    const validatedData = loginSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateCreateAgendamento = (data: unknown) => {
  try {
    const validatedData = createAgendamentoSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateUpdateAgendamento = (data: unknown) => {
  try {
    const validatedData = updateAgendamentoSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0]);
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateField = (
  schema: z.ZodObject<any>,
  fieldName: string,
  value: any
): string => {
  try {
    const fieldSchema = schema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
    }
    return "";
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || "Valor inválido";
    }
    return "";
  }
};