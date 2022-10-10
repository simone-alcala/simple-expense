-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER', 'APPROVER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'USER';
