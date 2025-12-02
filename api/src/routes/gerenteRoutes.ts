import { Router } from "express";
import {
    createGerente,
    getGerentes,
    getGerenteById,
    updateGerente,
    deleteGerente,
} from "../controllers/gerenteController";
import { validateBody, validateParams } from "../middlewares/validation";
import { createGerenteSchema, updateGerenteSchema, idParamSchema, } from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gerentes
 *   description: Gerenciamento de Gerentes
 */

/**
 * @swagger
 * /gerentes:
 *   post:
 *     summary: Cria um novo gerente que irá usar o sistema
 *     tags: [Gerentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gerente criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/gerentes", validateBody(createGerenteSchema), createGerente);

/**
 * @swagger
 * /gerentes:
 *   get:
 *     summary: Retorna todos os gerentes cadastrados no banco
 *     tags: [Gerentes]
 *     responses:
 *       200:
 *         description: Lista de gerentes
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/gerentes", getGerentes);

/**
 * @swagger
 * /gerentes/{id}:
 *   get:
 *     summary: Retorna um gerente pelo ID
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gerente encontrado
 *       404:
 *         description: Gerentes não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/gerentes/:id", validateParams(idParamSchema), getGerenteById);

/**
 * @swagger
 * /gerentes/{id}:
 *   put:
 *     summary: Atualiza um gerente
 *     tags: [Gerentes]
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gerente atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Gerente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/gerentes/:id", validateParams(idParamSchema), validateBody(updateGerenteSchema), updateGerente);

/**
 * @swagger
 * /gerentes/{id}:
 *   delete:
 *     summary: Deleta um gerente
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Gerente deletado com sucesso
 *       404:
 *         description: Gerente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/gerentes/:id", validateParams(idParamSchema), deleteGerente);


export default router;