/*
  Warnings:

  - You are about to drop the column `order_id` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `transaction_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_order_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "order_id",
ADD COLUMN     "transaction_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
