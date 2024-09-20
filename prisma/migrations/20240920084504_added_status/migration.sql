/*
  Warnings:

  - You are about to drop the column `isPaid` on the `order` table. All the data in the column will be lost.
  - The `status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TRANSACTION_STATUS" AS ENUM ('pending', 'suspended', 'completed', 'deleted');

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'suspended';

-- AlterTable
ALTER TABLE "order" DROP COLUMN "isPaid",
DROP COLUMN "status",
ADD COLUMN     "status" "TRANSACTION_STATUS" NOT NULL DEFAULT 'pending';
