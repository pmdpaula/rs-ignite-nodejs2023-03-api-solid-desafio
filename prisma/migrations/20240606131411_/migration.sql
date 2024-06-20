/*
  Warnings:

  - You are about to drop the column `updated_at` on the `pet_requirements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pet_requirements" DROP COLUMN "updated_at",
ADD COLUMN     "updated_at1" TIMESTAMP(3);
