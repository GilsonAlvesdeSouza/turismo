-- AlterTable
ALTER TABLE "travel_packages" ALTER COLUMN "included_items" SET DEFAULT ARRAY[]::VARCHAR(256)[],
ALTER COLUMN "images" SET DEFAULT ARRAY[]::VARCHAR(256)[];

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "value" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "id_schedule" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_id_schedule_fkey" FOREIGN KEY ("id_schedule") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
