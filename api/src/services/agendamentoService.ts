import prisma from "../database/prisma";
import type { Agendamento } from "../generated/prisma";

export type AgendamentoCreateData = { motivo: string; descricao?: string; veiculoId: number;};
type AgendamentoUpdateData = Partial<Omit<Agendamento, "id" | "createdAt" | "updatedAt">>;

export const create = async (data: AgendamentoCreateData): Promise<Agendamento> => {
    const { veiculoId, motivo, descricao } = data;

    const veiculo = await prisma.veiculo.findUnique({ 
        where: { id: veiculoId },
        include: { cliente: true },
    });

    if (!veiculo) throw new Error("Veículo não encontrado");
    if (!veiculo.cliente) throw new Error("Veículo não possui cliente associado");

    return prisma.agendamento.create({
        data: { motivo, descricao, veiculo: { connect: { id: veiculo.id } }, cliente: { connect: { id: veiculo.cliente.id } },},
        include: {
            veiculo: true,
            cliente: true,
        },
    });
};

export const getAll = async () => {
    return prisma.agendamento.findMany({
    include: {
        cliente: { select: { nome: true, cpf: true } },
        veiculo: { select: { placa: true, modelo: true, ano: true } },
    },
    });
};

export const getByVeiculo = async (id: number) => {
    const veiculo = await prisma.veiculo.findUnique({ where: { id: id } });
    if (!veiculo) throw new Error("Veículo não encontrado");

    return prisma.agendamento.findMany({
        where: { veiculoId: veiculo.id },
        include: {
            cliente: { select: { nome: true, cpf: true } },
            veiculo: { select: { placa: true, modelo: true, ano: true } },
        },
    });
};

export const getByCliente = async (id: number) => {
    const cliente = await prisma.cliente.findUnique({ where: { id: id } });
    if (!cliente) throw new Error("Cliente não encontrado");

    return prisma.agendamento.findMany({ where: { clienteId: cliente.id },
        include: {
            cliente: { select: { nome: true, cpf: true } },
            veiculo: { select: { placa: true, modelo: true, ano: true } },
        },
    });
};

export const update = async (id: number, data: AgendamentoUpdateData) => {
    if (data.veiculoId !== undefined) {
        const veiculo = await prisma.veiculo.findUnique({ where: { id: data.veiculoId } });
        if (!veiculo) throw new Error("Veículo não encontrado");
        if (veiculo.clienteId === null) throw new Error("Veículo não possui cliente associado");

        data.clienteId = veiculo.clienteId;
    }
    return prisma.agendamento.update({where: { id }, data,
        include: {
            veiculo: true,
            cliente: true,
        }
    });    
};

export const remove = async (id: number) => {
    return prisma.agendamento.delete({ where: { id } });
};
