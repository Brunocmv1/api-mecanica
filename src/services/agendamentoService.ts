import prisma from "../database/prisma";
import { Agendamento } from "../generated/prisma";

type AgendamentoCreateData = Omit<Agendamento, "id" | "createdAt" | "updatedAt">;
type AgendamentoUpdateData = Partial<Omit<Agendamento, "id" | "createdAt" | "updatedAt" | "clienteId" | "veiculoId">>;

export const create = async (data: AgendamentoCreateData): Promise<Agendamento> => {
    const { clienteId, veiculoId } = data;

    const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
    if (!cliente) throw new Error("Cliente não encontrado");

    const veiculo = await prisma.veiculo.findUnique({ where: { id: veiculoId } });
    if (!veiculo) throw new Error("Veículo não encontrado");

    if (veiculo.clienteId !== clienteId) {
        throw new Error('Este veículo não pertence ao cliente informado');
    }

    return prisma.agendamento.create({ data  });
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
    return prisma.agendamento.update({ where: { id }, data });
};

export const remove = async (id: number) => {
    return prisma.agendamento.delete({ where: { id } });
};
