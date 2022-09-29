/*
  Warnings:

  - You are about to drop the column `userId` on the `approvals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `requests` table. All the data in the column will be lost.
  - Added the required column `approverId` to the `approvals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "approvals" DROP COLUMN "userId",
ADD COLUMN     "approverId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "userId",
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestItems" ADD CONSTRAINT "requestItems_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestItems" ADD CONSTRAINT "requestItems_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
