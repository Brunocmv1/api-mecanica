import express from 'express';
import 'dotenv/config';
import routes from './routes';
import { setupSwagger } from './swagger';

const app = express();          
app.use(express.json());

setupSwagger(app);        

app.use('', routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}/api-docs`);
});