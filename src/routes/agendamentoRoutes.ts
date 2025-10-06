import { Router } from "express";
import {
    createAgendamento,
    getAgendamentos,
    getAgendamentoByVeiculo,
    getAgendamentoByCliente,
    updateAgendamento,
    deleteAgendamento,
} from "../controllers/agendamentoController";
import { validateBody, validateParams } from "../middlewares/validation";
import { createAgendamentoSchema, updateAgendamentoSchema, idParamSchema } from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de Clientes
 */

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - motivo
 *               - veiculoId
 *               - clienteId
 *             properties:
 *               motivo:
 *                 type: string
 *               veiculoId:
 *                 type: integer
 *               clienteId:
 *                 type: integer
 *             example:
 *               motivo: "Revisão"
 *               descricao: "Opcional"
 *               veiculoId: 1
 *               clienteId: 2
 *     responses:
 *       200:
 *         description: Agendamento criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/agendamentos", validateBody(createAgendamentoSchema), createAgendamento);

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Retorna todos os agendamentos
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/agendamentos", getAgendamentos);

/**
 * @swagger
 * /agendamentos/veiculo/{id}:
 *   get:
 *     summary: Busca os agendamentos do veículo pelo Id
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: id do veículo
 *     responses:
 *       200:
 *         description: Lista de agendamentos do veículo retornada com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/agendamentos/veiculo/:id", validateParams(idParamSchema), getAgendamentoByVeiculo);

/**
 * @swagger
 * /agendamentos/cliente/{id}:
 *   get:
 *     summary: Busca os agendamentos do cliente pelo Id
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: id do cliente
 *     responses:
 *       200:
 *         description: Lista de agendamentos do cliente retornada com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/agendamentos/cliente/:id", validateParams(idParamSchema), getAgendamentoByCliente);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *               veiculoId:
 *                 type: integer
 *               clienteId:
 *                 type: integer
 *             example:
 *               descricao: ""
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Agendamento não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/agendamentos/:id", validateParams(idParamSchema), validateBody(updateAgendamentoSchema), updateAgendamento);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Deleta um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: agendamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/agendamentos/:id", validateParams(idParamSchema), deleteAgendamento);

export default router;