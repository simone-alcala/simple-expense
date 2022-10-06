/*
  Warnings:

  - You are about to drop the column `date` on the `approvals` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `approvals` table. All the data in the column will be lost.
  - The `status` column on the `approvals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "approvals" DROP COLUMN "date",
DROP COLUMN "observation",
ADD COLUMN     "comment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "createdDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'OPEN';
