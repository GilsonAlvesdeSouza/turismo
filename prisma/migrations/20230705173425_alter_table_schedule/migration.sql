-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "value_of_installments" DROP NOT NULL;

-- AlterTable
ALTER TABLE "travel_packages" ALTER COLUMN "included_items" SET DEFAULT ARRAY[]::VARCHAR(256)[],
ALTER COLUMN "images" SET DEFAULT ARRAY[]::VARCHAR(256)[];
