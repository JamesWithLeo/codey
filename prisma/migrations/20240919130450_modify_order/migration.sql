-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';
