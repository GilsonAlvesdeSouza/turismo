-- CreateTable
CREATE TABLE "travel_packages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "number_of_people" INTEGER NOT NULL,
    "number_of_days" INTEGER NOT NULL,
    "number_of_nights" INTEGER NOT NULL,
    "destination_city" VARCHAR(100) NOT NULL,
    "destination_state" VARCHAR(2) NOT NULL,
    "included_items" VARCHAR(256)[] DEFAULT ARRAY[]::VARCHAR(256)[],
    "images" VARCHAR(256)[] DEFAULT ARRAY[]::VARCHAR(256)[],
    "id_user" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "travel_packages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "travel_packages" ADD CONSTRAINT "travel_packages_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
