-- DropForeignKey
ALTER TABLE "public"."Veiculo" DROP CONSTRAINT "Veiculo_clienteId_fkey";

-- AlterTable
ALTER TABLE "Veiculo" ALTER COLUMN "clienteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
