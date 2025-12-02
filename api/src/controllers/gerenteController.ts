import { Request, Response } from "express";
import * as gerenteService from '../services/gerenteService';

export const createGerente = async (req: Request, res: Response) => {
    try{
        const novoGerente = await gerenteService.create(req.body);
        return res.status(201).json(novoGerente);

    }catch (error: any){
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo ${error.meta.target} já existe!` });
        return res.status(500).json({ message: error.message });
    }
};

export const getGerentes = async (req: Request, res: Response) => {
    try{
        const gerentes = await gerenteService.getAll();
        if (gerentes.length === 0) return res.status(200).json({ message: "Nenhum gerente cadastrado ainda." });
        return res.json(gerentes);

    }catch (error: any){
        return res.status(500).json({ message: error.message });
    }
};

export const getGerenteById = async (req: Request, res: Response) => {
    try{
        const gerente = await gerenteService.getById(Number(req.params.id));
        if(!gerente) return res.status(404).json({ message: "Gerente não encontrado(a)." });
        return res.json(gerente);

    }catch (error: any){
        return res.status(500).json({ message: error.message });
    }
};

export const updateGerente = async (req: Request, res: Response) => {
    try{
        const gerente = await gerenteService.update(Number(req.params.id), req.body);
        return res.json(gerente);

    }catch (error: any){
        if (error.code === 'P2025') return res.status(404).json({ message: "Gerente não encontrado" });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message });
    }
};

export const deleteGerente = async (req: Request, res: Response) => {
    try{
        await gerenteService.remove(Number(req.params.id));
        return res.status(204).send();

    }catch (error: any){
        if (error.code === 'P2025') return res.status(404).json({ message: "Gerente não encontrado" });
        return res.status(500).json({ message: error.message });
    }
};

export const getGerenteByLogin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const gerente = await gerenteService.getByLogin(email, senha);
    if (!gerente)
        return res.status(404).json({ message: "Credenciais inválidas" });
    return res.json(gerente);

  } catch (error: any){
    return res.status(500).json({ message: error.message });
  }
};