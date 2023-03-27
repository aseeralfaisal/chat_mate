/*
  Warnings:

  - You are about to drop the column `userId` on the `chatroom` table. All the data in the column will be lost.
  - Added the required column `chatroomId` to the `chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_userId_fkey";

-- AlterTable
ALTER TABLE "chatroom" DROP COLUMN "userId",
ADD COLUMN     "chatroomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
