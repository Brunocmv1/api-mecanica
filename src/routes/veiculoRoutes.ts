import { Router } from "express";
import {
    createVeiculo,
    getVeiculos,
    getVeiculoById,
    updateVeiculo,
    deleteVeiculo,
    getVeiculoByCliente,
} from "../controllers/veiculoController";
import { validateBody, validateParams } from "../middlewares/validation";
import { createVeiculoSchema, updateVeiculoSchema, idParamSchema } from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de Clientes
 */

/**
 * @swagger
 * /veiculos:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Veiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - chassi
 *               - modelo
 *               - ano
 *             properties:
 *               placa:
 *                 type: string
 *               chassi:
 *                 type: string
 *               modelo:
 *                 type: string
 *               ano:
 *                 type: integer
 *             example:
 *               placa: "ABC1D23"
 *               chassi: "123"
 *               modelo: "M4 CS"
 *               ano: 2025
 *               clienteId: 1
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/veiculos", validateBody(createVeiculoSchema), createVeiculo);

/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Retorna a lista de todos os veículos
 *     tags: [Veiculos]
 *     responses:
 *       200:
 *         description: Lista de veículos retornada.
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/veiculos", getVeiculos);

/**
 * @swagger
 * /veiculos/{id}:
 *   get:
 *     summary: Busca um veículo pelo id
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id do veículo a ser buscado.
 *     responses:
 *       200:
 *         description: Veículo encontrado.
 *       404:
 *         description: Veículo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/veiculos/:id", validateParams(idParamSchema), getVeiculoById);

/**
 * @swagger
 * /veiculos/cliente/{id}:
 *   get:
 *     summary: Busca os veículos do cliente pelo id do cliente 
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id do cliente
 *     responses:
 *       200:
 *         description: Lista de veículos do cliente retornada.
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/veiculos/cliente/:id", validateParams(idParamSchema), getVeiculoByCliente);

/**
 * @swagger
 * /veiculos/{id}:
 *   put:
 *     summary: Atualiza um veículo
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O id do veículo a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               chassi:
 *                 type: string
 *               modelo:
 *                 type: string
 *               ano:
 *                 type: integer
 *               clienteId:
 *                 type: integer
 *             example:
 *               placa: "ABC1234" 
 *               chassi: "AB-123"
 *               modelo: "M4 CS"
 *               ano: 2025
 *               clienteId: 2
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/veiculos/:id", validateParams(idParamSchema), validateBody(updateVeiculoSchema), updateVeiculo);

/**
 * @swagger
 * /veiculos/{id}:
 *   delete:
 *     summary: Deleta um veículo
 *     tags: [Veiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A id do veículo a ser deletado.
 *     responses:
 *       204:
 *         description: Veículo deletado com sucesso
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/veiculos/:id", validateParams(idParamSchema), deleteVeiculo);

export default router;
