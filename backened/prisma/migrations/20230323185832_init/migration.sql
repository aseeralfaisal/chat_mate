/*
  Warnings:

  - Added the required column `userId` to the `chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_room_fkey";

-- AlterTable
ALTER TABLE "chatroom" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
