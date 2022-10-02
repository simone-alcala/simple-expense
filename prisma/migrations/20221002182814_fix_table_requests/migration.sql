/*
  Warnings:

  - The `status` column on the `requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'SENT', 'APPROVED', 'REJECTED', 'CANCELED');

-- AlterTable
ALTER TABLE "requestItems" ALTER COLUMN "observation" DROP NOT NULL,
ALTER COLUMN "receipt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "status",
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "amount" SET DEFAULT 0;
