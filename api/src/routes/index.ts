import { Router } from 'express';
import clienteRoutes from './clienteRoutes';
import veiculoRoutes from './veiculoRoutes';
import agendamentoRoutes from './agendamentoRoutes';
import gerenteRoutes from './gerenteRoutes';
import loginRoutes from './loginRoutes';

const routes = Router();

routes.use(gerenteRoutes);
routes.use(clienteRoutes);
routes.use(veiculoRoutes);
routes.use(agendamentoRoutes);
routes.use(loginRoutes);

export default routes;