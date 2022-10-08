-- AlterEnum
ALTER TYPE "RequestStatus" ADD VALUE 'REVIEW';

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "approverComment" TEXT NOT NULL DEFAULT '';
