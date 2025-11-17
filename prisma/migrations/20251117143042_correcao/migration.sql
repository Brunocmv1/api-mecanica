/*
  Warnings:

  - You are about to drop the `Gerente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Gerente";

-- CreateTable
CREATE TABLE "gerente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "gerente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gerente_email_key" ON "gerente"("email");
