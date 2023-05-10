/*
  Warnings:

  - The primary key for the `portfolio_share` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `portfolio_share` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `portfolio_share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "portfolio_share" DROP CONSTRAINT "portfolio_share_pkey",
DROP COLUMN "id",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD CONSTRAINT "portfolio_share_pkey" PRIMARY KEY ("portfolio_id", "share_id");
