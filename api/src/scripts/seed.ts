import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const gerente = {
  nome: "Administrador",
  email: "admin@mecanica.com",
  senha: "123456", 
};

const clientes = [
  {
    nome: "Carlos Eduardo Silva",
    cpf: "11111111111",
    telefone: "11999990001",
  },
  {
    nome: "Ana Paula Santos",
    cpf: "22222222222",
    telefone: "11999990002",
  },
  {
    nome: "Roberto Almeida",
    cpf: "33333333333",
    telefone: "11999990003",
  },
];

const veiculos = [
  { modelo: "VW Gol 1.6", placa: "GOL1234", ano: 2018, chassi: "9BW000...", donoIndex: 0 },
  { modelo: "VW Virtus Hl", placa: "VIR7U51", ano: 2024, chassi: "9BW111...", donoIndex: 0 },
  { modelo: "VW Tera OT", placa: "TER4A36", ano: 2026, chassi: "9BW222...", donoIndex: 1 },
  { modelo: "VW Jetta GLI", placa: "JET7A61", ano: 2026, chassi: "9BW333...", donoIndex: 2 },
];

async function main() {
  console.log("🌱 Iniciando povoamento do banco...");

  const passwordHash = await bcrypt.hash(gerente.senha, 8);
  
  await prisma.gerente.upsert({
    where: { email: gerente.email },
    update: {},
    create: {
      nome: gerente.nome,
      email: gerente.email,
      senha: passwordHash,
    },
  });
  console.log("✅ Gerente garantido (Login: admin@mecanica.com / Senha: 123456)");

  const clientesCriados = []; 

  for (const c of clientes) {
    let clienteReal = await prisma.cliente.findUnique({ where: { cpf: c.cpf } });

    if (!clienteReal) {
      clienteReal = await prisma.cliente.create({ data: c });
      console.log(`✅ Cliente criado: ${c.nome}`);
    } else {
      console.log(`ℹ️ Cliente já existe: ${c.nome}`);
    }
    clientesCriados.push(clienteReal);
  }

  for (const v of veiculos) {
    const carroExiste = await prisma.veiculo.findUnique({ where: { placa: v.placa } });

    if (!carroExiste) {
      const dono = clientesCriados[v.donoIndex];

      if (dono) {
        await prisma.veiculo.create({
          data: {
            modelo: v.modelo,
            placa: v.placa,
            ano: v.ano,
            chassi: v.chassi,
            clienteId: dono.id,
          },
        });
        console.log(`🚗 Veículo criado: ${v.modelo} (Dono: ${dono.nome})`);
      }
    } else {
      console.log(`ℹ️ Veículo já existe: ${v.modelo}`);
    }
  }

  console.log("🏁 Povoamento finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao povoar:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });