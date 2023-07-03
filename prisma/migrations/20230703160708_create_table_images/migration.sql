-- AlterTable
ALTER TABLE "travel_packages" ALTER COLUMN "included" SET DEFAULT ARRAY[]::VARCHAR(256)[],
ALTER COLUMN "images" SET DEFAULT ARRAY[]::VARCHAR(256)[];

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_url_key" ON "images"("url");
