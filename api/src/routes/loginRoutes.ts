import { Router } from "express";
import { getGerenteByLogin } from "../controllers/gerenteController";
import { validateBody } from "../middlewares/validation";
import { loginGerenteSchema } from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gerentes
 *   description: Gerenciamento de Gerentes
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um gerente
 *     tags: [Gerentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Gerente registrado no banco
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/login", validateBody(loginGerenteSchema), getGerenteByLogin);

export default router;