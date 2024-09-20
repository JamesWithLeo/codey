-- CreateEnum
CREATE TYPE "TRANSACTION_SOURCE" AS ENUM ('POS', 'ONLINE');

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "source" "TRANSACTION_SOURCE" NOT NULL DEFAULT 'ONLINE',
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
