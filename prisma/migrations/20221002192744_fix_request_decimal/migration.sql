/*
  Warnings:

  - You are about to alter the column `amount` on the `requests` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
