import { Request, Response } from "express";
import * as veiculoService from '../services/veiculoService';

export const createVeiculo = async (req: Request, res: Response) => {
    try{
        const novoVeiculo = await veiculoService.create(req.body);
        return res.status(201).json(novoVeiculo);

    } catch(error: any) {
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message });
    }
};

export const getVeiculos = async (req: Request, res: Response) => {
    try{
        const veiculos = await veiculoService.getAll();
        if (veiculos.length === 0) return res.status(200).json({ message: "Nenhum veículo cadastrado ainda." });
        return res.json(veiculos);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getVeiculoById = async (req: Request, res: Response) => {
    try{
        const veiculo = await veiculoService.getById(Number(req.params.id));
        if (!veiculo) return res.status(404).json({ message: 'Veículo não encontrado' });
        return res.json(veiculo);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getVeiculoByCliente = async (req: Request, res: Response) => {
    try{
        const veiculo = await veiculoService.getByCliente(Number(req.params.id));
        if (!veiculo) return res.status(404).json({ message: 'Veículo não encontrado' });
        return res.json(veiculo);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

};

export const updateVeiculo = async (req: Request, res: Response) => {
    try{
        const veiculo = await veiculoService.update(Number(req.params.id), req.body);
        return res.json(veiculo);

    } catch (error: any){
        if (error.code === 'P2025') return res.status(404).json({ message: 'Veículo não encontrado' });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message });
    }
};

export const deleteVeiculo = async (req: Request, res: Response) => {
    try{
        await veiculoService.remove(Number(req.params.id));
        return res.status(204).send();
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Veículo não encontrado' });
        return res.status(500).json({ message: error.message });
    }
};