import { Request, Response } from "express";
import * as agendamentoService from '../services/agendamentoService';

export const createAgendamento = async (req: Request, res: Response) => {
    try {
        const agendamento = await agendamentoService.create(req.body);
        return res.status(201).json(agendamento);  

    } catch (error: any) {
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message });
    }
};

export const getAgendamentos = async (req: Request, res: Response) => {
    try{
        const agendamentos = await agendamentoService.getAll();
        if (agendamentos.length === 0) return res.status(200).json({ message: "Nenhum agendamento cadastrado ainda." });
        return res.json(agendamentos);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAgendamentoByVeiculo = async (req: Request, res: Response) => {
    try{
        const agendamento = await agendamentoService.getByVeiculo(Number(req.params.id));
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado.' });
        return res.json(agendamento);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAgendamentoByCliente = async (req: Request, res: Response) => {
    try{
        const agendamento = await agendamentoService.getByCliente(Number(req.params.id));
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado.' });
        return res.json(agendamento);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAgendamento = async (req: Request, res: Response) => {
    try {
        const { clienteId, veiculoId, id, createdAt, updatedAt, ...data } = req.body;
        const agendamento = await agendamentoService.update(Number(req.params.id), data);
        return res.json(agendamento);
        
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Agendamento não encontrado.' });
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAgendamento = async (req: Request, res: Response) => {
    try {
        await agendamentoService.remove(Number(req.params.id));
        return res.status(204).send();

    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Agendamento não encontrado.' });
        return res.status(500).json({ message: error.message });
    }
};