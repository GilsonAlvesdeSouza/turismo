-- CreateEnum
CREATE TYPE "TypeOfPayment" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'CASH', 'PIX', 'TICKET');

-- AlterTable
ALTER TABLE "travel_packages" ALTER COLUMN "included_items" SET DEFAULT ARRAY[]::VARCHAR(256)[],
ALTER COLUMN "images" SET DEFAULT ARRAY[]::VARCHAR(256)[];

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 0,
    "type_of_payment" "TypeOfPayment" NOT NULL,
    "value_of_installments" INTEGER NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_package" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_id_package_fkey" FOREIGN KEY ("id_package") REFERENCES "travel_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
