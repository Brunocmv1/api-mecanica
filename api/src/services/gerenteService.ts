import  prisma  from "../database/prisma";
import { Gerente } from "../generated/prisma";
import bcrypt from "bcryptjs";

type GerenteCreateData = Omit<Gerente, "id">;
type GerenteUpdateData = Partial<Omit<Gerente, "id" | "senha">>;

export const create = async (data: GerenteCreateData): Promise<Omit<Gerente, "senha">> => {
    const hashSenha = await bcrypt.hash(data.senha, 10);
    const gerente = await prisma.gerente.create({data: { ...data, senha: hashSenha },});
    const { senha, ...gerenteSemSenha } = gerente;

    return gerenteSemSenha;
};

export const getAll = async (): Promise<Omit<Gerente, "senha">[]> => { 
    return prisma.gerente.findMany({select: {id: true, nome: true, email: true,},});
};

export const getById = async (id: number): Promise<Omit<Gerente, "senha">[]> => {
    return prisma.gerente.findMany({ where: { id }, select: {id: true, nome: true, email: true,},});
};

export const update = async (id: number, data: GerenteUpdateData): Promise<Omit<Gerente, "senha">> => {
  return prisma.gerente.update({ where: { id }, data, select: { id: true, nome: true, email: true,},});
};

export const remove = async (id: number): Promise<Gerente> => {
  return prisma.gerente.delete({ where: { id } });
};

export const getByLogin = async (email: string, senha: string): Promise<Gerente | null> => {
  const gerente = await prisma.gerente.findUnique({where: { email },});
  
  if (!gerente) return null;
  const isMatch = await bcrypt.compare(senha, gerente.senha);
  if (!isMatch) return null;

  return gerente;
};
