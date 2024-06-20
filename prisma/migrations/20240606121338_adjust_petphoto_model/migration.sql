/*
  Warnings:

  - You are about to drop the column `petId` on the `pet_photos` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `pet_photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet_photos" DROP CONSTRAINT "pet_photos_petId_fkey";

-- AlterTable
ALTER TABLE "pet_photos" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
