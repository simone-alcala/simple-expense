/*
  Warnings:

  - The `type` column on the `expenses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ExpenseTypes" AS ENUM ('ACCOMMODATION', 'CLEANING', 'OFFICE', 'MEAL', 'TRANSPORT', 'OTHER');

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "type",
ADD COLUMN     "type" "ExpenseTypes" NOT NULL DEFAULT 'OTHER';
