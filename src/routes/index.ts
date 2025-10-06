import { Router } from 'express';
import clienteRoutes from './clienteRoutes';
import veiculoRoutes from './veiculoRoutes';
import agendamentoRoutes from './agendamentoRoutes';

const routes = Router();

routes.use(clienteRoutes);
routes.use(veiculoRoutes);
routes.use(agendamentoRoutes);

export default routes;