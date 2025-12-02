import prisma from "../database/prisma";
import { Cliente } from "../generated/prisma";

export type ClienteCreateData = Omit<Cliente, "id">;
export type ClienteUpdateData = Partial<Omit<Cliente, "id">>;

export const create = async (data: ClienteCreateData): Promise<Cliente> => {
    return prisma.cliente.create({data: { ...data },});
};

export const getAll = async (): Promise<Cliente[]> => {
    return prisma.cliente.findMany({include: { veiculos: { select: { placa: true ,modelo: true, ano: true } } }});
};

export const getById = async (id: number): Promise<Cliente | null> => {
    return prisma.cliente.findUnique({ where: { id }, include: { veiculos: { select: { placa: true ,modelo: true, ano: true } } } });
};

export const update = async (id: number, data: ClienteUpdateData): Promise<Cliente> => {
    return prisma.cliente.update({ where: { id }, data: {...data } });
};

export const remove = async (id: number): Promise<Cliente> => {
    return prisma.cliente.delete({ where: { id } });
}