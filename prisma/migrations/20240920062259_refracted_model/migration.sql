/*
  Warnings:

  - You are about to drop the column `product_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `order` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_product_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "product_id",
DROP COLUMN "quantity",
DROP COLUMN "total_price";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
