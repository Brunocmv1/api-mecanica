import express from 'express';
import cors from "cors";
import 'dotenv/config';
import routes from './routes';
import { setupSwagger } from './swagger';

const app = express();   

app.use(cors());
app.use(express.json());

setupSwagger(app);        

app.use('', routes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});