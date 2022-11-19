/*
  Warnings:

  - You are about to drop the column `specialId` on the `message` table. All the data in the column will be lost.
  - Added the required column `room` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "specialId",
ADD COLUMN     "room" VARCHAR(255) NOT NULL;
