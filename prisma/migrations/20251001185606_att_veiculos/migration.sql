/*
  Warnings:

  - A unique constraint covering the columns `[chassi]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chassi` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "chassi" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_chassi_key" ON "Veiculo"("chassi");
