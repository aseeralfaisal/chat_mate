/*
  Warnings:

  - Added the required column `username` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_room_fkey";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "username" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
