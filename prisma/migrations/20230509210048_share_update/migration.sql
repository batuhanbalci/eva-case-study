/*
  Warnings:

  - You are about to alter the column `symbol` on the `shares` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.
  - You are about to alter the column `price` on the `shares` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "shares" ALTER COLUMN "symbol" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(9,2);
