import prisma from "../database/prisma";
import { Veiculo } from "../generated/prisma";

export type VeiculoCreateData = Omit<Veiculo, "id">;
export type VeiculoUpdateData = Partial<Omit<Veiculo, 'id'>>;

export const create = async (data: VeiculoCreateData): Promise<Veiculo> => {
    const { clienteId } = data

    if(clienteId){
        const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
        if (!cliente) throw new Error('Cliente não encontrado');
    }
    return prisma.veiculo.create({data: { ...data },});
};

export const getAll = async (): Promise<Veiculo[]> => {
    return prisma.veiculo.findMany({include: { cliente: { select: { nome: true, cpf: true } } }});
};

export const getById = async (id: number): Promise<Veiculo | null> => {
    return prisma.veiculo.findUnique({ where: { id }, include: { cliente: { select: { nome: true, cpf: true } } }});
};

export const getByCliente = async (id: number): Promise<Veiculo[] | null> => {
    const cliente = await prisma.cliente.findUnique({ where: { id: id } });
    if (!cliente) throw new Error("Cliente não encontrado");

    return prisma.veiculo.findMany({ where: { clienteId: cliente.id } });
};

export const update = async (id: number, data: VeiculoUpdateData): Promise<Veiculo> => {
    return prisma.veiculo.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Veiculo> => {
    return prisma.veiculo.delete({ where: { id } });
}