/*
  Warnings:

  - You are about to drop the column `created_at` on the `pet_requirements` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pet_requirements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pet_requirements" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
