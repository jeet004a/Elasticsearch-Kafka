ALTER TABLE "orders" DROP CONSTRAINT "orders_txn_id_unique";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "amount" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "txn_id" DROP NOT NULL;