/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `shares` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shares_symbol_key" ON "shares"("symbol");
