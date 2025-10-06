import { Router } from "express";
import {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente,
} from "../controllers/clienteController";
import { validateBody, validateParams } from "../middlewares/validation";
import { createClienteSchema, updateClienteSchema, idParamSchema, } from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de Clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - nome
 *               - telefone
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *             example:
 *               cpf: "11111111111" 
 *               nome: "Bruno Cavalcante"
 *               telefone: "83912345678" 
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/clientes", validateBody(createClienteSchema), createCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada.
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/clientes", getClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente específico pelo id
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id do cliente a ser buscado.
 *     responses:
 *       200:
 *         description: Cliente encontrado.
 *       404:
 *         description: Cliente não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/clientes/:id", validateParams(idParamSchema), getClienteById);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O id do cliente a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *             example:
 *               cpf: "11111121111" 
 *               telefone: "83912321232"       
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/clientes/:id", validateParams(idParamSchema), validateBody(updateClienteSchema), updateCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O id do cliente a ser deletado.
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/clientes/:id", validateParams(idParamSchema), deleteCliente);

export default router;